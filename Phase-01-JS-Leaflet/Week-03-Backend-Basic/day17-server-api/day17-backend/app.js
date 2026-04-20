const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 数据库连接池
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'leaflet_draw',
    connectionLimit: 10
});

// 初始化数据库
async function initDB() {
    const conn = await pool.getConnection();
    await conn.execute(`
        CREATE TABLE IF NOT EXISTS drawings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(50) NOT NULL,
            description TEXT,
            properties JSON,
            geometry JSON NOT NULL,
            center_lat DECIMAL(10,8),
            center_lng DECIMAL(11,8),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    conn.release();
    console.log('✅ 数据库就绪');
}

// GET 查询全部
app.get('/api/drawings', async (req, res) => {
    try {
        const { south, north, west, east } = req.query;
        let sql = 'SELECT * FROM drawings WHERE 1=1';
        const params = [];
        
        if (south) {
            sql += ' AND center_lat BETWEEN ? AND ? AND center_lng BETWEEN ? AND ?';
            params.push(south, north, west, east);
        }
        
        sql += ' ORDER BY created_at DESC';
        
        const [rows] = await pool.execute(sql, params);
        res.json({ success: true, count: rows.length, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET 附近搜索
app.get('/api/drawings/nearby', async (req, res) => {
    try {
        const { lat, lng, radius = 5 } = req.query;
        
        const [rows] = await pool.execute(`
            SELECT *, (6371 * acos(
                cos(radians(?)) * cos(radians(center_lat)) * 
                cos(radians(center_lng) - radians(?)) + 
                sin(radians(?)) * sin(radians(center_lat))
            )) AS distance
            FROM drawings
            HAVING distance < ?
            ORDER BY distance
            LIMIT 50
        `, [lat, lng, lat, radius]);
        
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST 保存
app.post('/api/drawings', async (req, res) => {
    try {
        const { features, type } = req.body;
        
        if (type === 'FeatureCollection' && Array.isArray(features)) {
            const ids = [];
            const conn = await pool.getConnection();
            await conn.beginTransaction();
            
            for (const f of features) {
                const geom = f.geometry;
                const props = f.properties;
                const center = calculateCenter(geom);
                
                const [result] = await conn.execute(
                    `INSERT INTO drawings (name, type, description, properties, geometry, center_lat, center_lng) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [
                        props?.name || '未命名',
                        props?.type || 'unknown',
                        props?.description || null,
                        JSON.stringify(props || {}),
                        JSON.stringify(geom),
                        center?.lat,
                        center?.lng
                    ]
                );
                ids.push(result.insertId);
            }
            
            await conn.commit();
            conn.release();
            return res.json({ success: true, ids });
        }
        
        // 单条保存
        const { name, type: t, description, properties, geometry } = req.body;
        const center = calculateCenter(geometry);
        
        const [result] = await pool.execute(
            `INSERT INTO drawings (name, type, description, properties, geometry, center_lat, center_lng) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, t, description, JSON.stringify(properties), JSON.stringify(geometry), center?.lat, center?.lng]
        );
        
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT 更新
app.put('/api/drawings/:id', async (req, res) => {
    try {
        const { name, description, properties, geometry } = req.body;
        const [result] = await pool.execute(
            'UPDATE drawings SET name=?, description=?, properties=?, geometry=? WHERE id=?',
            [name, description, JSON.stringify(properties), JSON.stringify(geometry), req.params.id]
        );
        res.json({ success: result.affectedRows > 0 });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE 删除
app.delete('/api/drawings/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM drawings WHERE id=?', [req.params.id]);
        res.json({ success: result.affectedRows > 0 });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 计算中心点
function calculateCenter(geometry) {
    const coords = geometry.coordinates;
    switch (geometry.type) {
        case 'Point': return { lat: coords[1], lng: coords[0] };
        case 'LineString': return { lat: coords[Math.floor(coords.length/2)][1], lng: coords[Math.floor(coords.length/2)][0] };
        case 'Polygon': 
            const ring = coords[0];
            let lat = 0, lng = 0;
            ring.forEach(c => { lat += c[1]; lng += c[0]; });
            return { lat: lat/ring.length, lng: lng/ring.length };
        default: return null;
    }
}

// 启动
const PORT = process.env.PORT || 3000;
initDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 服务运行 http://localhost:${PORT}`));
});
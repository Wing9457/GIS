
---

## day17-database.sql

```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS leaflet_draw DEFAULT CHARSET utf8mb4;
USE leaflet_draw;

-- 绘制数据表
CREATE TABLE IF NOT EXISTS drawings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL COMMENT 'point/line/polygon/circle/rectangle',
    description TEXT,
    properties JSON,
    geometry JSON NOT NULL,
    center_lat DECIMAL(10, 8),
    center_lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_location (center_lat, center_lng)
) ENGINE=InnoDB;
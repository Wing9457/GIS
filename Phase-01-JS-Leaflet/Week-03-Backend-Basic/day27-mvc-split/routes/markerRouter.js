const express = require('express');
const router = express.Router();
const ctrl = require('../controller/markerCtrl');

router.get('/markers', ctrl.getMarkers);
router.post('/markers', ctrl.addMarker);
router.put('/markers/:id', ctrl.editMarker);
router.delete('/markers/:id', ctrl.delMarker);

module.exports = router;
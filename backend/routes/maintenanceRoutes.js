const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { protect, authorize } = require('../middlewares/auth');

router.post('/', protect, authorize('admin', 'mechanic'), maintenanceController.createMaintenance);
router.get('/', protect, authorize('admin', 'mechanic'), maintenanceController.getMaintenances);

module.exports = router;
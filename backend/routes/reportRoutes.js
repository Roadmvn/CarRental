const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect, authorize } = require('../middlewares/auth');

router.get('/revenue', protect, authorize('admin'), reportController.generateRevenueReport);

module.exports = router;
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middlewares/auth');

router.post('/process', protect, paymentController.processPayment);

module.exports = router;
// RentalCar/backend/routes/reservationRoutes.js

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { protect, authorize } = require('../middlewares/auth');

router.get('/', protect, authorize('admin'), reservationController.getAllReservations);
router.get('/:id', protect, reservationController.getReservationById);
router.post('/', protect, reservationController.createReservation);
router.put('/:id', protect, reservationController.updateReservation);
router.delete('/:id', protect, authorize('admin'), reservationController.deleteReservation);

module.exports = router;
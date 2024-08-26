// RentalCar/backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/auth');

router.get('/', protect, authorize('admin'), userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);

module.exports = router;
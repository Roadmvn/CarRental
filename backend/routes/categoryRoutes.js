// RentalCar/backend/routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/auth');

router.get('/', categoryController.getAllCategories);
router.post('/', protect, authorize('admin'), categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', protect, authorize('admin'), categoryController.updateCategory);
router.delete('/:id', protect, authorize('admin'), categoryController.deleteCategory);

module.exports = router;
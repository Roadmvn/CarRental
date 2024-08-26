const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, ratingController.createRating);
router.get('/', ratingController.getRatings);

module.exports = router;
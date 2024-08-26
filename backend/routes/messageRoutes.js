const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, messageController.sendMessage);
router.get('/', protect, messageController.getMessages);

module.exports = router;
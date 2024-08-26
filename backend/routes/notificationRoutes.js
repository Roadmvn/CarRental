// RentalCar/backend/routes/notificationRoutes.js

const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { protect } = require("../middlewares/auth");

router.get("/", protect, notificationController.getUserNotifications);
router.post("/", protect, notificationController.createNotification);
router.put("/:id", protect, notificationController.markNotificationAsRead);
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;

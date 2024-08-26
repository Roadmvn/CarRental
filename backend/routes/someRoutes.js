// RentalCar/backend/routes/someRoutes.js

const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const {
  createMaintenance,
  getMaintenances,
} = require("../controllers/maintenanceController");

router.get(
  "/protected-route",
  protect,
  authorize("admin", "seller"),
  (req, res) => {
    res.json({ message: "Vous avez accès à cette route protégée" });
  }
);

router.post("/maintenance", protect, authorize("admin"), createMaintenance);
router.get(
  "/maintenances",
  protect,
  authorize("admin", "seller"),
  getMaintenances
);

module.exports = router;

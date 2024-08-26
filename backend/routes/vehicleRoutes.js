const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const { protect, authorize } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.getVehicleById);
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  vehicleController.createVehicle
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  vehicleController.updateVehicle
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  vehicleController.deleteVehicle
);

module.exports = router;

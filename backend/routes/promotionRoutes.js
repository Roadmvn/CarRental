// RentalCar/backend/routes/promotionRoutes.js

const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotionController");

router.get("/", promotionController.getAllPromotions);
router.post("/", promotionController.createPromotion);
router.get("/:id", promotionController.getPromotionById);
router.put("/:id", promotionController.updatePromotion);
router.delete("/:id", promotionController.deletePromotion);

module.exports = router;
module.exports.deletePromotion = promotionController.deletePromotion;

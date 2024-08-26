// RentalCar/backend/controllers/promotionController.js

const { Promotion } = require("../models");

exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des promotions",
      error: error.message,
    });
  }
};

exports.createPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.create(req.body);
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création de la promotion",
      error: error.message,
    });
  }
};

exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findByPk(req.params.id);
    if (promotion) {
      res.json(promotion);
    } else {
      res.status(404).json({ message: "Promotion non trouvée" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la promotion",
      error: error.message,
    });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const [updated] = await Promotion.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPromotion = await Promotion.findByPk(req.params.id);
      res.json(updatedPromotion);
    } else {
      res.status(404).json({ message: "Promotion non trouvée" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour de la promotion",
      error: error.message,
    });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const deleted = await Promotion.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Promotion non trouvée" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la promotion",
      error: error.message,
    });
  }
};

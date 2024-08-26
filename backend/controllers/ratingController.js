const { Rating } = require("../models");

exports.createRating = async (req, res) => {
  try {
    const { userId, vehicleId, score, comment } = req.body;
    const rating = await Rating.create({ userId, vehicleId, score, comment });
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création de la note",
      error: error.message,
    });
  }
};

exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { vehicleId: req.params.vehicleId },
    });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des notes",
      error: error.message,
    });
  }
};

const { Review, User } = require("../models");

exports.createReview = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;
    const review = await Review.create({
      userId,
      authorId: req.user.id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Erreur lors de la création de l'avis",
        error: error.message,
      });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.params.userId },
      include: [{ model: User, as: "author", attributes: ["username"] }],
    });
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des avis",
        error: error.message,
      });
  }
};

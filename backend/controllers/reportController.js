const { Reservation, Vehicle } = require("../models");
const { Op } = require("sequelize");

exports.generateRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const reservations = await Reservation.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [Vehicle],
    });

    const totalRevenue = reservations.reduce(
      (sum, reservation) => sum + reservation.totalPrice,
      0
    );

    res.json({ totalRevenue, reservations });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la génération du rapport",
      error: error.message,
    });
  }
};

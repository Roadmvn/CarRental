// RentalCar/backend/controllers/reservationController.js

const { Reservation, Vehicle, User } = require("../models");

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [Vehicle, User],
    });
    res.json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des réservations",
        error: error.message,
      });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [Vehicle, User],
    });
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de la réservation",
        error: error.message,
      });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Erreur lors de la création de la réservation",
        error: error.message,
      });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const [updated] = await Reservation.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedReservation = await Reservation.findByPk(req.params.id);
      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: "Réservation non trouvée" });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Erreur lors de la mise à jour de la réservation",
        error: error.message,
      });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Réservation non trouvée" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de la réservation",
        error: error.message,
      });
  }
};

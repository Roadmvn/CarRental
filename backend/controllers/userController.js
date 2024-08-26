// RentalCar/backend/controllers/userController.js

const { User } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des utilisateurs",
        error: error.message,
      });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de l'utilisateur",
        error: error.message,
      });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Erreur lors de la mise à jour de l'utilisateur",
        error: error.message,
      });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de l'utilisateur",
        error: error.message,
      });
  }
};

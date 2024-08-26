// RentalCar/backend/controllers/notificationController.js

const { Notification } = require("../models");

exports.getUserNotifications = async (req, res) => {
  console.log(
    "Tentative de récupération des notifications pour l'utilisateur avec l'ID:",
    req.user.id
  );
  try {
    const notifications = await Notification.findAll({
      where: { recipientId: req.user.id },
    });
    console.log(
      `${notifications.length} notifications récupérées pour l'utilisateur avec l'ID: ${req.user.id}`
    );
    res.json(notifications);
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des notifications",
      error: error.message,
    });
  }
};

exports.createNotification = async (req, res) => {
  console.log("Tentative de création d'une nouvelle notification");
  try {
    const notification = await Notification.create({
      ...req.body,
      recipientId: req.body.recipientId,
    });
    console.log(`Nouvelle notification créée avec l'ID: ${notification.id}`);
    res.status(201).json(notification);
  } catch (error) {
    console.error("Erreur lors de la création de la notification:", error);
    res.status(400).json({
      message: "Erreur lors de la création de la notification",
      error: error.message,
    });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  console.log(
    `Tentative de marquage de la notification avec l'ID: ${req.params.id} comme lue pour l'utilisateur avec l'ID: ${req.user.id}`
  );
  try {
    const [updated] = await Notification.update(
      { isRead: true },
      { where: { id: req.params.id, recipientId: req.user.id } }
    );
    if (updated) {
      const updatedNotification = await Notification.findByPk(req.params.id);
      console.log(`Notification avec l'ID: ${req.params.id} marquée comme lue`);
      res.json(updatedNotification);
    } else {
      console.log(
        `Notification avec l'ID: ${req.params.id} non trouvée pour l'utilisateur avec l'ID: ${req.user.id}`
      );
      res.status(404).json({ message: "Notification non trouvée" });
    }
  } catch (error) {
    console.error(
      "Erreur lors du marquage de la notification comme lue:",
      error
    );
    res.status(400).json({
      message: "Erreur lors du marquage de la notification comme lue",
      error: error.message,
    });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Notification non trouvée" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de la notification",
        error: error.message,
      });
  }
};

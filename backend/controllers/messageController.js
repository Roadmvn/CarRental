const { Message } = require("../models");

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de l'envoi du message",
      error: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await Message.findAll({
      where: {
        senderId,
        receiverId,
      },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des messages",
      error: error.message,
    });
  }
};

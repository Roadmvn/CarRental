const { Maintenance } = require("../models");

exports.createMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.create(req.body);
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création de l'entretien",
      error: error.message,
    });
  }
};

exports.getMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.findAll();
    res.json(maintenances);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des entretiens",
      error: error.message,
    });
  }
};

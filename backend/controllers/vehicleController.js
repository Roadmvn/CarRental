// backend/controllers/vehicleController.js

const { Vehicle, Op } = require("../models");

exports.getAllVehicles = async (req, res) => {
  console.log("Tentative de récupération de tous les véhicules");
  try {
    const vehicles = await Vehicle.findAll({
      attributes: { exclude: ["image"] },
    });
    console.log(`${vehicles.length} véhicules récupérés`);
    res.json(vehicles);
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des véhicules",
      error: error.message,
    });
  }
};

exports.getVehicleById = async (req, res) => {
  console.log(
    `Tentative de récupération du véhicule avec l'ID: ${req.params.id}`
  );
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      console.log(`Véhicule avec l'ID ${req.params.id} non trouvé`);
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }
    console.log(`Véhicule avec l'ID ${req.params.id} récupéré avec succès`);
    res.json(vehicle);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du véhicule avec l'ID ${req.params.id}:`,
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération du véhicule",
      error: error.message,
    });
  }
};

exports.createVehicle = async (req, res) => {
  console.log("Tentative de création d'un nouveau véhicule");
  try {
    const vehicleData = req.body;
    if (req.file) {
      vehicleData.image = req.file.buffer;
    }
    const vehicle = await Vehicle.create(vehicleData);
    console.log(`Nouveau véhicule créé avec l'ID: ${vehicle.id}`);
    res.status(201).json(vehicle);
  } catch (error) {
    console.error("Erreur lors de la création du véhicule:", error);
    res.status(400).json({
      message: "Erreur lors de la création du véhicule",
      error: error.message,
    });
  }
};

exports.updateVehicle = async (req, res) => {
  console.log(
    `Tentative de mise à jour du véhicule avec l'ID: ${req.params.id}`
  );
  try {
    const vehicleData = req.body;
    if (req.file) {
      vehicleData.image = req.file.buffer;
    }
    const [updated] = await Vehicle.update(vehicleData, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedVehicle = await Vehicle.findByPk(req.params.id);
      console.log(`Véhicule avec l'ID ${req.params.id} mis à jour avec succès`);
      res.json(updatedVehicle);
    } else {
      console.log(
        `Véhicule avec l'ID ${req.params.id} non trouvé pour la mise à jour`
      );
      res.status(404).json({ message: "Véhicule non trouvé" });
    }
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour du véhicule avec l'ID ${req.params.id}:`,
      error
    );
    res.status(400).json({
      message: "Erreur lors de la mise à jour du véhicule",
      error: error.message,
    });
  }
};

exports.deleteVehicle = async (req, res) => {
  console.log(
    `Tentative de suppression du véhicule avec l'ID: ${req.params.id}`
  );
  try {
    const deleted = await Vehicle.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      console.log(`Véhicule avec l'ID ${req.params.id} supprimé avec succès`);
      res.status(204).send();
    } else {
      console.log(
        `Véhicule avec l'ID ${req.params.id} non trouvé pour la suppression`
      );
      res.status(404).json({ message: "Véhicule non trouvé" });
    }
  } catch (error) {
    console.error(
      `Erreur lors de la suppression du véhicule avec l'ID ${req.params.id}:`,
      error
    );
    res.status(500).json({
      message: "Erreur lors de la suppression du véhicule",
      error: error.message,
    });
  }
};

exports.getUserVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { userId: req.params.userId },
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des véhicules de l'utilisateur",
      error: error.message,
    });
  }
};

exports.searchVehicles = async (req, res) => {
  try {
    const {
      brand,
      model,
      color,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      vehicleType,
      fuelType,
      transmission,
      minMileage,
      maxMileage,
      minPower,
      maxPower,
      doors,
    } = req.query;

    let whereClause = {};

    if (brand) whereClause.brand = { [Op.like]: `%${brand}%` };
    if (model) whereClause.model = { [Op.like]: `%${model}%` };
    if (color) whereClause.color = { [Op.like]: `%${color}%` };
    if (minYear) whereClause.year = { ...whereClause.year, [Op.gte]: minYear };
    if (maxYear) whereClause.year = { ...whereClause.year, [Op.lte]: maxYear };
    if (minPrice)
      whereClause.price = { ...whereClause.price, [Op.gte]: minPrice };
    if (maxPrice)
      whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };
    if (vehicleType) whereClause.vehicleType = vehicleType;
    if (fuelType) whereClause.fuelType = fuelType;
    if (transmission) whereClause.transmission = transmission;
    if (minMileage)
      whereClause.mileage = { ...whereClause.mileage, [Op.gte]: minMileage };
    if (maxMileage)
      whereClause.mileage = { ...whereClause.mileage, [Op.lte]: maxMileage };
    if (minPower)
      whereClause.power = { ...whereClause.power, [Op.gte]: minPower };
    if (maxPower)
      whereClause.power = { ...whereClause.power, [Op.lte]: maxPower };
    if (doors) whereClause.doors = doors;

    const vehicles = await Vehicle.findAll({ where: whereClause });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la recherche de véhicules",
      error: error.message,
    });
  }
};

const { Vehicle } = require("../models");
const { Op } = require("sequelize");

exports.searchVehicles = async (req, res) => {
  try {
    const { type, brand, model, minYear, maxYear, minPrice, maxPrice } =
      req.query;

    let whereClause = {};
    if (type) whereClause.type = type;
    if (brand) whereClause.brand = brand;
    if (model) whereClause.model = model;
    if (minYear || maxYear) {
      whereClause.year = {};
      if (minYear) whereClause.year[Op.gte] = minYear;
      if (maxYear) whereClause.year[Op.lte] = maxYear;
    }
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }

    const vehicles = await Vehicle.findAll({ where: whereClause });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la recherche de véhicules",
      error: error.message,
    });
  }
};

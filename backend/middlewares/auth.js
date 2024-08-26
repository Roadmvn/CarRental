// RentalCar/backend/middlewares/auth.js

const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès interdit. Rôle non autorisé." });
    }
    next();
  };
};

// Nouveau middleware pour vérifier les permissions
exports.checkPermission = (permission) => {
  return (req, res, next) => {
    if (
      !req.user ||
      !req.user.permissions ||
      !req.user.permissions.includes(permission)
    ) {
      return res
        .status(403)
        .json({ message: "Vous n'avez pas la permission nécessaire." });
    }
    next();
  };
};

// Middleware combiné pour vérifier le rôle et les permissions
exports.authorizeAndCheckPermission = (roles, permission) => {
  return [exports.authorize(...roles), exports.checkPermission(permission)];
};

// Assurons-nous que toutes les fonctions sont correctement exportées
module.exports = {
  protect: exports.protect,
  authorize: exports.authorize,
  checkPermission: exports.checkPermission,
  authorizeAndCheckPermission: exports.authorizeAndCheckPermission,
};

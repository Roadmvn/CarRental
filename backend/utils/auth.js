// RentalCar/backend/utils/auth.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token invalide");
  }
};

module.exports = { generateToken, hashPassword, comparePassword, verifyToken };

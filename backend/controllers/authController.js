// RentalCar/backend/controllers/authController.js
const { check, validationResult } = require("express-validator");
const { User } = require("../models");
const {
  generateToken,
  hashPassword,
  comparePassword,
} = require("../utils/auth");

exports.register = [
  // Validation des champs
  check("username")
    .not()
    .isEmail()
    .withMessage("Le nom d'utilisateur ne peut pas être une adresse email")
    .isLength({ min: 3 })
    .withMessage("Le nom d'utilisateur doit contenir au moins 3 caractères"),
  check("email").isEmail().withMessage("L'adresse email n'est pas valide"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/[A-Z]/)
    .withMessage("Le mot de passe doit contenir au moins une majuscule")
    .matches(/[a-z]/)
    .withMessage("Le mot de passe doit contenir au moins une minuscule")
    .matches(/[0-9]/)
    .withMessage("Le mot de passe doit contenir au moins un chiffre")
    .matches(/[@$!%*?&]/)
    .withMessage("Le mot de passe doit contenir au moins un caractère spécial"),
  check("firstName").notEmpty().withMessage("Le prénom est requis"),
  check("lastName").notEmpty().withMessage("Le nom est requis"),
  check("address").notEmpty().withMessage("L'adresse est requise"),
  check("city").notEmpty().withMessage("La ville est requise"),
  check("gender")
    .isIn(["homme", "femme"])
    .withMessage("Le genre doit être 'homme' ou 'femme'"),
  check("phone").notEmpty().withMessage("Le téléphone est requis"),
  async (req, res) => {
    console.log("Données reçues pour l'inscription:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
      address,
      city,
      gender,
      phone,
    } = req.body;

    try {
      const existingUser = await User.findOne({
        where: { username: username },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Ce nom d'utilisateur est déj utilisé" }] });
      }

      const hashedPassword = await hashPassword(password);
      if (!hashedPassword) {
        throw new Error("Erreur lors du hachage du mot de passe");
      }

      console.log("Tentative de création de l'utilisateur avec les données:", {
        username,
        email,
        firstName,
        lastName,
        address,
        city,
        gender,
        phone,
      });

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        address,
        city,
        gender,
        phone,
        role: "user",
      });

      console.log("Utilisateur créé avec succès:", user.toJSON());

      const token = generateToken(user);
      res.status(201).json({
        message: "Inscription réussie",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error("Erreur détaillée lors de l'inscription:", error);
      res.status(500).json({
        message: "Erreur lors de l'inscription",
        error: error.message,
        stack: error.stack,
      });
    }
  },
];

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({
      message: "Erreur lors de la connexion",
      error: error.message,
    });
  }
};

// Autres fonctions exportées...

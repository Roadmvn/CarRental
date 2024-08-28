const { User } = require("../models");
const {
  generateToken,
  hashPassword,
  comparePassword,
} = require("../utils/auth");

exports.register = async (req, res) => {
  try {
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

    // Vérification et conversion du genre
    let validatedGender;
    switch (gender.toLowerCase()) {
      case "homme":
        validatedGender = "male";
        break;
      case "femme":
        validatedGender = "female";
        break;
      default:
        validatedGender = "other";
    }

    const user = await User.create({
      username,
      email,
      password,
      role: "user",
      firstName,
      lastName,
      address,
      city,
      gender: validatedGender,
      phone,
      roles: ["customer"],
      permissions: ["VIEW_LISTINGS", "ADD_TO_CART"],
      status: "active",
    });

    const token = generateToken(user);

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Erreur détaillée lors de l'inscription:", error);
    res.status(400).json({
      message: "Erreur lors de l'inscription",
      error: error.message,
    });
  }
};

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

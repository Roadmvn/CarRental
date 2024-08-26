require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./models");
const vehicleRoutes = require("./routes/vehicleRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/maintenances", maintenanceRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5000;

db.sequelize
  .sync()
  .then(() => {
    console.log("Base de données synchronisée");
    app.listen(PORT, () => {
      console.log(`Serveur RentalCar en cours d'exécution sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données:",
      error
    );
  });

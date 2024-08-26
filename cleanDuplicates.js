const { User } = require("./backend/models");

const cleanDuplicates = async () => {
  try {
    const users = await User.findAll();
    const emailMap = new Map();

    for (const user of users) {
      if (emailMap.has(user.email)) {
        await User.destroy({ where: { id: user.id } });
      } else {
        emailMap.set(user.email, true);
      }
    }

    console.log("Nettoyage des doublons terminé.");
  } catch (error) {
    console.error("Erreur lors du nettoyage des doublons:", error);
  }
};

cleanDuplicates();

const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des catégories", error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la catégorie", error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Catégorie non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la catégorie", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Catégorie non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de la catégorie", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Catégorie non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la catégorie", error: error.message });
  }
};

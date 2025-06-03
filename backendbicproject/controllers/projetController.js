const { getProjet,getUser, getFormation } = require("../utils/db");

const Projet = getProjet();
const Formation = getFormation();

/// ✅ Ajouter un nouveau projet
exports.addProjet = async (req, res) => {
  try {
    const Projet = getProjet();
    const Formation = getFormation();

    const { titre, userId, formationId } = req.body;

    // multer saves uploaded file info in req.file
    const file = req.file ? req.file.filename : null;
    console.log("Uploaded file:", file);

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Validate required fields
    if (!titre || !userId || !formationId) {
      return res.status(400).json({ error: "titre, userId and formationId are required" });
    }

    // Ensure userId and formationId are integers
    if (isNaN(parseInt(userId)) || isNaN(parseInt(formationId))) {
      return res.status(400).json({ error: "userId and formationId must be integers" });
    }

    // Check if a project with the same titre, userId and formationId already exists
    const existingProjet = await Projet.findOne({
      where: { titre, userId: parseInt(userId), formationId: parseInt(formationId) }
    });

    if (existingProjet) {
      return res.status(409).json({ error: "Projet déjà existant avec ce titre, user et formation" });
    }

    // Create new project
    const newProjet = await Projet.create({
      titre,
      file,
      userId: parseInt(userId),
      formationId: parseInt(formationId)
    });

    console.log("New project created:", newProjet);

    res.status(201).json(newProjet);
  } catch (error) {
    console.error("Erreur lors de l'ajout du projet :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


exports.getAllProjets = async (req, res) => {
  try {
    const Projet = getProjet();
    const Formation = getFormation();

    if (!Projet || !Formation) {
      throw new Error('Models are not initialized yet.');
    }

    const userId = parseInt(req.params.userId, 10);

    const projets = await Projet.findAll({
      where: { userId },
      include: [{ model: Formation }],
    });

    res.status(200).json(projets);
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error.stack || error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
// ✅ Obtenir un projet par ID
exports.getProjetById = async (req, res) => {
  try {
    const { id } = req.params;

    const projet = await Projet.findByPk(id, {
      include: [{ model: Formation }],
    });

    if (!projet) return res.status(404).json({ message: "Projet introuvable" });

    res.status(200).json(projet);
  } catch (error) {
    console.error("Erreur lors de la récupération du projet :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Modifier un projet
exports.updateProjet = async (req, res) => {
  try {
    const Projet = getProjet();

    const { id } = req.params;
    const { titre, formationId } = req.body;

    const projet = await Projet.findByPk(id);

    if (!projet) return res.status(404).json({ message: "Projet introuvable" });

    projet.titre = titre || projet.titre;
    projet.formationId = formationId || projet.formationId;

    if (req.file) {
  if (projet.file !== req.file.filename) {
    console.log(`Le fichier a été mis à jour : ${projet.file} -> ${req.file.filename}`);
    projet.file = req.file.filename;
  } else {
    console.log("Le fichier envoyé est identique à l'ancien, pas de mise à jour");
  }
}

    await projet.save();

    res.status(200).json(projet);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer un projet
exports.deleteProjet = async (req, res) => {
  try {
    const Projet = getProjet();

    const { id } = req.params;

    const projet = await Projet.findByPk(id);

    if (!projet) return res.status(404).json({ message: "Projet introuvable" });

    await projet.destroy();

    res.status(200).json({ message: "Projet supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du projet :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

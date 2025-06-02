const { getTesttechnique, getUser, getFormation } = require("../utils/db");

const Testtechnique = getTesttechnique();
const User = getUser();
const Formation = getFormation();

const createTestTechnique = async (req, res) => {
  try {
    const Testtechnique = getTesttechnique();
    const { titre, text, userId, formationId } = req.body;

    // Vérifier si un test existe déjà pour ce user et cette formation
    const existingTest = await Testtechnique.findOne({
      where: { userId, formationId }
    });

    if (existingTest) {
      return res.status(400).json({ error: "Vous avez déjà ajouté un test pour cette formation." });
    }

    // Sinon, créer le nouveau test
    const newTest = await Testtechnique.create({ titre, text, userId, formationId });
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ error: "Failed to create test technique", details: err.message });
  }
};


// Get all Test Techniques
const getAllTestsTechnique = async (req, res) => {
  try {
    const tests = await Testtechnique.findAll({
      include: [User, Formation],
    });
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch test techniques", details: err.message });
  }
};
const getTestsByUserId = async (req, res) => {
  try {
    const Testtechnique = getTesttechnique();
    const Formation = getFormation();
    const { userId } = req.params;

    const tests = await Testtechnique.findAll({
      where: { userId },
      include: [
        {
          model: Formation,
          attributes: ['id', 'title'] // <-- le titre est ici
        }
      ]
    });

    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch user’s test techniques",
      details: err.message,
    });
  }
};

// Get Test Technique by ID
const getTestTechniqueById = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Testtechnique.findByPk(id, {
      include: [User, Formation],
    });
    if (!test) return res.status(404).json({ error: "Test not found" });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch test technique", details: err.message });
  }
};

// Update Test Technique by ID
const updateTestTechnique = async (req, res) => {
  try {
    const TesttechniqueModel = getTesttechnique();  // Model
    const Formation = getFormation();

    const { titre, text, formationId, userId } = req.body;
    console.log("hethy req.body",req.body);
    

    const testtechnique = await TesttechniqueModel.findByPk(req.params.id); // Instance
    if (!testtechnique) {
      return res.status(404).json({ message: "Test technique not found" });
    }

    await testtechnique.update({ titre, text, formationId, userId });

    res.status(200).json(testtechnique);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete Test Technique by ID
const deleteTestTechnique = async (req, res) => {
  try {
    const Testtechnique = getTesttechnique();
    const Formation = getFormation();
    const { id } = req.params;
    const deleted = await Testtechnique.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Test not found" });
    res.status(200).json({ message: "Test technique deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete test technique", details: err.message });
  }
};

module.exports = {
  createTestTechnique,
  getAllTestsTechnique,
  getTestsByUserId,
  getTestTechniqueById,
  updateTestTechnique,
  deleteTestTechnique,
};

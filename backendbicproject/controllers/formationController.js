const { getUser, getFormation, getEvaluation } = require("../utils/db");



exports.getAllFormations = async (req, res) => {
  try {
    const Formation = getFormation();
    const User = getUser();
    const { id } = req.params;

    console.log("User ID:", id);

    // Formations where the user is the creator
    const formationsAsCreator = await Formation.findAll({
      where: { userId: id },
      include: [
        {
          model: User,
          as: 'Participants',
          through: { attributes: [] }
        }
      ]
    });

    // Formations where the user is a participant (not the creator)
    const userWithParticipations = await User.findByPk(id, {
      include: [
        {
          model: Formation,
          as: 'ParticipatedFormations',
          through: { attributes: [] },
          include: [
            {
              model: User,
              as: 'Participants',
              through: { attributes: [] }
            }
          ]
        }
      ]
    });

    const formationsAsParticipant = userWithParticipations?.ParticipatedFormations || [];

    // Merge both lists and remove duplicates by ID
    const allFormationsMap = new Map();

    formationsAsCreator.forEach(f => allFormationsMap.set(f.id, f));
    formationsAsParticipant.forEach(f => {
      if (!allFormationsMap.has(f.id)) {
        allFormationsMap.set(f.id, f);
      }
    });

    const allFormations = Array.from(allFormationsMap.values());
    console.log("All formations for user:", JSON.stringify(allFormations, null, 2));

    return res.status(200).json(allFormations);
  } catch (error) {
    console.error("Error fetching formations:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get a single formation by ID
exports.getFormationById = async (req, res) => {
  try {
    const Formation = getFormation();
    const {id} = req.params;
    console.log("ID de la formation:", id); // <= Ajoute ça pour le debug
    const formation = await Formation.findByPk(req.params.id);
    console.log("formation trouvée:", formation); // <= Ajoute ça
    if (!formation)
      return res.status(404).json({ message: "Formation not found" });
    res.json(formation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new formation (with user participants)
exports.createFormation = async (req, res) => {
  try {
    const Formation = getFormation();
    const User = getUser();
    const { mode, title, lieu, type, time, duree, participantIds, userId } =
      req.body;
    //check if formation already exists
    const existingFormation = await Formation.findOne({
      where: { title, time },
    });

    if (existingFormation) {
      return res
        .status(400)
        .json({ message: "Formation with this title already exists" });
    }

    const newFormation = await Formation.create({
      mode,
      title,//:title.toLowerCase(),
      lieu,
      type,
      time,
      duree,
      userId,
    });

    if (participantIds && participantIds.length > 0) {
      const users = await User.findAll({ where: { id: participantIds } });
      await newFormation.addUsers(users); // Many-to-many association
    }

    res.status(201).json(newFormation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a formation and its participants
exports.updateFormation = async (req, res) => {
  try {
    const Formation = getFormation();
    const User = getUser();
    const { mode, title, lieu, type, time, duree, participantIds } = req.body;

    const formation = await Formation.findByPk(req.params.id);
    if (!formation)
      return res.status(404).json({ message: "Formation not found" });

    await formation.update({ mode, title, lieu, type, time, duree });

    if (participantIds) {
      const users = await User.findAll({ where: { id: participantIds } });
      await formation.setUsers(users); // Reset participants
    }

    res.json(formation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteFormation = async (req, res) => {
  try {
    const Formation = getFormation();
    const EvaluationAChaud = getEvaluation();
    const User = getUser();

    const formation = await Formation.findByPk(req.params.id);
    console.log("Formation trouvée:", formation); // <= Ajoute ça

    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    // Supprimer les relations participants
    await formation.setUsers([]);

    // Supprimer les évaluations liées
    await EvaluationAChaud.destroy({ where: { formationId: formation.id } });

    // Supprimer la formation
    await formation.destroy();

    res.json({ message: "Formation deleted successfully" });

  } catch (error) {
    console.error("Error deleting formation:", error);
    res.status(500).json({ error: error.message });
  }
};

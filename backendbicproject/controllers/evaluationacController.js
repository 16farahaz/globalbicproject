const { getEvaluation, getUser, getFormation } = require('../utils/db');
// Create a new evaluation (A chaud) for a formation

exports.createEvaluation = async (req, res) => {
  try {
    const EvaluationAChaud = getEvaluation();
    const User = getUser();
    const Formation = getFormation();

    const { question1, question2, question3, question4, question5, userId, formationId } = req.body;

    // 1. Vérifier si l'utilisateur existe
    const userExists = await User.findByPk(userId);
    if (!userExists) return res.status(400).json({ message: "Utilisateur introuvable" });

    // 2. Vérifier si la formation existe
    const formationExists = await Formation.findByPk(formationId);
    if (!formationExists) return res.status(400).json({ message: "Formation introuvable" });

    // 3. Vérifier si la date actuelle est postérieure à la date de la formation
    const now = new Date();
    const formationDate = new Date(formationExists.time);
    if (now <= formationDate) {
      return res.status(400).json({ message: "Vous ne pouvez évaluer qu'après la date de la formation." });
    }

    // 4. Vérifier si l'utilisateur a déjà évalué cette formation
    const existingEvaluation = await EvaluationAChaud.findOne({
      where: {
        userId,
        formationId
      }
    });

    if (existingEvaluation) {
      return res.status(400).json({ message: "Vous avez déjà évalué cette formation." });
    }

    // 5. Créer l'évaluation
    const newEvaluation = await EvaluationAChaud.create({
      question1,
      question2,
      question3,
      question4,
      question5,
      userId,
      formationId,
    });

    res.status(201).json(newEvaluation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Get all evaluations of the connected user
exports.getUserEvaluations = async (req, res) => {
  try {
    const EvaluationAChaud = getEvaluation();
    const User = getUser();
    const Formation = getFormation();

    const userId = req.params.userId;

    const evaluations = await EvaluationAChaud.findAll({
      where: { userId },
      attributes: ['id', 'question1', 'question2', 'question3', 'question4', 'question5', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'name']  // replace 'username' if it's a different column in your User model
        },
        {
          model: Formation,
          attributes: ['id', 'title']
        }
      ]
    });

    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







// Get evaluations by formation ID
exports.getFormationEvaluations = async (req, res) => {
  try {
    const EvaluationAChaud = getEvaluation();
    const User = getUser();
    const Formation = getFormation();

    const formationId = req.params.formationId;

    const evaluations = await EvaluationAChaud.findAll({
      where: { formationId },
      include: [
        {
          model: User,
          attributes: ['id', 'name'] // Adjust based on your actual User model fields
        },
        {
          model: Formation,
          attributes: ['id', 'title']
        }
      ]
    });
    console.log("les formation ", evaluations);
    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'No evaluations found for this formation' });
    }

    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};













// Get statistics for all formations to now the score and participant count for the formation view

exports.getFormationStats = async (req, res) => {
  try {
    const EvaluationAChaud = getEvaluation();
    const Formation = getFormation();
    const User = getUser();

    // Find all formations with participant count and average evaluation score
    const formations = await Formation.findAll({
      attributes: [
        'id',
        'title',
        // Count distinct participants (users in FormationParticipants join table)
        [
          Sequelize.literal(`(
            SELECT COUNT(DISTINCT "userId")
            FROM "FormationParticipants"
            WHERE "FormationParticipants"."formationId" = "Formation"."id"
          )`),
          'participantCount'
        ],
        // Average score across all evaluations linked to the formation
        [
          Sequelize.literal(`(
            SELECT AVG(("question1" + "question2" + "question3" + "question4" + "question5") / 5)
            FROM "evaluation_a_chaud"
            WHERE "evaluation_a_chaud"."formationId" = "Formation"."id"
          )`),
          'averageScore'
        ]
      ],
      order: [['title', 'ASC']]
    });

    res.json(formations);
  } catch (error) {
    console.error('Error fetching formation stats:', error);
    res.status(500).json({ error: error.message });
  }
};

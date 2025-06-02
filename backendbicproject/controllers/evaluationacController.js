const { getEvaluation, getUser, getFormation,getSequelize } = require('../utils/db');
const { Sequelize } = require('sequelize');
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
/* 

exports.getFormationStats = async (req, res) => {
  try {
    const Formation = getFormation();

    const formations = await Formation.findAll({
      attributes: [
        'id',
        'title',

        // Nombre total de participants uniques (via la table de jointure)
        [
          Sequelize.literal(`(
            SELECT COUNT(DISTINCT "userId")
            FROM "FormationParticipants"
            WHERE "FormationParticipants"."formationId" = "Formation"."id"
          )`),
          'participantCount'
        ],

        // Moyenne des 5 questions sur 5 (score moyen par formation)
        [
          Sequelize.literal(`(
            SELECT ROUND(AVG(
              ("question1" + "question2" + "question3" + "question4" + "question5") / 5
            ), 2)
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
    console.error('❌ Error fetching formation stats:', error);
    res.status(500).json({ error: error.message });
  }
};
 */


exports.getFormationScore = async (req, res) => {
  try {
    const Formation = getFormation();
    const EvaluationAChaud = getEvaluation();
    const sequelize = getSequelize();

    const formationId = req.params.id;

    // Vérifier que la formation existe
    const formation = await Formation.findByPk(formationId);
    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    // Compter le nombre de participants via la table de liaison FormationParticipants
    const participantCountResult = await sequelize.query(
      `SELECT COUNT(*) FROM "FormationParticipants" WHERE "formationId" = :formationId`,
      {
        replacements: { formationId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const participantCount = parseInt(participantCountResult[0].count, 10);

    // Récupérer toutes les évaluations pour cette formation
    const evaluations = await EvaluationAChaud.findAll({
      where: { formationId },
    });

    if (evaluations.length === 0) {
      return res.status(200).json({
        formationId,
        participantCount,
        totalScore: 0,
        averageScore: 0,
        percentScore: "0%",
        message: "Aucune évaluation trouvée pour cette formation."
      });
    }

    let totalScore = 0;

    evaluations.forEach((eval) => {
      const scoreParticipant =
        eval.question1 +
        eval.question2 +
        eval.question3 +
        eval.question4 +
        eval.question5;

      totalScore += scoreParticipant;
    });

    // Moyenne sur le nombre réel de participants (inscrits)
    const averageScore = participantCount > 0 ? totalScore / participantCount : 0;
    const maxScorePerParticipant = 5 * 4; // 5 questions, max 5 par question = 25 max score
    const percentScore = averageScore / maxScorePerParticipant * 100;

    res.json({
      formationId,
      participantCount,
      totalScore,
      averageScore,
      percentScore: percentScore.toFixed(2) + "%",
    });

  } catch (error) {
    console.error("Erreur lors du calcul du score de la formation :", error);
    res.status(500).json({ error: error.message });
  }
};
 
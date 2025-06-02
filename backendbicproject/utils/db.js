const { Sequelize } = require("sequelize");
const createUserModel = require("../models/User");
const createFormationModel = require("../models/Formation");
const createEvaluationModel = require("../models/Evaluationachaud");
const createProjetModel = require("../models/Projet");
const createTesttechniqueModel = require('../models/Testtechnique');

let sequelize = null;

let User = null;
let Formation = null;
let EvaluationAChaud = null;
let Projet = null;
let Testtechnique = null; // declare at top

const dbconnection = async (database, username, password) => {
  sequelize = new Sequelize(database, username, password, {
    host: "localhost",
    port: 5433,
    dialect: "postgres",
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log("✅ Connection established successfully.");

    // Créer les modèles
    User = createUserModel(sequelize);
    Formation = createFormationModel(sequelize);
    EvaluationAChaud = createEvaluationModel(sequelize);
    Projet = createProjetModel(sequelize);
    Testtechnique = createTesttechniqueModel(sequelize);

    // Relation: User (creator) -> Formation
    User.hasMany(Formation, { foreignKey: "userId" });
    Formation.belongsTo(User, { foreignKey: "userId" });

    // Relation: User -> Evaluation
    User.hasMany(EvaluationAChaud, { foreignKey: "userId" });
    EvaluationAChaud.belongsTo(User, { foreignKey: "userId" });

    // Relation: Formation -> Evaluation
    Formation.hasMany(EvaluationAChaud, {
      foreignKey: "formationId",
      onDelete: "CASCADE",
    });
    EvaluationAChaud.belongsTo(Formation, { foreignKey: "formationId" });

    // Many-to-Many: User <-> Formation (participants)
    User.belongsToMany(Formation, {
      through: "FormationParticipants",
      foreignKey: "userId",
      otherKey: "formationId",
      as: "ParticipatedFormations", // <-- ADDED alias here
    });

    Formation.belongsToMany(User, {
      through: "FormationParticipants",
      foreignKey: "formationId",
      otherKey: "userId",
      as: "Participants", // <-- ADDED alias here
    });

    // Projet Associations

    User.hasMany(Projet, { foreignKey: "userId" });
    Projet.belongsTo(User, { foreignKey: "userId" });

    Formation.hasMany(Projet, { foreignKey: "formationId" });
    Projet.belongsTo(Formation, { foreignKey: "formationId" });

    //-------------Test Technique ya maryem kamlllllna <3
    User.hasMany(Testtechnique, { foreignKey: "userId" });
    Testtechnique.belongsTo(User, { foreignKey: "userId" });

    Formation.hasMany(Testtechnique, { foreignKey: "formationId" });
    Testtechnique.belongsTo(Formation, { foreignKey: "formationId" });

    // Synchroniser
    await sequelize.sync({ alter: true });
    console.log(" Tables created or updated successfully.");
  } catch (error) {
    console.error(" Unable to connect to the database:", error);
    throw error;
  }

  return sequelize;
};

// Exporter tout
module.exports = {
  dbconnection,
  getUser: () => User,
  getFormation: () => Formation,
  getEvaluation: () => EvaluationAChaud,
  getSequelize: () => sequelize,
  getProjet: () => Projet, // Export Projet model
  getTesttechnique: () => Testtechnique,
};

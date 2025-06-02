const { Sequelize } = require('sequelize');
const createUserModel = require('../models/User');
const createFormationModel = require('../models/Formation');
const createEvaluationModel = require('../models/Evaluationachaud');

let sequelize = null;

let User = null;
let Formation = null;
let EvaluationAChaud = null;

const dbconnection = async (database, username, password) => {
  sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log('✅ Connection established successfully.');

    // Créer les modèles
    User = createUserModel(sequelize);
    Formation = createFormationModel(sequelize);
    EvaluationAChaud = createEvaluationModel(sequelize);

    // Relation: User (creator) -> Formation
    User.hasMany(Formation, { foreignKey: 'userId' });
    Formation.belongsTo(User, { foreignKey: 'userId' });

    // Relation: User -> Evaluation
    User.hasMany(EvaluationAChaud, { foreignKey: 'userId' });
    EvaluationAChaud.belongsTo(User, { foreignKey: 'userId' });

    // Relation: Formation -> Evaluation
    Formation.hasMany(EvaluationAChaud, { foreignKey: 'formationId', onDelete: 'CASCADE' });
    EvaluationAChaud.belongsTo(Formation, { foreignKey: 'formationId' });

    // Many-to-Many: User <-> Formation (participants)
    User.belongsToMany(Formation, {
      through: 'FormationParticipants',
      foreignKey: 'userId',
      otherKey: 'formationId',
      as: 'ParticipatedFormations', // <-- ADDED alias here
    });

    Formation.belongsToMany(User, {
      through: 'FormationParticipants',
      foreignKey: 'formationId',
      otherKey: 'userId',
      as: 'Participants', // <-- ADDED alias here
    });

    // Synchroniser
    await sequelize.sync({ alter: true });
    console.log('✅ Tables created or updated successfully.');

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
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
  getSequelize: () => sequelize
};

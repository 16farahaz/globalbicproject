const { DataTypes } = require("sequelize"); // ← Il manquait cette ligne

const createEvaluationModel = (sequelize) => {
  const EvaluationAChaud = sequelize.define(
    "EvaluationAChaud",
    {
      question1: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 1, max: 4 } },
      question2: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 1, max: 4 } },
      question3: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 1, max: 4 } },
      question4: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 1, max: 4 } },
      question5: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 1, max: 4 } },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
      },
      formationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'formations', key: 'id' },
      },
    },
    {
      timestamps: true,
      tableName: 'evaluation_a_chaud'
    }
  );

  return EvaluationAChaud;
};

module.exports = createEvaluationModel;

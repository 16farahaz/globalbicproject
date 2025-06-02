const { DataTypes } = require("sequelize");
const { format } = require("sequelize/lib/utils");

const createProjetModel = (sequelize) => {
  const Projet = sequelize.define(
    "Projet",
    {
      titre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },

      formationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'formations', key: 'id' },
      },
    },
    {
      timestamps: true,
    }
  );
  return Projet;
};

module.exports = createProjetModel;

const { DataTypes } = require('sequelize');

const createTesttechniqueModel = (sequelize) => {
  const Testtechnique = sequelize.define('Testtechnique', {
    titre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
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
  }, {
    timestamps: true,
   
  });
  return Testtechnique;
};

module.exports = createTesttechniqueModel;
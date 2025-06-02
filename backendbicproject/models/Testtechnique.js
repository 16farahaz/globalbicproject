const { DataTypes } = require('sequelize');

const createTesttechniqueModel = (sequelize) => {
  const Testtechnique = sequelize.define('Testtechnique', {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
   
    description: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    formationId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'Formations', // Assuming you have a Formations model
        key: 'id'
      }
    }, 
  }, {
    timestamps: true,
   
  });
  return Testtechnique;
};

module.exports = createTesttechniqueModel;
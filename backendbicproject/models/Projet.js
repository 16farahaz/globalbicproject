const { DataTypes } = require('sequelize');
const { format } = require('sequelize/lib/utils');

const createProjetModel = (sequelize) => {
  const Projet = sequelize.define('Projet', {
    ppt: { 
      type: DataTypes.STRING, 
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
  return Projet;
};

module.exports = createProjetModel;
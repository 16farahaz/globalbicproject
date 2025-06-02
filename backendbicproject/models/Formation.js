const { DataTypes } = require('sequelize');


const createFormationModel = (sequelize) => {
  const Formation = sequelize.define('Formation', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
      },
    mode: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      defaultValue: 'Formation Générale par bic' 
    },
    lieu: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    type: { 
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: 'Integré' 
    },
    time: { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
    duree: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    }
  }, {
    timestamps: true,
    tableName: 'formations'
  });

  return Formation;
};

module.exports = createFormationModel;

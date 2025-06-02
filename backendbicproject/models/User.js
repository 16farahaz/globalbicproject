const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const createModel = (sequelize) => {
  const User = sequelize.define('User', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      defaultValue: 'Responsable RH' 
    },
    matricule: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    phone: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    address: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true, 
      validate: { isEmail: true } 
    },
    motdepasse: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    isAdmin: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },
    isactive: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    }
  }, {
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('motdepasse')) {
          const salt = await bcrypt.genSalt(10);
          user.motdepasse = await bcrypt.hash(user.motdepasse, salt);
        }
      }
    }
  });

  User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.motdepasse);
  };

  return User;
};

module.exports = createModel;
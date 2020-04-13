
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
      len: [1]
    }
    }, 
  });
      return User;
      };

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", { 
      displayName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [6]
        }
      },
      uid: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },  
      updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      }
  });
  
  return User;
};
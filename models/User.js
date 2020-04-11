
// Creating our User model


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", { 
      displayName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true
      },
  
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },  
  });
      User.associate = function(models) {
          User.hasMany(models.Movie, {
          onDelete: "cascade"  
        });
      }
  return User;
};

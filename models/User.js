
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

  User.associate = function(models) {
    // Associating User with Movies
    // When an User is deleted, also delete any associated Movies
    User.hasMany(models.Movie, {
      onDelete: "cascade"
    });
  };

  return User;
};


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
      // genre: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     len: [1]
      //   }
      // },
      // dinner: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     len: [1]
      //   }
      // },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },  
  });
      User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
          User.hasMany(models.Movie, {
          onDelete: "cascade"  
        });
      }
  return User;
};

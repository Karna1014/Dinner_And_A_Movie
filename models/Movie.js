module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      genreName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

    });

<<<<<<< HEAD
=======
    // Movie.associate = function(models) {
    //   Movie.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
>>>>>>> d61e0e22ca683e70592fd8d3f87c25d734a79684
  
    return Movie;
  };
  

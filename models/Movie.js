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

    // Movie.associate = function(models) {
    //   Movie.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return Movie;
  };
  

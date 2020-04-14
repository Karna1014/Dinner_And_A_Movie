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

    Movie.associate = function(models) {
      // We're saying that a Movie should belong to a User
      // A Movie can't be created without a User due to the foreign key constraint
      Movie.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

  
    return Movie;
  };
  

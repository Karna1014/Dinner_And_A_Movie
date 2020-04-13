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

  
    return Movie;
  };
  

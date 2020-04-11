module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },

      dinner: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1]
        }
      },

    });

    Movie.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Movie.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Movie;
  };
  

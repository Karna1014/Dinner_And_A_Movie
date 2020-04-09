module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
          len: [1]
        }
      },

      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      }
    });
    
    // Movie.associate = function(models) {
    //   User.hasMany(models.Dinner, {
    //     onDelete: "cascade"
    //   });
    // };
  
    return Movie;
  };
  
  
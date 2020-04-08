module.exports = function(sequelize, DataTypes) {
    var Dinner = sequelize.define("Dinner", {
      style: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Dinner.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Dinner.belongsTo(models.Movie, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Dinner;
  };
  
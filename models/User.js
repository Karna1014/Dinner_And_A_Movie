// Creating our User model

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    }
    }, 
    
  )};



// User.associate = function (models) {
//   User.hasMany(models.Movie, {
//     onDelete: "cascade",
//   });

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database

  User.sync();


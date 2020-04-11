
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
<<<<<<< HEAD
     
      
       
=======
  
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },  
>>>>>>> 697bc081e7e15152baa1b10c1ceef894738a6f28
  });
      User.associate = function(models) {
          User.hasMany(models.Movie, {
          onDelete: "cascade"  
        });
      }
  return User;
};

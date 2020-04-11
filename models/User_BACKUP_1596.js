
// Creating our User model


module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
  var User = sequelize.define("users", { 
      id:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    displayName: {
=======
  var User = sequelize.define("User", { 
      displayName: {
>>>>>>> master
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
<<<<<<< HEAD
      }
      // updatedAt: {
      //     type: DataTypes.DATE,
      //     defaultValue: DataTypes.NOW
      // }
      }, {
        freezeTableName: true
      }
  );
 
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  
=======
      },  
>>>>>>> 697bc081e7e15152baa1b10c1ceef894738a6f28
  });
      User.associate = function(models) {
          User.hasMany(models.Movie, {
          onDelete: "cascade"  
        });
      }
>>>>>>> master
  return User;
};

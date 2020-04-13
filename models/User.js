<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
=======

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
>>>>>>> d61e0e22ca683e70592fd8d3f87c25d734a79684
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
      len: [1]
    }
    }, 
<<<<<<< HEAD
  });
      return User;
      };
=======
    
  });

  return User;

  };


>>>>>>> d61e0e22ca683e70592fd8d3f87c25d734a79684

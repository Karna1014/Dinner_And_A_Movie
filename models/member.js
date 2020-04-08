module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("Member", {
      email: DataTypes.STRING,
      displayName: DataTypes.STRING,
      password: DataTypes.STRING,
      uid: DataTypes.STRING
    });
    
    return Todo;
  };
module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define("member", {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        len: [6]
      },
      uid: DataTypes.STRING
    });
    
    return Member;
  };
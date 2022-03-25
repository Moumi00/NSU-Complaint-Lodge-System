module.exports = (sequelize, DataTypes) => {
    const GoogleVerified = sequelize.define("GoogleVerified", {
      googleID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  
    GoogleVerified.associate = (models) => {
      GoogleVerified.belongsTo(models.Users, {
        foreignKey: {
          name: "UserUNID",
        },
      });
    }; 
   
    return GoogleVerified;
  };
  
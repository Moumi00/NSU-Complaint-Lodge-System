module.exports = (sequelize, DataTypes) => {
    const GoogleVerification = sequelize.define("GoogleVerification", {
      googleID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  
    GoogleVerification.associate = (models) => {
      GoogleVerification.belongsTo(models.Users, {
        foreignKey: {
          name: "UserUNID",
        },
      });
    }; 
   
    return GoogleVerification;
  };
  
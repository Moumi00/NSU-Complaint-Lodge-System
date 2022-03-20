module.exports = (sequelize, DataTypes) => {
  const Complain = sequelize.define("Complain", {
    complainUNID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    complainTitle: DataTypes.STRING,
    complainDescription: DataTypes.STRING,
    complainReviewer: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  Complain.associate = (models) => {
    Complain.belongsTo(models.Users, {
      foreignKey: {
        name: "ComplainerUNID", 
      },
    });
  };

  return Complain;
};

module.exports = (sequelize, DataTypes) => {
  const ComplainAgainst = sequelize.define("ComplainAgainst");

  ComplainAgainst.associate = (models) => {
    ComplainAgainst.belongsTo(models.Complain, {
      foreignKey: {
        name: "ComplainUNID",
      },
    });
    ComplainAgainst.belongsTo(models.Users, {
      foreignKey: {
        name: "ComplainAgainstUserUNID",
      },
    });
  };

  return ComplainAgainst;
};

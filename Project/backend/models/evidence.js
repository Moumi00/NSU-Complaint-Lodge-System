module.exports = (sequelize, DataTypes) => {
  const Evidence = sequelize.define("Evidence", {
    evidence: DataTypes.STRING,
  });

  Evidence.associate = (models) => {
    Evidence.belongsTo(models.Complain, {
      foreignKey: {
        name: "ComplainUNID",
      },
    });
  };
  return Evidence;
};

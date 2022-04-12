module.exports = (sequelize, DataTypes) => {
  const Evidence = sequelize.define("Evidence", {
    evidence: DataTypes.STRING,
    editHistory: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
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

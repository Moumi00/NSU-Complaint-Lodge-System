module.exports = (sequelize, DataTypes) => {
    const ComplainDescription = sequelize.define("ComplainDescription", {
      complainDescription: DataTypes.STRING
    });
  
    ComplainDescription.associate = (models) => {
      ComplainDescription.belongsTo(models.Complain, {
        foreignKey: {
          name: "ComplainUNID",
        },
      });
    };
  
    return ComplainDescription;
  };
  
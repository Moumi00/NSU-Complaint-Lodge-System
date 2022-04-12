module.exports = (sequelize, DataTypes) => {
    const ComplainDescription = sequelize.define("ComplainDescription", {
      complainDescription: DataTypes.STRING,
      editHistory: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
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
  
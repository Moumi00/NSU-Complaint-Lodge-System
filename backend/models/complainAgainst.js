module.exports = (sequelize, DataTypes) => {

    const ComplainAgainst = sequelize.define("ComplainAgainst", {
        complainAgainstUNID: DataTypes.STRING,
    })

    ComplainAgainst.associate = (models) => {
        ComplainAgainst.belongsTo(models.Complain, {
          foreignKey: {
            name: "ComplainUNID",
          },
        });
      };


    return ComplainAgainst

}  
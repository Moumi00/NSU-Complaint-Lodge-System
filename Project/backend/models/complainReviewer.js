module.exports = (sequelize, DataTypes) => {
  const ComplainReviewer = sequelize.define("ComplainReviewer");

  ComplainReviewer.associate = (models) => {
    ComplainReviewer.belongsTo(models.Complain, {
      foreignKey: {
        name: "ComplainUNID"
      },
    });
    ComplainReviewer.belongsTo(models.Users, {
        foreignKey: {
          name: "ComplainReviewerUserUNID"
        },
      });
  };

  return ComplainReviewer;
};
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment: DataTypes.STRING,
    commentNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Complain, {
      foreignKey: {
        name: "ComplainUNID",
      },
    });
  };

  return Comment;
};

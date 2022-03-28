module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    userUNID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    fullName: DataTypes.STRING,
    nsuId: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    actorType: {
      type: DataTypes.ENUM("Reviewer", "Non-Reviewer"),
    },
    nsuIdPhoto: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.UserVerification, {
      foreignKey: {
        name: "UserUNID",
      }, 
    });
  };

  return Users;
};
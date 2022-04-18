module.exports = (sequelize, DataTypes) => {
  const Complain = sequelize.define("Complain", {
    complainUNID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    complainTitle: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("Open", "Close"),
      defaultValue: "Open",
    },
    edits: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
    }
    
  }); 

  Complain.associate = (models) => {
    Complain.belongsTo(models.Users, {
      foreignKey: {
        name: "ComplainerUNID",
      },
    });
    Complain.hasMany(models.ComplainReviewer, {
      foreignKey: {
        name: "ComplainUNID",
      },
    });
    Complain.hasMany(models.ComplainDescription, {
      foreignKey: { 
        name: "ComplainUNID",
      },
    });
    Complain.hasMany(models.ComplainAgainst, {
      foreignKey : {
        name: "ComplainUNID",
      }
    });
    Complain.hasMany(models.Evidence, {
      foreignKey : {
        name: "ComplainUNID",
      }
    });
    Complain.hasMany(models.Comment, {
      foreignKey : {
        name: "ComplainUNID",
      }
    });
  };

  return Complain;
};

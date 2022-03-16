module.exports = (sequelize, DataTypes) => {

    const Complain = sequelize.define("Complain", {
        complainUNID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        complainerUNID: DataTypes.STRING,
        complainTitle: DataTypes.STRING,
        complainDescription: DataTypes.STRING,
        complainReviewer: DataTypes.STRING,
        status: DataTypes.STRING,
    })


    return Complain

} 
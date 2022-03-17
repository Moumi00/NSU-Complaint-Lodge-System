module.exports = (sequelize, DataTypes) => {

    const Evidence = sequelize.define("Evidence", {
        complainUNID: DataTypes.STRING,
        evidence: DataTypes.STRING,
    }) 
    return Evidence
}
module.exports = (sequelize, DataTypes) => {

    const ComplainAgainst = sequelize.define("ComplainAgainst", {
        complainUNID: DataTypes.STRING,
        complainAgainstUNID: DataTypes.STRING,
    })


    return ComplainAgainst

}  
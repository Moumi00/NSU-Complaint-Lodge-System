module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        UNID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        userType: DataTypes.STRING,
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    })

    return Users

} 
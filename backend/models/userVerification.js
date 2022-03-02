
module.exports = (sequelize, DataTypes) => {

    const UserVerification = sequelize.define("UserVerification", {
        verificationToken: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        expiryDate: {
            type: DataTypes.DATE(6),
        }
    })

    UserVerification.associate = (models) => {
        UserVerification.belongsTo(models.Users)
    }

    return UserVerification

} 
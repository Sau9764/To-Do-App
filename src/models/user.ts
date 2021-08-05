module.exports = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { args: true, msg: "You must enter a name" }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { args: true, msg: "You must enter a password" }
            }
        }
    })
    return User;
}
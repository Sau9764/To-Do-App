module.exports = (sequelize: any, DataTypes: any) => {
    const Todo = sequelize.define("Todo", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Todo;
}
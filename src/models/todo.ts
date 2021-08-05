module.exports = (sequelize: any, DataTypes: any) => {
    const Todo = sequelize.define("Todo", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING
        }
    })
    return Todo;
}
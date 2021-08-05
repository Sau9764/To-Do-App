"use strict";
module.exports = function (sequelize, DataTypes) {
    var Todo = sequelize.define("Todo", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING
        }
    });
    return Todo;
};

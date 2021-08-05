"use strict";
module.exports = function (sequelize, DataTypes) {
    var Todo = sequelize.define("Todo", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Todo;
};

'use strict';

import { Model } from 'sequelize'
import { Todo } from '../interfaces'

module.exports = (sequelize: any, DataTypes: any) => {
  class Todos extends Model<Todo> implements Todo {

      id!: number;
      text!: string;
      userId!: number;
      
      // Time stamp
      readonly createdAt!: Date;
      readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
    }
  };
  Todos.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};
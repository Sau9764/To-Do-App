'use strict';

import { Model } from 'sequelize'
import { User } from '../interfaces'

module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends Model<User> implements User {
   
    id!: number;
    username!: string;
    password!: string;

    // Time stamp
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
    } 
  };
  Users.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
  },
  admin: {
      type: DataTypes.STRING,
      defaultValue: 'user'
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
      }
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          notNull: { msg: 'User must choose an email' },
          notEmpty: { msg: 'Email must not be empty' },
          isEmail: { msg: 'Email must be valid'}
      }
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  }
}, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
'use strict';
const {  Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    Id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password:DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    classMethods: {
      associate(models) {
        // associations can be defined here
        models.User.hasMany(models.Comment);
        models.User.hasMany(models.Comment);
       // models.Post.hasMany(models.Like);
       // models.Post.hasMany(models.Dislike);
      }
    }
  });
  return User;
};
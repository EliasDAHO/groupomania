'use strict';
const {  Model} = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
   
  const Post = sequelize.define('Post', {
     userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      image: DataTypes.STRING
    }, {
      classMethods: {
        associate(models) {
          // associations can be defined here
          models.Post.belongsTo(models.User,{
            foreignKey: {
              allowNull: false
            },
            onDelete: 'CASCADE'
          }),
          
          models.Post.hasMany(models.Comment);
         // models.Post.hasMany(models.Like);
         // models.Post.hasMany(models.Dislike);
        }
      }
    });
    return Post;
  };  
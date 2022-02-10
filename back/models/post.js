'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
  },
    content: { 
      type:DataTypes.STRING
    },
    image: {
      type:DataTypes.STRING
  }, 
    sequelize,
    tableName: 'posts',
    modelName: 'post',
  });
  return post;
};
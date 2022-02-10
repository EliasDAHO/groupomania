'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment.init({
    uuid:{ type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4 
    }, 
    content: { 
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: { msg: 'Comment cannot be null' },
          notEmpty: { msg: 'Comment cannot be empty' },
      }
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'comment',
  });
  return comment;
};
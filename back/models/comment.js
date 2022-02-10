'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
   
    static associate({ user, post }) {
    this.belongsTo(user, { foreignKey: 'userId' })
    this.belongsTo(post, { foreignKey: 'postId' })
    }
    toJSON(){
        return { ...this.get(), id: undefined, userId: undefined, postId: undefined }
    }
  };
  comment.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    content: {
        type: DataTypes.STRING,
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
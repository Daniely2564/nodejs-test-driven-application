const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Model = Sequelize.Model;

class User extends Model {}

// attributes, options
User.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);

module.exports = User;

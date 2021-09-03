const Sequelize = require('sequelize');
const config = require('config');

const db = config.get('database');

// 'Database Name','Username','DB Password',
const sequelize = new Sequelize(db.name, db.username, db.password, {
  dialect: db.dialect,
  storage: db.storage,
  logging: db.loggin,
});

module.exports = sequelize;

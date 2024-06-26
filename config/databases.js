const dbconfig = require("./config.json");
const { Sequelize } = require("sequelize");

const initModels = require("../models/initModels");

const db = dbconfig[process.env.NODE_ENV];

const { host, username, password, database, dialect } = db;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
  pool: {
    max: 1,
    min: 0,
    acquire: 100000,
    idle: 100000
  }
});
const databases = initModels(sequelize);

module.exports = databases;

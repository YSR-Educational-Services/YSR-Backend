const DataTypes = require("sequelize").DataTypes;

let _SequelizeMeta = require("./SequelizeMeta");
let _studentsRegistrations = require("./studentsRegistrations");
let _emcetStudent = require("./EmcetStudent");
let _ecetStudent = require("./EcetStudent");
let _admin = require("./admin");
let _refresh_tokens = require("./refresh_tokens");

function initModels(sequelize) {
  let SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  let students = _studentsRegistrations(sequelize, DataTypes);
  let emcetStudent = _emcetStudent(sequelize, DataTypes);
  let ecetStudent = _ecetStudent(sequelize, DataTypes);
  let admin = _admin(sequelize, DataTypes);
  let refresh_tokens = _refresh_tokens(sequelize, DataTypes);

  return {
    SequelizeMeta,
    students,
    emcetStudent,
    ecetStudent,
    admin,
    refresh_tokens
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

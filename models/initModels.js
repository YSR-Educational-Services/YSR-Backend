const DataTypes = require("sequelize").DataTypes;

let _SequelizeMeta = require("./SequelizeMeta");
let _refresh_tokens = require("./refresh_tokens");
let _studentsRegistrations = require("./studentsRegistrations");
let _students = require("./students");
let _eapcet = require("./eapcet");
let _ecet = require("./ecet");
let _admin = require("./admin");
let _emplyees = require("./employees");
let _eapcetDocuments = require("./eapcetDocuments");
let _management = require("./management");
let _loginDetails = require("./loginDetails");
let _notifications = require("./notifications");
let _icet = require("./icet");
let _icetClg = require("./icetColleges");
let _icetDocuments = require("./icetDocuments");

function initModels(sequelize) {
  let SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  let refresh_tokens = _refresh_tokens(sequelize, DataTypes);
  // let students = _studentsRegistrations(sequelize, DataTypes);
  let students = _students(sequelize, DataTypes);
  let eapcet = _eapcet(sequelize, DataTypes);
  let ecet = _ecet(sequelize, DataTypes);
  let admin = _admin(sequelize, DataTypes);
  let employees = _emplyees(sequelize, DataTypes);
  let eapcetDecuments = _eapcetDocuments(sequelize, DataTypes);
  let management = _management(sequelize, DataTypes);
  let loginDetails = _loginDetails(sequelize, DataTypes);
  let notifications = _notifications(sequelize, DataTypes);
  let icet = _icet(sequelize, DataTypes);
  let icetClg = _icetClg(sequelize, DataTypes);
  let icetDocuments = _icetDocuments(sequelize, DataTypes);

  return {
    SequelizeMeta,
    students,
    eapcet,
    ecet,
    admin,
    refresh_tokens,
    employees,
    eapcetDecuments,
    management,
    loginDetails,
    notifications,
    icet,
    icetClg,
    icetDocuments
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

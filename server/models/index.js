const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userlist = require("./model/user.model.js")(sequelize, Sequelize);
db.customer = require("./model/customer.model.js")(sequelize, Sequelize);
db.washlist = require("./model/washer.model.js")(sequelize, Sequelize);
module.exports = db;

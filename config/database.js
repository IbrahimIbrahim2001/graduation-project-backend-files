/*create the connection to the database */
const Sequelize = require("sequelize");
const sequelize = new Sequelize("bsfzxryreklnbdioc14v", "u1hzzu480lnicpnt", "q9kc97Tma9LdXk5YCnai", {
  dialect: "mysql",
  host: "bsfzxryreklnbdioc14v-mysql.services.clever-cloud.com",
});

module.exports = sequelize;

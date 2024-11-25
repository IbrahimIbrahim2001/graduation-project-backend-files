/*create the connection to the database */
const Sequelize = require("sequelize");
// const sequelize = new Sequelize("bsfzxryreklnbdioc14v", "u1hzzu480lnicpnt", "q9kc97Tma9LdXk5YCnai", {
//   dialect: "mysql",
//   host: "bsfzxryreklnbdioc14v-mysql.services.clever-cloud.com",
// });


const sequelize = new Sequelize('mysql://u1hzzu480lnicpnt:q9kc97Tma9LdXk5YCnai@bsfzxryreklnbdioc14v-mysql.services.clever-cloud.com:3306/bsfzxryreklnbdioc14v');
module.exports = sequelize;

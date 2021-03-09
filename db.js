//https://sequelize.org/master/manual/getting-started.html#testing-the-connection

//connects to database

const Sequelize = require("sequelize");
const sequelize = new Sequelize("modpod", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

//verify to test if connection is ok
sequelize.authenticate().then(
  function () {
    console.log("Connected to modpod postgres database");
  },
  function (err) {
    console.log("Unable to connect to the modpod database:", err);
  }
);

module.exports = sequelize;

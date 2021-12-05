const mysql = require("mysql2");

const { departments, employees, roles } = require("./data");

// database config
const dbOptions = {
  host: "localhost",
  user: "root",
  password: "Password123!!",
  database: "company_db",
};

// connect to database
const db = mysql.createConnection(dbOptions);

// seed the data
db.query();

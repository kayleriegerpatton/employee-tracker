const mysql = require("mysql2");

// database config
const dbOptions = {
  host: "localhost",
  user: "root",
  password: "Password123!!",
  database: "company_db",
};

// connect to database
const db = mysql.createConnection(dbOptions);

// question validation
const validateInput = (input) => {
  if (!input) {
    return "Field is required.";
  }
  return true;
};

const dbQuery = (query, action) => {
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (action === "view") {
      console.table(result);
      return;
    }
    return;
  });
};

module.exports = { validateInput, dbQuery };

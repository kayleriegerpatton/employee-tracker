// const mysql = require("mysql2");
const colors = require("colors");
colors.setTheme({
  success: ["bgGreen", "black"],
  warning: ["bgBrightYellow", "black"],
  fail: ["bgRed", "white", "bold"],
  message: ["bgBrightCyan", "black"],
});

// database config
// const dbOptions = {
//   host: "localhost",
//   user: "root",
//   password: "Password123!!",
//   database: "company_db",
// };

// connect to database
// const db = mysql.createConnection(dbOptions);

// question validation
const validateInput = (input) => {
  if (!input) {
    return "Field is required.".warning;
  }
  return true;
};

// const dbQuery = (query) => {
//   return new Promise((resolve, reject) => {
//     db.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//         return reject(err);
//       }

//       return resolve(result);
//     });
//   });
// };

module.exports = { validateInput };

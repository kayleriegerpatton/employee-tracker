const mysql = require("mysql2");

const { transformDepartments } = require("./transformers");
const { db, dbOptions } = require("./queries.js");

const generateDeptChoices = () => {
  // get departments from DB
  const query = `SELECT department.name AS Departments FROM department ORDER BY name;`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    return result;
  });
  //   db.end();

  const deptChoices = transformDepartments(result);

  return deptChoices;
};

module.exports = { generateDeptChoices };

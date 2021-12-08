const mysql = require("mysql2");
const {} = require("./queries");

const { dbQuery } = require("./utils");

const generateDeptChoices = async () => {
  // get departments from DB
  const allDepts = await dbQuery("SELECT * FROM department;");

  return allDepts.map((dept) => {
    return {
      name: dept.name,
      value: dept.id,
    };
  });
};

module.exports = { generateDeptChoices };

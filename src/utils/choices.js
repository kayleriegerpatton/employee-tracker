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

const generateRoleChoices = async () => {
  // get all roles from db
  const allRoles = await dbQuery("SELECT * FROM role;");

  return allRoles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
};

const generateEmployeesChoices = async () => {
  // get all employees from db
  const allEmployees = await dbQuery("SELECT * FROM employee;");

  return allEmployees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
};

module.exports = {
  generateDeptChoices,
  generateRoleChoices,
  generateEmployeesChoices,
};

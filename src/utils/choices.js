// internal imports
const { allManagersQuery } = require("./queries");

// get list of departments for question
const generateDeptChoices = async (db) => {
  // get departments from DB
  const allDepts = await db.query("SELECT * FROM department;");

  return allDepts.map((dept) => {
    return {
      name: dept.name,
      value: dept.id,
    };
  });
};

// get list of roles for question
const generateRoleChoices = async (db) => {
  // get all roles from db
  const allRoles = await db.query("SELECT * FROM role;");

  return allRoles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
};

// get list of employees for question
const generateEmployeesChoices = async (db) => {
  // get all employees from db
  const allEmployees = await db.query("SELECT * FROM employee;");

  return allEmployees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
};

// get list of managers
const generateManagersChoices = async (db) => {
  // get all managers from db
  const allManagers = await db.query(allManagersQuery);

  // return array of managers
  return allManagers.map((manager) => {
    return {
      name: manager.first_name + " " + manager.last_name,
      value: manager.id,
    };
  });
};

module.exports = {
  generateDeptChoices,
  generateRoleChoices,
  generateEmployeesChoices,
  generateManagersChoices,
};

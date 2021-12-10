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

module.exports = {
  generateDeptChoices,
  generateRoleChoices,
  generateEmployeesChoices,
};

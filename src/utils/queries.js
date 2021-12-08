const allEmployeesQuery = `SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", title AS Title, salary as "Salary", name AS Department
FROM employee
LEFT JOIN role
ON employee.role_id =role.id
LEFT JOIN department
ON role.department_id=department.id;`;

// view all roles
const allRolesQuery = `SELECT role.title AS Roles, role.salary AS Salary, department.name AS Department FROM role
  JOIN department ON role.department_id = department.id
  ORDER BY department.name;`;

// view all depts
const allDepartmentsQuery = `SELECT department.name AS Departments FROM department
  ORDER BY name;`;

// add employee
const addEmployee = (answers) => {
  // get roles from db
  // get employees from db for manager selection
  // pass roles to choices constructor fn
  // pass employees to choices constructor fn
  // call choices constructor fns in questions array? get answers
  // construct mysql query with answers & execute
  // INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('', '', #, #);
};

// update employee role
const updateEmployeeRole = (answers) => {
  // get employees from db (need id)
  // get roles from db (need id)
  // pass employee names and role names to choices constructor fns
  // call constructor fns in questions array? & get answers
  // pass employee.id and role.id into query variable
  // execute query
  // UPDATE employee
  // SET role_id = #
  // WHERE id = #;
};

module.exports = {
  //   displayRoles,
  //   displayDepts,
  //   addDepartment,
  //   addRole,
  //   addEmployee,
  //   updateEmployeeRole,
  allEmployeesQuery,
  allRolesQuery,
  allDepartmentsQuery,
};

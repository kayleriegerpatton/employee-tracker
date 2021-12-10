const allEmployeesQuery = `SELECT employee_role.first_name AS "First Name", employee_role.last_name AS "Last Name", title AS "Role", salary AS "Salary", name AS "Department", CONCAT (employee_manager.first_name, " ", employee_manager.last_name) as "Manager" FROM employee employee_role
LEFT JOIN role ON employee_role.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee employee_manager ON employee_role.manager_id = employee_manager.id;`;

// view all roles
const allRolesQuery = `SELECT role.title AS Role, role.salary AS Salary, department.name AS Department FROM role
  JOIN department ON role.department_id = department.id
  ORDER BY department.name;`;

// view all depts
const allDepartmentsQuery = `SELECT department.name AS Departments FROM department
  ORDER BY name;`;

module.exports = {
  allEmployeesQuery,
  allRolesQuery,
  allDepartmentsQuery,
};

const allEmployeesQuery = `SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", title AS Title, salary as "Salary", name AS Department
FROM employee
LEFT JOIN role
ON employee.role_id =role.id
LEFT JOIN department
ON role.department_id=department.id;`;

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

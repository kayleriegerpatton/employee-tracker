const allEmployeesQuery = `SELECT employee_role.first_name AS "First Name", employee_role.last_name AS "Last Name", employee_role.id AS "ID", title AS "Role", name AS "Department", salary AS "Salary", CONCAT (employee_manager.first_name, " ", employee_manager.last_name) as "Manager" FROM employee employee_role
LEFT JOIN role ON employee_role.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee employee_manager ON employee_role.manager_id = employee_manager.id ORDER BY employee_role.last_name;`;

// view all roles
const allRolesQuery = `SELECT role.title AS Role, role.salary AS Salary, department.name AS Department, role.id AS ID FROM role
  JOIN department ON role.department_id = department.id
  ORDER BY department.name;`;

// view all depts
const allDepartmentsQuery = `SELECT department.name AS Department, department.id AS ID FROM department
  ORDER BY name;`;

// view employees by manager
const employeesByManagerQuery = (manager) => {
  return `SELECT employee_role.first_name as "First Name", employee_role.last_name as "Last Name", title as "Role", salary as "Salary", name as "Department", CONCAT (employee_manager.first_name, " ", employee_manager.last_name) as "Manager"
FROM employee employee_role
LEFT JOIN role ON employee_role.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee employee_manager ON employee_role.manager_id = employee_manager.id WHERE employee_role.manager_id = ${manager};`;
};

// view managers
const allManagersQuery = `SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL; `;

// employees by dept
const employeesByDeptQuery = (employeeDeptName) => {
  return `SELECT employee_role.first_name as "First Name", employee_role.last_name as "Last Name", title as "Role", salary as "Salary", name as "Department", CONCAT (employee_manager.first_name, " ", employee_manager.last_name) as "Manager" FROM employee employee_role
  LEFT JOIN role ON employee_role.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee employee_manager ON employee_role.manager_id = employee_manager.id WHERE role.department_id = ${employeeDeptName};`;
};

module.exports = {
  allEmployeesQuery,
  allRolesQuery,
  allDepartmentsQuery,
  employeesByManagerQuery,
  allManagersQuery,
  employeesByDeptQuery,
};

// database queries


// view all depts
SELECT * FROM department;

// view all roles
SELECT role.id, role.title, role.salary, department.name AS department FROM role 
JOIN department ON role.department_id = department.id 
ORDER BY department.name;

// view all employees
SELECT employee.first_name, employee.last_name, title, salary, name AS department
FROM employee 
LEFT JOIN role 
ON employee.role_id =role.id 
LEFT JOIN department
ON role.department_id=department.id;

// add dept
INSERT INTO department (name) VALUES ('');

// add role
INSERT INTO role (title, salary, department_id) VALUES ('', , );

// add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('', '', #, #);

// update employee role
UPDATE employee 
SET role_id = #
WHERE id = #;

// module.exports = {queries}

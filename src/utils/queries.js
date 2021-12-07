const mysql = require("mysql2");
const cTable = require("console.table");

// database config
const dbOptions = {
  host: "localhost",
  user: "root",
  password: "Password123!!",
  database: "company_db",
};

// connect to database
const db = mysql.createConnection(dbOptions);

// view all employees
const displayEmployees = () => {
  const query = `SELECT employee.first_name, employee.last_name, title, salary, name AS department
  FROM employee
  LEFT JOIN role
  ON employee.role_id =role.id
  LEFT JOIN department
  ON role.department_id=department.id;`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("Employees", result);
  });
  //   db.end();
};

// view all roles
const displayRoles = () => {
  const query = `SELECT role.id, role.title, role.salary, department.name AS department FROM role
  JOIN department ON role.department_id = department.id
  ORDER BY department.name;`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("Roles", result);
  });
  db.end();
};

// view all depts
const displayDepts = () => {
  const query = `SELECT * FROM department
  ORDER BY name;`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("Departments", result);
  });
  db.end();
};

// QUERY SYNTAX:

// // add dept
// INSERT INTO department (name) VALUES ('');

// // add role
// INSERT INTO role (title, salary, department_id) VALUES ('', , );

// // add employee
// INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('', '', #, #);

// // update employee role
// UPDATE employee
// SET role_id = #
// WHERE id = #;

module.exports = { displayEmployees, displayRoles, displayDepts };

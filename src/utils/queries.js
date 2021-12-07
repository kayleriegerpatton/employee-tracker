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

// add dept
const addDepartment = (answers) => {
  const query = `INSERT INTO department (name) VALUES ('${answers.deptName}');`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`${answers.deptName} added to database.`);
  });
};

// add role
const addRole = (answers) => {
  // get departments from db
  // pass departments to choices constructor fn
  // call choices constructor in question array? get answers
  // construct mysql query from answers & execute
  // INSERT INTO role (title, salary, department_id) VALUES ('', , );
};

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
  displayEmployees,
  displayRoles,
  displayDepts,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};

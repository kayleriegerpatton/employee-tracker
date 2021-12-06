const mysql = require("mysql2");

const { departments, employees, roles } = require("./data");

// database config
const dbOptions = {
  host: "localhost",
  user: "root",
  password: "Password123!!",
  database: "company_db",
};

// connect to database
const db = mysql.createConnection(dbOptions);

// seed data to database
const insertDept = (dept) => {
  db.query(`INSERT INTO department (name) VALUE ('${dept}')`);
};

departments.forEach(insertDept);

const insertRole = ({ title, salary, departmentId }) => {
  db.query(
    `INSERT INTO role (title, salary, department_id) VALUE ('${title}', ${salary}, ${departmentId})`
  );
};

roles.forEach(insertRole);

const insertEmployee = ({ firstName, lastName, roleId, managerId }) => {
  managerId
    ? db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${firstName}', '${lastName}', ${roleId}, ${managerId})`
      )
    : db.query(
        `INSERT INTO employee (first_name, last_name, role_id) VALUE ('${firstName}', '${lastName}', ${roleId})`
      );
};

employees.forEach(insertEmployee);

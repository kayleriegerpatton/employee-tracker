// external imports
const mysql = require("mysql2");
const colors = require("colors");

colors.setTheme({
  greeting: ["rainbow"],
  success: ["bgGreen", "black"],
  warning: ["bgBrightYellow", "black", "bold"],
  fail: ["bgRed", "white", "bold"],
  message: ["bgBrightCyan", "black"],
});

// internal imports
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

// seed departments
const insertDept = (dept) => {
  db.query(`INSERT INTO department (name) VALUE ('${dept}')`);
};

departments.forEach(insertDept);
console.log("Added departments.".success);

// seed roles
const insertRole = ({ title, salary, departmentId }) => {
  db.query(
    `INSERT INTO role (title, salary, department_id) VALUE ('${title}', ${salary}, ${departmentId})`
  );
};

roles.forEach(insertRole);
console.log("Added roles.".success);

// seed employees
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
console.log("Added employees.".success);

db.end();

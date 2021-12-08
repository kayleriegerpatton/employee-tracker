// const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const colors = require("colors");
colors.setTheme({
  custom: ["bgCyan", "black"],
  success: ["bgGreen", "black"],
  removed: ["bgRed", "white"],
});

const {
  startQuestion,
  deptQuestion,
  roleQuestions,
  employeeQuestions,
  employeeRoleQuestions,
} = require("./questions");
const {
  displayRoles,
  displayDepts,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  allEmployeesQuery,
  allRolesQuery,
  allDepartmentsQuery,
} = require("./utils/queries");
const { dbQuery } = require("./utils/utils");

const start = async () => {
  let inProgress = true;

  while (inProgress) {
    const { task } = await inquirer.prompt(startQuestion);

    // VIEW options
    if (task === "viewEmployees") {
      const allEmployeesData = dbQuery(allEmployeesQuery, "view");
      console.log(allEmployeesData);
    }

    if (task === "viewRoles") {
      dbQuery(allRolesQuery, "view");
    }

    if (task === "viewDepts") {
      dbQuery(allDepartmentsQuery, "view");
    }

    // ADD options
    if (task === "addDept") {
      const { deptName } = await inquirer.prompt(deptQuestion);

      dbQuery(`INSERT INTO department (name) VALUES ('${deptName}');`);

      console.log(`\n ${deptName} added to the database. \n`.success);
    }

    if (task === "addRole") {
      //   addRole(answers);
      // console.log(`${answers.roleName} added to the database.`);
    }

    if (task === "addEmployee") {
      //  addEmployee(answers);
      console.log(
        `${answers.firstName} ${answers.lastName} added to the database.`
      );
    }

    // UPDATE options
    if (task === "updateEmployeeRole") {
      // updateEmployeeRole(answers);
      console.log(
        `Updated ${answers.employees}'s role to ${answers.employeeNewRole}.`
      );
    }

    // QUIT
    if (task === "quit") {
      inProgress = false;
      console.log("Application ended.");
      process.exit(0);
    }
  }
};

start();

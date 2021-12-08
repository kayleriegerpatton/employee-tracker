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
      const allEmployeesData = await dbQuery(allEmployeesQuery);
      console.table(allEmployeesData);
    }

    if (task === "viewRoles") {
      const roles = await dbQuery(allRolesQuery);
      console.table(roles);
    }

    if (task === "viewDepts") {
      const allDepartments = await dbQuery(allDepartmentsQuery);
      console.table(allDepartments);
    }

    // ADD options
    if (task === "addDept") {
      const { deptName } = await inquirer.prompt(deptQuestion);

      await dbQuery(`INSERT INTO department (name) VALUES ('${deptName}');`);

      console.log(`\n ${deptName} added to the database. \n`.success);
    }

    if (task === "addRole") {
      const allDepts = await dbQuery(allDepartmentsQuery);
      if (allDepts.length) {
        const { roleName, roleDept, salary } = await inquirer.prompt(
          roleQuestions
        );

        await dbQuery(
          `INSERT INTO role (title, salary, department_id) VALUE ('${roleName}', ${salary}, ${roleDept});`
        );

        console.log(`${roleName} added to the database.`.success);
      } else {
        console.log("Please create a department first.");
      }
    }

    if (task === "addEmployee") {
      const answers = await inquirer.prompt(employeeQuestions);
      console.log(
        `${answers.firstName} ${answers.lastName} added to the database.`
          .success
      );
    }

    // UPDATE options
    if (task === "updateEmployeeRole") {
      const answers = await inquirer.prompt(employeeRoleQuestions);
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

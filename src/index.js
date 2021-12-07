const cTable = require("console.table");
const inquirer = require("inquirer");
const questions = require("./questions");
const {
  displayEmployees,
  displayRoles,
  displayDepts,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./utils/queries");

const start = async () => {
  let inProgress = true;

  while (inProgress) {
    const answers = await inquirer.prompt(questions);

    // VIEW options
    if (answers.task === "viewEmployees") {
      displayEmployees();
      return;
    }

    if (answers.task === "viewRoles") {
      displayRoles();
      return;
    }

    if (answers.task === "viewDepts") {
      displayDepts();
      return;
    }

    // ADD options
    if (answers.task === "addRole") {
      //   addRole(answers);
      console.log(`${answers.roleName} added to the database.`);
    }

    if (answers.task === "addEmployee") {
      //  addEmployee(answers);
      console.log(
        `${answers.firstName} ${answers.lastName} added to the database.`
      );
    }

    // UPDATE options
    if (answers.task === "updateEmployeeRole") {
      // updateEmployeeRole(answers);
      console.log(
        `Updated ${answers.employees}'s role to ${answers.employeeNewRole}.`
      );
    }

    if (answers.task === "addDept") {
      addDepartment(answers);
      // console.log(`${answers.deptName} added to the database.`);
    }

    // QUIT
    if (answers.task === "quit") {
      inProgress = false;
      console.log("Goodbye.");
      process.exit(0);
    }
  }
};

start();

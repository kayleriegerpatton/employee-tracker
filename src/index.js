const cTable = require("console.table");
const inquirer = require("inquirer");
const questions = require("./questions");
// const { queries } = require("./utils/queries");

// console.log(cTable.getTable('array/table name here'));

const start = async () => {
  let inProgress = true;

  while (inProgress) {
    const answers = await inquirer.prompt(questions);

    // VIEW options
    if (answers.task === "viewEmployees") {
      // SELECT * FROM employee
    }
    if (answers.task === "viewRoles") {
      // SELECT * FROM role
    }
    if (answers.task === "viewDepts") {
      // SELECT * FROM department
    }

    // ADD options
    if (answers.task === "addRole") {
      // INSERT INTO role table
      console.log(`${answers.roleName} added to the database.`);
    }

    if (answers.task === "addEmployee") {
      // INSERT INTO employee table
      console.log(
        `${answers.firstName} ${answers.lastName} added to the database.`
      );
    }

    // UPDATE options
    if (answers.task === "updateEmployeeRole") {
      // INSERT INTO employee table
      console.log(
        `Updated ${answers.employees}'s role to ${answers.employeeNewRole}.`
      );
    }

    if (answers.task === "addDept") {
      // INSERT INTO department table
      console.log(`${answers.deptName} added to the database.`);
    }

    // QUIT
    if (answers.task === "quit") {
      inProgress = false;
      console.log("Goodbye.");
    }
    // console.log(answers);
  }

  process.exit(0);
};

start();

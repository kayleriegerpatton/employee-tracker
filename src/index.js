// const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const colors = require("colors");
colors.setTheme({
  success: ["bgGreen", "black"],
  warning: ["bgBrightYellow", "black"],
  fail: ["bgRed", "white", "bold"],
  message: ["bgBrightCyan", "black"],
});

const {
  startQuestion,
  deptQuestion,
  roleQuestions,
  employeeQuestions,
  employeeRoleQuestions,
} = require("./questions");
const {
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
      // check if departments exist in db
      const allDepts = await dbQuery(allDepartmentsQuery);

      if (allDepts.length) {
        // get new role answers
        const { roleName, roleDept, salary } = await inquirer.prompt(
          roleQuestions
        );
        // add new role to db
        await dbQuery(
          `INSERT INTO role (title, salary, department_id) VALUE ('${roleName}', ${salary}, ${roleDept});`
        );

        console.log(`\n ${roleName} added to the database. \n`.success);
      } else {
        console.log("\n Please create a department first. \n".warning);
      }
    }

    if (task === "addEmployee") {
      // check if roles exist in db for role selection question
      const allRoles = await dbQuery("SELECT * FROM role;");

      if (allRoles.length) {
        // get new employee answers
        const { firstName, lastName, employeeRole, employeeManager } =
          await inquirer.prompt(employeeQuestions);

        // add new employee to db
        await dbQuery(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${employeeRole}, ${employeeManager});`
        );

        console.log(
          `\n ${firstName} ${lastName} added to the database. \n`.success
        );
      } else {
        console.log("\n Please create a new role first. \n".warning);
      }
    }

    // UPDATE options
    if (task === "updateEmployeeRole") {
      const { employees, employeeNewRole } = await inquirer.prompt(
        employeeRoleQuestions
      );
      console.log(
        `\n Updated ${employees}'s role to ${employeeNewRole}. \n`.success
      );
    }

    // QUIT
    if (task === "quit") {
      inProgress = false;
      console.log("\n Application ended. \n".message);
      process.exit(0);
    }
  }
};

start();

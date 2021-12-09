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
      // check if any employees exist in db
      const allEmployees = await dbQuery(allEmployeesQuery);

      if (allEmployees) {
        console.table(allEmployees);
      } else {
        console.log(
          "\n There are curently no employees in the database. \n".warning
        );
      }
    }

    if (task === "viewRoles") {
      // check if any roles exist in db
      const allRoles = await dbQuery(allRolesQuery);

      if (allRoles.length) {
        console.table(allRoles);
      } else {
        console.log(
          "\n There are currently no roles in the database. \n".warning
        );
      }
    }

    if (task === "viewDepts") {
      // check if departments exist in db
      const allDepts = await dbQuery(allDepartmentsQuery);

      // get depts from db and log table
      if (allDepts.length) {
        console.table(allDepts);
      } else {
        console.log(
          "\n There are currently no departments in the database. \n".warning
        );
      }
    }

    // ADD options
    if (task === "addDept") {
      const { deptName } = await inquirer.prompt(deptQuestion);

      await dbQuery(`INSERT INTO department (name) VALUES ('${deptName}');`);

      console.log(
        `\n ${deptName} department added to the database. \n`.success
      );
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

        // check if employee manager is indicated
        if (employeeManager) {
          // add new employee with manager to db
          await dbQuery(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${employeeRole}, ${employeeManager});`
          );
        } else {
          // add new employee without manager to db
          await dbQuery(
            `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', ${employeeRole});`
          );
        }

        console.log(
          `\n ${firstName} ${lastName} added to the database. \n`.success
        );
      } else {
        console.log("\n Please create a new role first. \n".warning);
      }
    }

    // UPDATE options
    if (task === "updateEmployeeRole") {
      // check if employees exist in db
      const allEmployees = await dbQuery("SELECT * FROM employee;");

      if (allEmployees.length) {
        const { employee, employeeNewRole } = await inquirer.prompt(
          employeeRoleQuestions
        );

        // udpate employee role in db
        await dbQuery(
          `UPDATE employee SET role_id = ${employeeNewRole} WHERE id = ${employee};`
        );

        console.log(`\n Role updated. \n`.success);
      } else {
        console.log("\n No employees to update. \n".warning);
      }
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

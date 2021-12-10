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
const { Db } = require("../src/db/Db");
const {
  generateDeptChoices,
  generateRoleChoices,
  generateEmployeesChoices,
} = require("./utils/choices");
const { validateInput } = require("./utils/utils");

const start = async () => {
  // create new database instance
  const db = new Db({
    host: process.envDB_HOST || "localhost",
    user: process.envDB_USER || "root",
    password: process.envDB_PASSWORD || "Password123!!",
    database: process.envDB_NAME || "company_db",
  });

  // start database
  await db.start();

  let inProgress = true;

  while (inProgress) {
    const { task } = await inquirer.prompt(startQuestion);

    // VIEW options
    if (task === "viewEmployees") {
      // check if any employees exist in db
      const allEmployees = await db.query(allEmployeesQuery);

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
      const allRoles = await db.query(allRolesQuery);

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
      const allDepts = await db.query(allDepartmentsQuery);

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

      await db.query(`INSERT INTO department (name) VALUES ('${deptName}');`);

      console.log(
        `\n ${deptName} department added to the database. \n`.success
      );
    }

    if (task === "addRole") {
      // check if departments exist in db
      const allDepts = await db.query(allDepartmentsQuery);

      if (allDepts.length) {
        //   "Add role" questions
        const roleQuestions = [
          {
            type: "input",
            name: "roleName",
            message: "What is the name of the role?",
            validate: validateInput,
          },
          {
            type: "input",
            name: "salary",
            message: "What is the role's salary?",
            validate: (salary) => {
              return (
                /^(0|[1-9]\d*)(\.\d+)?$/.test(salary) ||
                "Please enter a number without commas."
              );
            },
          },
          {
            type: "list",
            name: "roleDept",
            message: "To which department does the role belong?",
            choices: generateDeptChoices(db),
          },
        ];

        // get new role answers
        const { roleName, roleDept, salary } = await inquirer.prompt(
          roleQuestions
        );
        // add new role to db
        await db.query(
          `INSERT INTO role (title, salary, department_id) VALUE ('${roleName}', ${salary}, ${roleDept});`
        );

        console.log(`\n ${roleName} added to the database. \n`.success);
      } else {
        console.log("\n Please create a department first. \n".warning);
      }
    }

    if (task === "addEmployee") {
      // check if roles exist in db for role selection question
      const allRoles = await db.query("SELECT * FROM role;");

      if (allRoles.length) {
        //   "Add employee" questions
        const employeeQuestions = [
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
            validate: validateInput,
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
            validate: validateInput,
          },
          {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role?",
            choices: generateRoleChoices(db),
          },
          {
            type: "confirm",
            name: "managerConfirm",
            message: "Does the employee have a manager?",
            default: false,
          },
          {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee's manager?",
            choices: generateEmployeesChoices(db),
            when: (answers) => answers.managerConfirm,
          },
        ];

        // get new employee answers
        const { firstName, lastName, employeeRole, employeeManager } =
          await inquirer.prompt(employeeQuestions);

        // check if employee manager is indicated
        if (employeeManager) {
          // add new employee with manager to db
          await db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${employeeRole}, ${employeeManager});`
          );
        } else {
          // add new employee without manager to db
          await db.query(
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
      const allEmployees = await db.query("SELECT * FROM employee;");

      if (allEmployees.length) {
        //   "Update employee role" questions
        const employeeRoleQuestions = [
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: generateEmployeesChoices(db),
          },
          {
            type: "list",
            name: "employeeNewRole",
            message: "What is the employee's new role?",
            choices: generateRoleChoices(db),
          },
        ];

        const { employee, employeeNewRole } = await inquirer.prompt(
          employeeRoleQuestions
        );

        // udpate employee role in db
        await db.query(
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
      await db.stop();
      process.exit(0);
    }
  }
};

start();

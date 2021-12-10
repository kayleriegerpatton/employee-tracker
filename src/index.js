const inquirer = require("inquirer");
const colors = require("colors");
const cTable = require("console.table");
// const art = require("ascii-art");

const Db = require("./lib/Db");

const {
  startQuestion,
  deptQuestion,
  getRoleQuestions,
  getEmployeeQuestions,
  getEmployeeRoleQuestions,
} = require("./questions");
const {
  allEmployeesQuery,
  allRolesQuery,
  allDepartmentsQuery,
} = require("./utils/queries");

colors.setTheme({
  greeting: ["rainbow"],
  success: ["bgGreen", "black"],
  warning: ["bgBrightYellow", "black"],
  fail: ["bgRed", "white", "bold"],
  message: ["bgBrightCyan", "black"],
});

const start = async () => {
  // const greetingMessage = await art
  //   .font("Employee Tracker", "doom")
  //   .completed();

  // console.log(greetingMessage);

  // create new database instance
  const db = new Db({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Password123!!",
    database: process.env.DB_NAME || "company_db",
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
        const roleQuestions = await getRoleQuestions(db);

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
        const employeeQuestions = await getEmployeeQuestions(db);

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
        const employeeRoleQuestions = await getEmployeeRoleQuestions(db);

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

const {
  generateDeptChoices,
  generateRoleChoices,
  generateEmployeesChoices,
} = require("./utils/choices");
const { validateInput } = require("./utils/utils");

const startQuestion = [
  {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
      { name: "View all employees", value: "viewEmployees" },
      { name: "View all roles", value: "viewRoles" },
      { name: "View all departments", value: "viewDepts" },
      { name: "Add an employee", value: "addEmployee" },
      { name: "Add a new role", value: "addRole" },
      { name: "Add a new department", value: "addDept" },
      { name: "Update an employee's role", value: "updateEmployeeRole" },
      { name: "Quit", value: "quit" },
    ],
  },
];

// "Add dept" questions
const deptQuestion = [
  {
    type: "input",
    name: "deptName",
    message: "What is the name of the department?",
    validate: validateInput,
  },
];

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
    choices: generateDeptChoices,
  },
];

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
    choices: generateRoleChoices,
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
    choices: generateEmployeesChoices,
    when: (answers) => answers.managerConfirm,
  },
];

//   "Update employee role" questions
const employeeRoleQuestions = [
  {
    type: "list",
    name: "employee",
    message: "Which employee's role do you want to update?",
    choices: generateEmployeesChoices,
  },
  {
    type: "list",
    name: "employeeNewRole",
    message: "What is the employee's new role?",
    choices: generateRoleChoices,
  },
];

module.exports = {
  startQuestion,
  deptQuestion,
  roleQuestions,
  employeeQuestions,
  employeeRoleQuestions,
};

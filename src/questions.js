const { generateDeptChoices } = require("./utils/choices");
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
    choices: [
      // fn to dynamically get choices list from db
      // MOCK CHOICES
      { name: "role1", value: "role1" },
      { name: "role2", value: "role2" },
      { name: "role3", value: "role3" },
    ],
  },
  {
    type: "list",
    name: "employeeManager",
    message: "Who is the employee's manager?",
    choices: [
      // fn to dynamically get choices list from db
      // MOCK CHOICES
      { name: "None", value: "none" },
      { name: "employee2", value: "employee2" },
      { name: "employee3", value: "employee3" },
    ],
  },
];

//   "Update employee role" questions
const employeeRoleQuestions = [
  {
    type: "list",
    name: "employees",
    message: "Which employee's role do you want to update?",
    choices: [
      // fn to dynamically get choices list from db
      // MOCK CHOICES
      { name: "employee1", value: "employee1" },
      { name: "employee2", value: "employee2" },
      { name: "employee3", value: "employee3" },
    ],
  },
  {
    type: "list",
    name: "employeeNewRole",
    message: "What is the employee's new role?",
    choices: [
      // fn to dynamically get choices list from db
      // MOCK CHOICES
      { name: "role1", value: "role1" },
      { name: "role2", value: "role2" },
      { name: "role3", value: "role3" },
    ],
  },
];

module.exports = {
  startQuestion,
  deptQuestion,
  roleQuestions,
  employeeQuestions,
  employeeRoleQuestions,
};

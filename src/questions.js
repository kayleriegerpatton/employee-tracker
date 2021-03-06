// internal imports
const {
  generateDeptChoices,
  generateRoleChoices,
  generateEmployeesChoices,
  generateManagersChoices,
} = require("./utils/choices");
const { validateInput } = require("./utils/utils");

const startQuestion = [
  {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
      { name: "View all employees", value: "viewEmployees" },
      { name: "View employees by manager", value: "viewEmployeesByManager" },
      { name: "View all roles", value: "viewRoles" },
      { name: "View all departments", value: "viewDepts" },
      {
        name: "View employees by department",
        value: "viewEmployeesByDept",
      },
      { name: "Add an employee", value: "addEmployee" },
      { name: "Delete an employee", value: "deleteEmployee" },
      { name: "Add a new role", value: "addRole" },
      { name: "Add a new department", value: "addDept" },
      { name: "Update an employee's role", value: "updateEmployeeRole" },
      { name: "Quit", value: "quit" },
    ],
  },
];

// "Add new dept" questions
const deptQuestion = [
  {
    type: "input",
    name: "deptName",
    message: "What is the name of the department?",
    validate: validateInput,
  },
];

// "Add new role" questions
const getRoleQuestions = async (db) => {
  return [
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
      choices: await generateDeptChoices(db),
    },
  ];
};

// "Add new employee" questions
const getEmployeeQuestions = async (db) => {
  return [
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
      choices: await generateRoleChoices(db),
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
      choices: await generateEmployeesChoices(db),
      when: (answers) => answers.managerConfirm,
    },
  ];
};

// "Update employee role" questions
const getEmployeeRoleQuestions = async (db) => {
  return [
    {
      type: "list",
      name: "employee",
      message: "Which employee's role do you want to update?",
      choices: await generateEmployeesChoices(db),
    },
    {
      type: "list",
      name: "employeeNewRole",
      message: "What is the employee's new role?",
      choices: await generateRoleChoices(db),
    },
  ];
};

// 'view employees by manager' questions
const getEmployeesByManagerQuestion = async (db) => {
  return [
    {
      type: "list",
      name: "manager",
      message: "Choose a manager:",
      choices: await generateManagersChoices(db),
    },
  ];
};

// 'view employees by dept' questions
const getEmployeesByDeptQuestion = async (db) => {
  return [
    {
      type: "list",
      name: "employeeDeptName",
      message: "Choose a department:",
      choices: await generateDeptChoices(db),
    },
  ];
};

// 'delete an employee' question
const getEmployeesChoicesQuestion = async (db) => {
  return [
    {
      type: "list",
      name: "deletedEmployee",
      message: "Choose an employee to delete:",
      choices: await generateEmployeesChoices(db),
    },
  ];
};

module.exports = {
  startQuestion,
  deptQuestion,
  getRoleQuestions,
  getEmployeeQuestions,
  getEmployeeRoleQuestions,
  getEmployeesByManagerQuestion,
  getEmployeesByDeptQuestion,
  getEmployeesChoicesQuestion,
};

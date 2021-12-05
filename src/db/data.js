const departments = ["education", "exhibitions", "curatorial"];

const roles = [
  {
    title: "director of education",
    salary: 60000,
    departmentId: 1,
  },
  {
    title: "education manager",
    salary: 45000,
    departmentId: 1,
  },
  {
    title: "curator",
    salary: 75000,
    departmentId: 3,
  },
  {
    title: "curatorial assistant",
    salary: 55000,
    departmentId: 3,
  },
  {
    title: "exhibition designer",
    salary: 70000,
    departmentId: 2,
  },
  {
    title: "exhibition manager",
    salary: 55000,
    departmentId: 2,
  },
];

const employees = [
  {
    firstName: "Scott",
    lastName: "Winterrowd",
    roleId: 1,
  },
  {
    firstName: "Mary",
    lastName: "Jordan",
    roleId: 2,
    managerId: 1,
  },
  {
    firstName: "Amanda",
    lastName: "Dotseth",
    roleId: 3,
  },
  {
    firstName: "Shelley",
    lastName: "DeMaria",
    roleId: 1,
    managerId: 3,
  },
  {
    firstName: "Julie",
    lastName: "Herrick",
    roleId: 5,
  },
  {
    firstName: "Wendy",
    lastName: "Sepponen",
    roleId: 6,
    managerId: 5,
  },
];

module.exports = { departments, employees, roles };

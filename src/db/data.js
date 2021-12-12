// department seed data
const departments = ["Education", "Exhibitions", "Curatorial"];

// roles seed data
const roles = [
  {
    title: "Director of Education",
    salary: 60000,
    departmentId: 1,
  },
  {
    title: "Education Manager",
    salary: 45000,
    departmentId: 1,
  },
  {
    title: "Curator",
    salary: 75000,
    departmentId: 3,
  },
  {
    title: "Curatorial Assistant",
    salary: 55000,
    departmentId: 3,
  },
  {
    title: "Exhibition Designer",
    salary: 70000,
    departmentId: 2,
  },
  {
    title: "Exhibition Manager",
    salary: 55000,
    departmentId: 2,
  },
];

// employees seed data
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

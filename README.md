# Employee Management System ![MIT](https://img.shields.io/static/v1?label=MIT&message=License&color=blueviolet)

## Table of Contents

- [About the Application](#about-the-application)
  - [Features](#features)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Questions & Contributing](#questions-and-contributing)
- [License](#license)
- [Demo Video](#demo-video)

## About the Application

Command line application which prompts user questions about a company's employees, roles, and departments using the inquirer package. Responses are then used to build and interact with data in a MySQL database.

Users are prompted to select an initial action, presented with further questions depending on their selection, and either presented with a data table to view or a message confirming the change they've made to the database. The initial question is re-prompted and users loop through this process until choosing to quit.

Users can currently view the data tables in the console, as well as add, update, and delete records.

### Features

- Question validation to reject empty fields or incorrect entry types
- Action validation to control database interactions, such as when a user attempts to delete an employee when none exist in the database
- Colorized console messages to quickly indicate to a user the status of their requests

### Built With

- Node.js
- MySQL
- inquirer, mysql2, console.table, and colors packages

## Getting Started

### Installation

Run the following script to install the application:

```
git clone https://github.com/kayleriegerpatton/employee-tracker.git
cd readme-generator
npm install
```

### Usage

Run the following script to use the application:

```
npm run start
```

## Questions and Contributing

To contribute to or ask a question about this project, please [email](mailto:kayle.patton22@gmail.com) me.

## License

MIT License

## Demo Video

Click to view a [demo video](https://drive.google.com/file/d/1THvSjwFQofLuyvx8UxQTTphZCWSIKkEC/view?usp=sharing).

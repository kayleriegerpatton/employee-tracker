const mysql = require("mysql2");
const colors = require("colors");
colors.setTheme({
  success: ["bgGreen", "black"],
  warning: ["bgBrightYellow", "black"],
  fail: ["bgRed", "white", "bold"],
  message: ["bgBrightCyan", "black"],
});

class Db {
  constructor(dbOptions) {
    this.dbOptions = dbOptions;
    this.connection = mysql.createConnection(dbOptions);
  }

  start() {
    return new Promise((resolve, reject) => {
      const onConnect = (err) => {
        if (err) {
          console.error(`\n [ERROR]: ${err.message}. \n`.fail);
          return reject(err.message);
        }

        console.log(
          `\n Connected to the ${this.dbOptions.database} database. \n`.success
        );

        resolve();
      };

      this.connection.connect(onConnect);
    });
  }

  stop() {
    this.connection.end();
    console.log(
      `\n Disconnected from the ${this.dbOptions.database} database. \n`.success
    );
  }

  query(sqlQuery) {
    return new Promise((resolve, reject) => {
      this.connection.query(sqlQuery, (err, result) => {
        if (err) {
          console.error(`\n [ERROR]: ${err.message}. \n`.fail);
          return reject(err.message);
        }

        resolve(result);
      });
    });
  }
}

module.exports = Db;

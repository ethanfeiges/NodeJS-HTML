const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

// Make DB connection

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

// Make database connection
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    // check if DB instance is null and creates instance if it is
    return instance ? instance : new DbService();
  }

  // Retrieve all data in the\ crud_web table within the webapp database
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM crud_web;";
        // making query to DB
        connection.query(query, (err, results) => {
          // if cannot make query
          if (err) {
            // goes straight to catch block
            reject(new Error(err.message));
          }
          resolve(results);
        });
      });
      //console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async insertNewName(name) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        // To prevent SQL injection
        const query = "INSERT INTO crud_web (name, date_added) VALUES (?, ?);";
        // making query to DB
        connection.query(query, [name, dateAdded], (err, result) => {
          // if cannot make query
          if (err) {
            // goes straight to catch block
            reject(new Error(err.message));
          }
          resolve(result.insertId);
        });
      });
      // return name, dateAdded, and ID to server
      return {
        name: name,
        dateAdded: dateAdded,
        id: insertId,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async deleteRowById(id) {
    // parseInt with a specified mathematical base
    id = parseInt(id, 10);
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM crud_web WHERE id = ?";
        connection.query(query, [id], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          // Ideally is the value 1
          resolve(result.affectedRows);
        });
      });
      // Indicates whether a successful deletion occured (response should equal 1)
      return response === 1 ? true : false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async updateNameById(id, name) {
    id = parseInt(id, 10);
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE crud_web SET name = ? WHERE id = ?";
        connection.query(query, [name, id], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          // Ideally is the value 1
          resolve(result.affectedRows);
        });
      });
      // Indicates whether a successful deletion occured (response should equal 1)
      return response === 1 ? true : false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM crud_web WHERE name = ?;";
        // making query to DB
        connection.query(query, [name], (err, results) => {
          // if cannot make query
          if (err) {
            // goes straight to catch block
            reject(new Error(err.message));
          }
          resolve(results);
        });
      });
      //console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
// export DbService class to be used in app.js
module.exports = DbService;

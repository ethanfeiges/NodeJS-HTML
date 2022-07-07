const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();

const dbService = require("./dbService");
// MIDDLEWARE
// To prevent blocking API call
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create
app.post("/insert", (req, res) => {
  const db = dbService.getDbServiceInstance();
  const { name } = req.body;
  // Do not submit empty entity into DB
  if (name === "") {
    return;
  }
  const result = db.insertNewName(name);
  result
    // Data from dbService: id, name, dateAdded
    // WORKS
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

// Read
app.get("/getAll", (req, res) => {
  const db = dbService.getDbServiceInstance();
  // returns a promise
  const result = db.getAllData();
  // Parses DB response into JSON
  result
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      console.log(error);
    });
});
// delete
app.delete("/delete/:id", (req, res) => {
  // Get id value from request parameters
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();
  result = db.deleteRowById(id);
  result
    // data from DB is either "true" or "false"
    .then((data) => {
      // Indicate a successful deletion

      res.json({ success: data });
    })
    .catch((error) => {
      console.log(error);
    });
});

// update
app.patch("/update", (req, res) => {
  const { id, name } = req.body;
  const db = dbService.getDbServiceInstance();
  result = db.updateNameById(id, name);
  result
    .then((data) => {
      res.json({ success: data });
    })
    .catch((error) => {
      console.log(error);
    });
});
app.listen(process.env.PORT, () =>
  console.log("Running on port " + process.env.PORT)
);
// Search by name
app.get("/search/:name", (req, res) => {
  const { name } = req.params;
  const db = dbService.getDbServiceInstance();
  const result = db.searchByName(name);
  result
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      console.log(error);
    });
});

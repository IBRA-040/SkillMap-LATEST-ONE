const mysql = require("mysql2");
const fs = require('fs');
const path = require('path');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "skillsmap",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");

  // Read and execute setup script
  const setupScript = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf8');
  db.query(setupScript, (err) => {
    if (err) {
      console.error("Error setting up database tables:", err);
      return;
    }
    console.log("Database tables checked/created successfully");
  });
});

db.on("error", (err) => {
  console.error("Database error:", err);
});

module.exports = db;

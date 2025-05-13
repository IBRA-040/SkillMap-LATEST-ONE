const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Check if CareerPaths table exists and create if it doesn't
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS CareerPaths (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    offeredBy VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    videos JSON NOT NULL
  )
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating CareerPaths table:", err);
    return;
  }
  console.log("CareerPaths table checked/created successfully");

  // Check if table is empty
  db.query("SELECT COUNT(*) as count FROM CareerPaths", (err, result) => {
    if (err) {
      console.error("Error checking CareerPaths table:", err);
      return;
    }

    // If table is empty, insert sample data
    if (result[0].count === 0) {
      const insertQuery = "INSERT INTO CareerPaths (title, offeredBy, description, status, category, image, videos) VALUES ?";
      const values = sampleCareerPaths.map(path => [
        path.title,
        path.offeredBy,
        path.description,
        path.status,
        path.category,
        path.image,
        JSON.stringify(path.videos)
      ]);

      db.query(insertQuery, [values], (err) => {
        if (err) {
          console.error("Error inserting sample career paths:", err);
          return;
        }
        console.log("Sample career paths inserted successfully");
      });
    }
  });
});

// GET all career paths
router.get("/career-paths", (req, res) => {
  const query = "SELECT * FROM CareerPaths";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching career paths:", err);
      return res.status(500).json({ message: "Error fetching career paths" });
    }

    // Parse the videos JSON string to array for each career path
    const careerPaths = results.map(path => ({
      ...path,
      videos: JSON.parse(path.videos)
    }));

    res.json(careerPaths);
  });
});

module.exports = router; 
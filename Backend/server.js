require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "skillsmap",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

db.on("error", (err) => {
  console.error("Database error:", err);
});

// Routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});

//Register
app.post("/register", (req, res) => {
  const { firstName, lastName, email, password, birthdate } = req.body;

  if (!firstName || !lastName || !email || !password || !birthdate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const insertUserSql =
      "INSERT INTO users (firstName, lastName, email, password, birthdate) VALUES (?, ?, ?, ?, ?)";
    db.query(insertUserSql, [firstName, lastName, email, password, birthdate], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Server error: " + err });
      }
      res.status(201).json({ message: "User registered successfully", userId: result.insertId });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const loginSql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(loginSql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: result[0] });
  });
});

//Get user by ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Update user by ID
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, birthdate } = req.body;

  if (!firstName || !lastName || !email || !birthdate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "UPDATE users SET firstName = ?, lastName = ?, email = ?, birthdate = ? WHERE id = ?";
  db.query(sql, [firstName, lastName, email, birthdate, userId], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  });
});

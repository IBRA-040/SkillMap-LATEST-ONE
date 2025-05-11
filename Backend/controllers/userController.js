const db = require("../config/db");
const bcrypt = require("bcryptjs");
const validatePassword = require("../utils/validatePassword");

// Register
exports.registerUser = (req, res) => {
  const { firstName, lastName, email, password, birthdate } = req.body;

  if (!firstName || !lastName || !email || !password || !birthdate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailSql, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error hashing password" });
      }
      // Verify the hashed password is complete
      if (hashedPassword.length < 60) {
        console.error("Hashed password is incomplete");
        return res.status(500).json({ message: "Error in password hashing" });
      }

      const insertUserSql = `
        INSERT INTO users (firstName, lastName, email, password, birthdate) 
        VALUES (?, ?, ?, ?, ?)`;

      db.query(
        insertUserSql,
        [firstName, lastName, email, hashedPassword, birthdate],
        (err, result) => {
          if (err) {
            console.error("Database error during registration:", err);
            return res.status(500).json({ message: "Server error: " + err });
          }

          // Verify the stored password
          const verifySql = "SELECT password FROM users WHERE id = ?";
          db.query(verifySql, [result.insertId], (err, verifyResult) => {
            if (err || !verifyResult[0]) {
              console.error("Error verifying stored password:", err);
              return res.status(500).json({ message: "Error verifying registration" });
            }

            const storedPassword = verifyResult[0].password;

            if (storedPassword.length !== hashedPassword.length) {
              console.error("Password was truncated during storage");
              return res.status(500).json({ message: "Error in password storage" });
            }

            console.log("User registered successfully with ID:", result.insertId);
            res
              .status(201)
              .json({ message: "User registered successfully", userId: result.insertId });
          });
        }
      );
    });
  });
};

// Login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "All fields are required" });

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (result.length === 0) {
      console.log("No user found with email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    // Verify the stored password is complete
    if (user.password.length < 60) {
      console.error("Stored password is incomplete");
      return res.status(500).json({ message: "Error in stored password" });
    }

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      // Remove password from user object before sending response
      const { password, ...userWithoutPassword } = user;
      res.status(200).json({ message: "Login successful", user: userWithoutPassword });
    });
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });

    res.status(200).json(result[0]);
  });
};

// Update user by ID
exports.updateUserById = (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, birthdate } = req.body;
  if (!firstName || !lastName || !email || !birthdate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    UPDATE users 
    SET firstName = ?, lastName = ?, email = ?, birthdate = ? 
    WHERE id = ?`;
  db.query(sql, [firstName, lastName, email, birthdate, userId], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully" });
  });
};

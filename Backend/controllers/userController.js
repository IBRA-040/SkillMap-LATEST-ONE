const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const validatePassword = require("../utils/validatePassword");

// Register
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthdate } = req.body;
    console.log('Registration attempt:', { firstName, lastName, email, birthdate });
    
    if (!firstName || !lastName || !email || !password || !birthdate) {
      console.log('Missing fields:', { firstName, lastName, email, birthdate });
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Database error during email check:', err);
        return res.status(500).json({ message: 'Error checking email' });
      }

      if (results.length > 0) {
        console.log('Email already exists:', email);
        return res.status(400).json({ message: "Email already exists" });
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        console.log('Password validation failed:', passwordError);
        return res.status(400).json({ message: passwordError });
      }

      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');
        
        // Insert user into database
        const insertUserSql = `
          INSERT INTO users (firstName, lastName, email, password, birthdate) 
          VALUES (?, ?, ?, ?, ?)`;
        
        db.query(
          insertUserSql,
          [firstName, lastName, email, hashedPassword, birthdate],
          (err, result) => {
            if (err) {
              console.error('Database error during user insertion:', err);
              return res.status(500).json({ message: 'Error registering user' });
            }

            console.log('User inserted successfully:', result.insertId);

            const newUser = {
              id: result.insertId,
              firstName,
              lastName,
              email,
              birthdate
            };
            
            // Generate JWT token
            const token = jwt.sign(
              { 
                id: newUser.id, 
                username: `${newUser.firstName} ${newUser.lastName}` 
              },
              process.env.JWT_SECRET || 'your_secure_jwt_secret_key_here',
              { expiresIn: '24h' }
            );
            
            console.log('Registration successful for:', email);
            res.status(201).json({
              user: newUser,
              token
            });
          }
        );
      } catch (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ message: 'Error processing registration' });
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Error logging in' });
      }

      const user = results[0];
      
      if (!user) {
        console.log("No user found with email:", email);
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          username: `${user.firstName} ${user.lastName}` 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          birthdate: user.birthdate
        },
        token
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    db.query(
      'SELECT id, firstName, lastName, email, birthdate FROM users WHERE id = ?',
      [id],
      (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Error fetching user' });
        }
        
        if (results.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        const user = results[0];
        res.json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          birthdate: user.birthdate
        });
      }
    );
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, birthdate } = req.body;
    
    if (!firstName || !lastName || !email || !birthdate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    db.query(
      'UPDATE users SET firstName = ?, lastName = ?, email = ?, birthdate = ? WHERE id = ?',
      [firstName, lastName, email, birthdate, id],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Error updating user' });
        }
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
          id,
          firstName,
          lastName,
          email,
          birthdate
        });
      }
    );
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById
};

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

// Public routes
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// Protected routes
router.get("/users/:id", auth, getUserById);
router.put("/users/:id", auth, updateUserById);

module.exports = router;

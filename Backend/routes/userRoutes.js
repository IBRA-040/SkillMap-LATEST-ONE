const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
} = require("../controllers/userController");

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserById);

module.exports = router;

const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Test route (use in browser)
router.get("/ping", (req, res) => {
  res.send("Auth routes working ✅");
});

// 🔐 Register
router.post("/register", register);

// 🔐 Login
router.post("/login", login);

// 🔒 Protected route (test JWT)
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user
  });
});

module.exports = router;

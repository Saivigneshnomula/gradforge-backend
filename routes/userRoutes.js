const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  uploadCollegeId,
  getProfile,
  getStatus
} = require("../controllers/userController");

// 🔹 Upload College ID
router.post(
  "/upload-id",
  authMiddleware,
  upload.single("collegeId"),
  uploadCollegeId
);

// 🔹 Student Dashboard APIs
router.get("/profile", authMiddleware, getProfile);
router.get("/status", authMiddleware, getStatus);

module.exports = router;

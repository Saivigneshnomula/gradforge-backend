const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const verified = require("../middleware/verifiedMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  addProject,
  listProjects,
  getProjectWithAccess
} = require("../controllers/projectController");

// 🔒 Admin only
router.post("/", auth, admin, addProject);

// 🔐 Verified students
router.get("/", auth, verified, listProjects);
router.get("/:id", auth, verified, getProjectWithAccess);

module.exports = router;

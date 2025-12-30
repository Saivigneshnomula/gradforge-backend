const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getPendingStudents,
  approveStudent,
  rejectStudent
} = require("../controllers/adminController");

// 🔒 Admin-only routes
router.get(
  "/pending-students",
  authMiddleware,
  adminMiddleware,
  getPendingStudents
);

router.put(
  "/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveStudent
);

router.put(
  "/reject/:id",
  authMiddleware,
  adminMiddleware,
  rejectStudent
);

module.exports = router;

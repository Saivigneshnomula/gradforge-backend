const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const verified = require("../middleware/verifiedMiddleware");

const { mockPurchase } = require("../controllers/purchaseController");

// 🔹 Buy project (mock payment)
router.post("/buy/:projectId", auth, verified, mockPurchase);

module.exports = router;

const Purchase = require("../models/Purchase");

// 🔹 MOCK PURCHASE (temporary – before real payments)
exports.mockPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.create({
      userId: req.user.id,
      projectId: req.params.projectId,
      amount: req.body.amount,
      status: "paid"
    });

    res.json({
      message: "Purchase successful (mock)",
      purchase
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

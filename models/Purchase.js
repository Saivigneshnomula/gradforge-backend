const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "paid"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);

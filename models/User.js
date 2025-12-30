const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    collegeName: {
      type: String
    },

    // 🔹 College ID verification
    collegeIdUrl: {
      type: String
    },

    verificationStatus: {
      type: String,
      enum: ["not_uploaded", "pending", "approved", "rejected"],
      default: "not_uploaded"
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);

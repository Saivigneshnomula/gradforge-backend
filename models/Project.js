const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    domain: { type: String, required: true }, // Web, AI, ML, IoT, etc.
    techStack: [String], // MERN, Python, Java, etc.
    description: String,

    repoUrl: String, // GitHub / ZIP (free)
    demoUrl: String,

    isPaid: { type: Boolean, default: false },
    price: { type: Number, default: 0 }, // e.g., 2000

    features: [String],
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner"
    },

    createdBy: { type: String, default: "GradForge" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);

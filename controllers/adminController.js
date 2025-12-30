const User = require("../models/User");

// 🔹 Get all pending students
exports.getPendingStudents = async (req, res) => {
  try {
    const students = await User.find({ verificationStatus: "pending" })
      .select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Approve student
exports.approveStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: "approved" },
      { new: true }
    ).select("-password");

    res.json({
      message: "Student approved ✅",
      student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Reject student
exports.rejectStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: "rejected" },
      { new: true }
    ).select("-password");

    res.json({
      message: "Student rejected ❌",
      student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

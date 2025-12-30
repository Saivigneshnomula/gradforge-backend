const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// 🔹 Upload College ID (already used)
exports.uploadCollegeId = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "gradforge/college_ids"
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        collegeIdUrl: result.secure_url,
        verificationStatus: "pending"
      },
      { new: true }
    );

    res.json({
      message: "College ID uploaded successfully",
      collegeIdUrl: user.collegeIdUrl,
      verificationStatus: user.verificationStatus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get full profile (Dashboard main API)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get lightweight status (for UI logic)
exports.getStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "verificationStatus role collegeIdUrl"
    );

    res.json({
      verificationStatus: user.verificationStatus,
      role: user.role,
      collegeIdUrl: user.collegeIdUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

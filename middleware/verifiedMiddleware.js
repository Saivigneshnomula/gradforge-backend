module.exports = function (req, res, next) {
  if (req.user.verificationStatus !== "approved") {
    return res.status(403).json({
      message: "Access denied. Verification required."
    });
  }
  next();
};

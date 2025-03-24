const { Admin } = require("../db");

// Middleware for admin authentication
async function adminMiddleware(req, res, next) {
  const { username, password } = req.headers;

  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(403).json({ msg: "Admin does not exist" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = adminMiddleware;

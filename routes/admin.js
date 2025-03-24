const express = require("express");
const { Admin, Course } = require("../db"); // Import Admin model
const adminMiddleware = require("../middlewares/admin"); // Import middleware

const router = express.Router();

// Admin signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    await Admin.create({ username, password });
    res.json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating admin" });
  }
});

// Admin course creation route (protected by middleware)
router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const { title, description, imageLink, price } = req.body;
    await Course.create({ title, description, imageLink, price });

    res.json({ message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating course" });
  }
});

module.exports = router;

const express = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course } = require("../db/index");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    await Admin.create({ username, password });

    res.json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating admin" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const { title, description, imageLink, price } = req.body;
    await Course.create({ title, description, imageLink, price });

    res.json({ message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating course" });
  }
});

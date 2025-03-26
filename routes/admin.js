const express = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Admin } = require("../db");
const router = express.Router();

router.post("/signup", async (req, res) => {
  // implement admin sign up logic
  const username = req.body.username;
  const password = req.body.password;

  // check if a username already  exists
  await Admin.create({
    username: username,
    password: password,
  });
  res.json({
    message: "Admin created successfully",
  });
});
router.post('/courses', adminMiddleware, (req, res) => {
  
})
router.get('/courses', adminMiddleware, (req, res) => {
  
})
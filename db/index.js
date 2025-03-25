const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware for JSON parsing

// Import routes
const adminRoutes = require("../routes/admin");
app.use("/admin", adminRoutes);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://mayank:cKvr4vrPxl8jOV2I@cluster0.b4frp.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

// Define models
const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = { Admin, User, Course };

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

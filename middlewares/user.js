const { User } = require("../db");

// Middleware for handling admin authentication
function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  // Check if the admin exists in the database
  User.findOne({
    username: username,
    password: password,
  }).then(function (value) {
    if (value) {
      next();
    } else {
      res.status(403).json({
        msg: "user does not exists",
      });
    }
  });
}

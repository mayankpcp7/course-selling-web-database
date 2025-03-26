const { User } = require("../db/index");
// Middleware for admin authentication
function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  User.findOne({
    username: username,
    password: password,
  }).then(function (value) {
    if (value) {
      next();
    } else {
      res.status(403).json({
        message: "user does not exist",
      });
    }
  });
}

module.exports = userMiddleware;

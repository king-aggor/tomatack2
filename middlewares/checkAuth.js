const jwt = require("jsonwebtoken")
require("dotenv")


exports.verifyToken = (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Auth failed",
        err,
  });
  }
  };

  exports.verifyFarmer = (
    req,
    res,
    next
  ) => {
    try {
      const decoded = jwt.verify(req.headers.token, process.env.JWT_KEY);
      const role = decoded.role.toLowerCase();
      if (role == "farmer") {
        next();
      } else {
        res.status(401).json({
          message: "user not a farmer",
        });
      }
    } catch (err) {
      return res.status(401).json({
        message: "Not authorized to perform this action",
        err,
   });
   }
  };
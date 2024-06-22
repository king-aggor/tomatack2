//modules

// signup
exports.signup = (req, res) => {
  res.status(200).json({
    message: "Sign up",
  });
};

//login
exports.login = (req, res) => {
  res.status(200).json({
    message: "login",
  });
};

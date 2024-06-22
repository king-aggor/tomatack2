//modules
const express = require("express"); //importing express
const authenticationController = require("../controllers/authentication"); //importing authenticationController

// create router
const router = express.Router();

//post login
router.post("/login", authenticationController.login);

//post signup
router.post("/signup", authenticationController.signup);

//export router
module.exports = router;

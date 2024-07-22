//modules
const express = require("express"); //importing express
const bodyParser = require("body-parser");
require("dotenv").config(); //importing dotenv
const authenticationRouter = require("./routes/authentication"); //importing authenticationRouter
const farmerRouter = require("./routes/farmer"); //importing farmerRouter
const retailerRouter = require("./routes/retailer"); //importing retailerRouter
const wholesalerRouter = require("./routes/wholesaler"); //importing wholesalerRouter

// create express app
const app = express();
const path = require('path');

//middleware to use body parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// middeware to hadele cors error

//middlewares to use routes
app.use("/authentication", authenticationRouter);
app.use("/farmer", farmerRouter);
app.use("/retailer", retailerRouter);
app.use("/wholesaler", wholesalerRouter);


// listen for requests
app.listen(process.env.port, () =>
  console.log(`listening on port ${process.env.port}`)
);

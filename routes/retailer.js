// modules
const express = require("express"); //importing express
const retailerController = require("../controllers/retailer"); //importing retailer controllers

// create express router
const router = express.Router();

// get retailer
router.get("/:id", retailerController.getRetailer);

// get wholesaler available produce
router.get("/wholesaler-available-produces/all/:id", retailerController.getWholesalerAvailableProduces);

// post purchase request
router.post("/purchase-request/:id", retailerController.purchaseRequest);

//get purchase requests
router.get("/orders/:id", retailerController.getOrders);

// get purchased produces
router.get("/purchased-produces", retailerController.getPurchasedProduces);

// get all retailer's produces
router.get("/all-produces/:id", retailerController.getAllProduces);

// get retailer available produces
router.get("/available-produces", retailerController.getRetailerAvailableProduces);

// get generate QR-code
router.get("/generate-qrcode/:id", retailerController.generateQRCode);

// export router
module.exports = router;

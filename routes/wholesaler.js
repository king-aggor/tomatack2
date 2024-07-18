//modules
const express = require("express"); //importing express
const wholesalerController = require("../controllers/wholesaler"); //importing wholesalerController

// create express router
const router = express.Router();

// get wholesaler
router.get("/:id", wholesalerController.getWholesaler);

// get farmer available produces
router.get("/farmer-available-produces/all", wholesalerController.farmerAvailableProduces);

// post purchase request
router.post("/purchase-request/:id", wholesalerController.PurchaseRequest);

// post cancel request
router.post("/cancel-request/:id", wholesalerController.cancelRequest)

// post decline purchase requests
router.post("/decline-request", wholesalerController.declineRequest);

// get wholesaler purchase requests
router.get("/purchase-requests/:id", wholesalerController.getPurchaseRequests);

// get purchased produces
router.get("/purchased-produces", wholesalerController.getPurchasedProduces);

// get sold produces
router.get("/sold-produces", wholesalerController.getSoldProduces);

// get all produces
router.get("/all-produces/:id", wholesalerController.getAllProduces);

// get wholesaler available produces
router.get("/available-produces", wholesalerController.getAvailableProduces);

//post accepst requests
router.post("/accept-request/:id", wholesalerController.acceptRequest);

//get retailers purchase requests to wholesaler
router.get("/retailers-requests/:id", wholesalerController.getRetailersRequests)

// exporting router
module.exports = router;

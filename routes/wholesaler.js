//modules
const express = require("express"); //importing express
const wholesalerController = require("../controllers/wholesaler"); //importing wholesalerController

// create express router
const router = express.Router();

// get wholesaler
router.get("/", wholesalerController.getWholesaler);

// get farmer available produces
router.get(
  "/farmer-availble-produces",
  wholesalerController.farmerAvailableProduces
);

// post purchase request
router.post("/purchase-request", wholesalerController.PurchaseRequest);

// post decline purchase requests
router.post("/decline-request", wholesalerController.declineRequest);

// get wholesaler purchase requests
router.get("/purchase-requests", wholesalerController.getPurchaseRequests);

// get purchased produces
router.get("/purchased-produces", wholesalerController.getPurchasedProduces);

// get sold produces
router.get("/sold-produces", wholesalerController.getSoldProduces);

// get all produces
router.get("/all-produces", wholesalerController.getAllProduces);

// get wholesaler available produces
router.get("/available-produces", wholesalerController.getAvailableProduces);

// exporting router
module.exports = router;

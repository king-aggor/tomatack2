//modules
const express = require("express"); //importing express
const farmerController = require("../controllers/farmer"); //importing farmerController

//create router
const router = express.Router();

//get farmer
router.get("/:id", farmerController.getFarmer);

//post add produce
router.post("/add-produce", farmerController.addProduce);

//get produce
router.get("/produce", farmerController.getProduce);

//delete produce
router.delete("/delete-produce", farmerController.deleteProduce);

//get all farmer produces
router.get("/all-produces", farmerController.getFarmerProduces);

//get available produces
router.get("/available-produces", farmerController.getAvailableProduces);

//get sold produces
router.get("/sold-produces", farmerController.getSoldProduces);

//get purchase requests
router.get("/purchase-requests", farmerController.getPurchaseRequests);

//post confrim purchase request
router.post("/confirm-purchase", farmerController.confirmPurchaseRequest);

//post decline purchase request
router.post("/decline-purchase", farmerController.declinePurchaseRequest);

//export router
module.exports = router;

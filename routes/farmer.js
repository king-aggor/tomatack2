//modules
const express = require("express"); //importing express
const farmerController = require("../controllers/farmer"); //importing farmerController

//create router
const router = express.Router();

//get farmer
router.get("/:id", farmerController.getFarmer);

//post add produce
router.post("/add-produce/:id", farmerController.addProduce);

//get produce
router.get("/produce/:id", farmerController.getProduce);

//delete produce
router.delete("/delete-produce/:id", farmerController.deleteProduce);

//get all farmer produces
router.get("/all-produces/:id", farmerController.getFarmerProduces);

//get available produces
router.get("/available-produces/:id", farmerController.getAvailableProduces);

//get sold produces
router.get("/sold-produces/:id", farmerController.getSoldProduces);

//get purchase requests
router.get("/purchase-requests/:id", farmerController.getPurchaseRequests);

//post confrim purchase request
router.post("/confirm-purchase/:id", farmerController.confirmPurchaseRequest);

//post decline purchase request
router.post("/decline-purchase/:id", farmerController.declinePurchaseRequest);

//export router
module.exports = router;

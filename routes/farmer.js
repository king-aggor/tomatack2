//modules
const express = require("express"); //importing express
const farmerController = require("../controllers/farmer"); //importing farmerController
const checkAuth = require("../middlewares/checkAuth")
const multer = require("multer")
const {storage} = require("../middlewares/imageUploader")




//create router
const router = express.Router();

const upload = multer({storage})

//get farmer
router.get("/:id", farmerController.getFarmer);

//post add produce
router.post(
    "/add-produce/:id",
    checkAuth.verifyToken,
    checkAuth.verifyFarmer,
    upload.single("imageUrl"),
    farmerController.addProduce
);

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

// router.post("/upload/one", upload.single('image'), function(req,res){
//     cloudinary.uploader.upload(req.file.path, function(err,result){
//         if (err){
//             console.log(err);
//             return res.status(404).json({
//                 message:"Imgae not uploaded"
//             })
//         }

//         res.status(200).json({
//             message:"Image uploaded",
//             data: result
//         })
//     })
// })

//export router
module.exports = router;

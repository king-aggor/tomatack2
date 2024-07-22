//modules
const {PrismaClient}= require("@prisma/client");
const { PurchaseRequest } = require("./wholesaler"); 

// create an instance of prisma
const prisma = new PrismaClient()

// get farmer
exports.getFarmer = async (req, res) => {
  try{
    const id = parseInt(req.params.id)
    const farmer = await prisma.farmer.findUnique({
      where:{
        id:id
      }
    })
   res.status(200).json({
    farmer
   })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//post add produce
exports.addProduce = async (req, res) => {
 try{
  const id = parseInt(req.params.id)
  const imageUrl = req.file.path
  const produce = await prisma.product.create({
    data:{
      variety: req.body.variety,
      quantity: parseInt(req.body.quantity),
      harvest_date: new Date(req.body.harvest_date),
      price: parseFloat(req.body.price),
      imageUrl,
      farmer:{
        connect:{
          id
        }
      },
      request:{
        status:false
      },
  }
})
 res.status(200).json({
  message: "Produce added successfully"
 })
 }catch(err){
  console.log(err)
  res.status(422).json({
    err
  })
 }
};

// get produce
exports.getProduce = async (req, res) => {
  try{
    const batch_no = parseInt(req.params.id)
    const produce = await prisma.product.findUnique({
      where:{
        batch_no
      }
    })
    res.status(200).json({
      message: "Get produce",
      produce
    });
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//delete produce
exports.deleteProduce = async (req, res) => {
  try{
    const batch_no = parseInt(req.params.id)
    await prisma.product.delete({
      where:{
        batch_no
      }
    })
    res.status(200).json({
      message:"Produce deleted successful"
    })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//get all farmer produces
exports.getFarmerProduces = async (req, res) => {
  try{
    const farmerId = parseInt(req.params.id)
    const produces = await prisma.product.findMany({
      where:{
        farmerId
      }
    })
    res.status(200).json({
      produces
    })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//get available produces
exports.getAvailableProduces = async (req, res) => {
  try{
    const farmerId = parseInt(req.params.id)
    const farmerAvailableProduces = await prisma.product.findMany({
      where: {
        farmerId,
        wholesalerId:null,
      },
    });
    res.status(200).json({
      message: "Farmer Available Produces",
      farmerAvailableProduces
    })
  }catch(err){
    console.log(err)
  }
};

//get sold produces
exports.getSoldProduces = async (req, res) => {
  try{
    const farmerId = parseInt(req.params.id)
    const soldProduces = await prisma.product.findMany({
      where:{
        farmerId,
        wholesalerId:{
          not:null
        }
      }
    })
    res.status(200).json({
      message: "Sold Produces",
      soldProduces
    })
  }catch(err){
    res.status(422).json({
      err
    });
  }
};

//get purchase requests
exports.getPurchaseRequests = async (req, res) => {
  try{
    const farmerId = parseInt(req.params.id)
    const purchaseRequests = await prisma.product.findMany({
      where:{
        farmerId,
        request:{
          path: ['status'],
          equals: true
        }
      }
    })
    res.status(200).json({
      message: "Farmer Purchase requests",
      purchaseRequests
    })
  }catch(err){
    res.status(422).json({
      err
    });
  }
};

//post confirm purchase request
exports.confirmPurchaseRequest = async (req, res) => {
  try{
    const farmerId = req.body.farmerId
    const batch_no = parseInt(req.params.id)
    const requestedProduce = await prisma.product.findUnique({
      where:{
        batch_no,
        farmerId
      }
    })
    const wholesalerId = parseInt(requestedProduce.request.wholesalerId)
    await prisma.product.update({
      where:{
        batch_no,
        farmerId
      },
      data:{
        request:{
          status:false
        },
        wholesalerId
    }
    })
    res.status(200).json({
      message:"Purchase Confirmed"
    })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    });
  }
};

//post decline purchase request
exports.declinePurchaseRequest = async (req, res) => {
  try{
    const farmerId = req.body.farmerId
    const batch_no = parseInt(req.params.id)
    const declinedRequest = await prisma.product.update({
      where:{
        batch_no,
        farmerId
      },
      data:{
        request:{
          status:false,
        }
      }
    })
    res.status(200).json({
      message: "Purchase request declined"
    })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    });
  }
};

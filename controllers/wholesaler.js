//modules
const {PrismaClient} = require("@prisma/client")

//create instance of prisma
const prisma = new PrismaClient()

// get wholesaler
exports.getWholesaler = async (req, res) => {
  try{
    const id = parseInt(req.params.id)
    const wholesaler = await prisma.wholesaler.findUnique({
      where:{
        id:id
      }
    })
   res.status(200).json({
    wholesaler
   })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//get all farmer's available produce
exports.farmerAvailableProduces = async (req, res) => {
  try{
    const farmerId = parseInt(req.params.id)
    const farmerAvailableProduces = await prisma.product.findMany({
      where: {
        farmerId,
        wholesalerId:null,
      },
    });
    res.status(200).json({
      farmerAvailableProduces
     })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//post purchase request
exports.PurchaseRequest = async (req, res) => {
  try{
    const product = await prisma.product.findUnique({
      where: {
        id:batch_no
      }
    }
    )

    res.status(200).json({
      message: "Purchase Request successful",
    })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

// post decline purchase request
exports.declineRequest = (req, res) => {
  res.status(200).json({
    message: "Decline request",
  });
};

//get wholesaler's purchase requests
exports.getPurchaseRequests = (req, res) => {
  res.status(200).json({
    message: "Purchase Requests",
  });
};

//get purchased produces by wholesaler
exports.getPurchasedProduces = (req, res) => {
  res.status(200).json({
    message: "Purchased Produces",
  });
};

// get sold produces
exports.getSoldProduces = (req, res) => {
  res.status(200).json({
    message: "Sold Produces",
  });
};

//get all wholesaler's producces
exports.getAllProduces = (req, res) => {
  res.status(200).json({
    message: "All produces",
  });
};

//get wholesaler's available produce
exports.getAvailableProduces = (req, res) => {
  res.status(200).json({
    message: "wholesaler's available produces",
  });
};

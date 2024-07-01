//modules
const {PrismaClient}= require("@prisma/client")

// creater an instace of prisma
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
  const produce = await prisma.product.create({
    data:{
      variety: req.body.variety,
      harvest_date: new Date(req.body.harvest_date),
      price:req.body.price,
      farmer:{
        connect:{id}
      }
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
  try{}catch(err){
    console.log(err)
  }
};

//get sold produces
exports.getSoldProduces = (req, res) => {
  res.status(200).json({
    message: "Sold Produces",
  });
};

//get purchase requests
exports.getPurchaseRequests = (req, res) => {
  res.status(200).json({
    message: "purchase Requests",
  });
};

//post confirm purchase request
exports.confirmPurchaseRequest = (req, res) => {
  res.status(200).json({
    message: "Confirm purchase",
  });
};

//post decline purchase request
exports.declinePurchaseRequest = (req, res) => {
  res.status(200).json({
    message: "Decline purchase",
  });
};

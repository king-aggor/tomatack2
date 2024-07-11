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
    const batch_no = parseInt(req.params.id)
    const request = await prisma.product.update({
      where:{
        batch_no
      },
      data:{
        request: {
          status: true,
          wholesalerId: req.body.wholesalerId
        }
      },
    })
    res.status(200).json({
      request,
      message: "Purchase Request successful",
    })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//post cancel request
exports.cancelRequest =async (req,res)=>{
  try{
    const wholesalerId = parseInt(req.params.id)
    const batch_no = req.body.batch_no

     const canceledRequest = await prisma.product.update({
      where:{
        batch_no,
        request: {
          path: ['status'],
          equals: true,
          path: ['wholesalerId'],
          equals: wholesalerId
        }
      },
      data:{
        request:{
          status:false,
        }
      }
     })
     res.status(200).json({
      message:"Request Canceled"
     })
  }catch(err){
    res.status(422).json({
      err
     })
  }
}

// post decline purchase request
exports.declineRequest = async (req, res) => {
  try{
    const batch_no = parseInt(req.params.id)
    const request = await prisma.product.update({
      where:{
        id: batch_no
      },
      data:{
        request: false
      },
    })
  res.status(200).json({
    request,
    message: "Decline request",
  });
}catch(err){
  console.log(err)
  res.status(422).json({
    err
  })
}
};

//post accept purchase request
exports.acceptRequest = async (req, res) => {
  try{
    const batch_no = parseInt(req.params.id)
    const request = await prisma.product.update({
      where:{
        id: batch_no
      },
      data:{
        request: true,
        wholesalerId: wholesalerid
      },
    })
  res.status(200).json({
    request,
    message: "Decline request",
  });
}catch(err){
  console.log(err)
  res.status(422).json({
    err
  })
}
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
exports.getSoldProduces = async (req, res) => {
  try{
    const wholesalerId = parseInt(req.params.id)
    const soldProduces = await prisma.product.findMany({
      where:{
        wholesalerId,
        retailerid:!null,
      }
    })
    res.status(200).json({
      soldProduces,
      message: "wholesaler's sold produces",
    });
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//get all wholesaler's producces
exports.getAllProduces = async (req, res) => {
  try{
    const wholesalerId = parseInt(req.params.id)
    const wholesalerproduces = await prisma.product.findMany({
      where:{
        wholesalerId
      }
    })
    if (wholesalerproduces.length < 1) {
      return res.status(404).json({ message: "wholesaler has no products yet"});
    }
    else{
      res.status(200).json({
        wholesalerproduces
       })
    }

  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//get wholesaler's available produce
exports.getAvailableProduces = async (req, res) => {
  try{
    const wholesalerId = parseInt(req.params.id)
    const wholesaleravailableproduce = await prisma.product.findMany({
      where:{
        wholesalerId,
        retailerid:null,
      }
    })
    res.status(200).json({
      wholesaleravailableproduce,
      message: "wholesaler's available produces",
    });
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

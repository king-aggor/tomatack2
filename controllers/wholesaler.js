//modules
const {PrismaClient} = require("@prisma/client")
const { PurchaseRequest } = require("./retailer");

//create instance of prisma
const prisma = new PrismaClient()

// get wholesaler
exports.getWholesaler = async (req, res) => {
  try{
    const id = parseInt(req.params.id)
    const wholesaler = await prisma.wholesaler.findUnique({
      where:{
        id:id,
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

//get all farmers available produce
exports.farmerAvailableProduces = async (req, res) => {
  try{
    const id = parseInt(req.params.id)
    const farmerAvailableProduces = await prisma.product.findMany({
      where: {
        wholesalerId:null,
      },
      include: {
        farmer: true
      }
  });
  const wholesaler = await prisma.wholesaler.findUnique({
    where:{
      id
    }
  })
  
    res.status(200).json({
      farmerAvailableProduces,
      wholesaler
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
        batch_no,
        wholesalerId : null,
      },
      data:{
        request: {
          status: true,
          wholesalerId: req.body.wholesalerId,
          wholesalerName: req.body.wholesalerName
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
        request: {
          status: false,
        }
      }
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
    const wholesalerId = req.body.wholsalerId
    const batch_no = parseInt(req.params.id)
    const requestedProduce = await prisma.product.findUnique({
      where:{
        batch_no,
        wholesalerId
      }
    })
    const retailerId = parseInt(requestedProduce.request.retailerId)
    const acceptedRequest = await prisma.product.update({
      where:{
        batch_no,
        wholesalerId
      },
      data:{
        request:{
          status:false
        },
        retailerId
    },
    include:{
      retailer: true
    }
    })
    const retailerUpdateUrl = `http://${process.env.Blockchain_domain}:${process.env.Blockchain_retailer_port}/retailerUpdate`
    const headers = {
      "Content-Type": "application/json"
    }
    const body = JSON.stringify({
      id: `${acceptedRequest.batch_no}`,
      retailerId: `${acceptedRequest.retailer.id}`,
      retailerName: `${acceptedRequest.retailer.name}`
    })
    try{
      const response = await fetch(retailerUpdateUrl,{
        method: "POST",
        headers: headers,
        body: body
      })
      console.log(response)
      if(response.status == 200){
        res.status(200).json({
          message:"Purchase Confirmed"
        })
      }
      else{
        res.status(404).json({
          message: "Unable to update entry 1",
          status:response.status
        })
      }
    }catch(err){
      res.status(404).json({
        message: "Unable to update entry",
        err
      })
    }
    // res.status(200).json({
    //   message:"Purchase Confirmed"
    // })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    });
  }
}


//get wholesaler's orders
exports.getOrders = async (req, res) => {
 try{
  const wholesalerId = parseInt(req.params.id)
  const wholesalersPurchaseRequests = await prisma.product.findMany({
      where:{
        request: {
          path: ['status'],
          equals: true,
          path: ['wholesalerId'],
          equals: wholesalerId
        }
      }
  })
  res.status(200).json({
    message: "Wholesalers Orders",
    wholesalersPurchaseRequests,
    
  });
 }catch(err){
  console.log(err)
  res.status(422).json({
    err
 })
};
}

//get retailers purchase requests to wholesaler
exports.getRetailersRequests = async (req, res) => {
  try{
  const wholesalerId = parseInt(req.params.id)
  const retailersRequests = await prisma.product.findMany({
    where:{
      wholesalerId,
      retailerId:null,
      request: {
        path: ['status'],
        equals: true,
        path: ['retailerId'],
        equals: retailerId
      },
      
    }
  })
  res.status(200).json({
    message: "Retailers Requests",
    retailersRequests,
  })

  }catch(err){
    console.log(err)
    res.status(422).json({
      err
  })
}
}

//get purchased produces by wholesaler
exports.getPurchasedProduces = (req, res) => {
  try{
    const wholesalerId = parseInt(req.params.id)
    


  res.status(200).json({
    message: "Purchased Produces",
  });
  }
  catch(err){
    console.log(err)
    res.status(422).json({
    err
  })
}
}

// get sold produces
exports.getSoldProduces = async (req, res) => {
  try{
    const wholesalerId = parseInt(req.params.id)
    const soldProduces = await prisma.product.findMany({
      where:{
        wholesalerId,
        retailerId:{
          not:null
        }
      }
    })
    res.status(200).json({
      message: "wholesaler's sold produces",
      soldProduces,
      
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
        retailerId:null,
      }
    })
    res.status(200).json({
      message: "wholesaler's available produces",
      wholesaleravailableproduce,
      
    });
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

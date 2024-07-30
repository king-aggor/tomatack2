//modules
const {PrismaClient}= require("@prisma/client");
const { PurchaseRequest } = require("./wholesaler"); 
const { purchaseRequest } = require("./retailer");
const axios = require("axios")


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
  },
  include: {
    farmer: true
  }
})
const createEntryUrl = `http://${process.env.Blockchain_domain}:${process.env.Blockchain_farmer_port}/newEntry`
const headers = {
  "Content-Type": "application/json"
}
const body = JSON.stringify({
  id: `${produce.batch_no}`,
  farmerId: `${produce.farmerId}`,
  farmLocation: `${produce.farmer.region}`,
  variety: `${produce.variety}`,
  batchNo: `${produce.batch_no}`,
  harvestDate: `${produce.harvest_date}`,
  price: `${produce.price}`,
  quantity: `${produce.quantity}`
})
try{
  const response = await axios.post(createEntryUrl,body, {
    // method: "POST",
    headers: headers,
    // body:body
    // timeout: 600000
  })
  if(response.status == 200){
    res.status(200).json({
      message: "Produce added successfully",
     })
  }
  else{
    res.status(response.status).json({
      message:response.status
    })
  }
}catch(err){
  console.log(err)
  res.status(404).json({
    message: "Unable to create entry",
    err
  })
}
 }catch(err){
  console.log(err)
  res.status(422).json({
    err
  })
 }
};

// get produce
exports.getProduce = async (req, res) => {
    const batch_no = parseInt(req.params.id)  
    const getEntryUrl = `http://${process.env.Blockchain_domain}:${process.env.Blockchain_farmer_port}/getEntry?id=${batch_no}`
    console.log(getEntryUrl)
    const headers = {
      "Content-Type": "application/json"
    }
    try{
      const response = await axios.get(getEntryUrl ,{
        headers: headers,
      });
      const produce = response.data
      if(response.status == 200){
        console.log(response.data)
        res.status(200).json({
          message: "Produce",
          produce
        })
      }
      else{
        res.status(422).json({
          message: " Unable to fetch produce details",
         })
      }
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
        batch_no,
        wholesalerId:null
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
    console.log(purchaseRequests)
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
    const confirmedPurchase = await prisma.product.update({
      where:{
        batch_no,
        farmerId
      },
      data:{
        request:{
          status:false
        },
        wholesalerId
      },
    include:{
      wholesaler:true
    }
    })
    console.log(confirmedPurchase)
    const wholesalerUpdateUrl = `http://${process.env.Blockchain_domain}:${process.env.Blockchain_wholesaler_port}/wholeSalerUpdate`
    console.log(wholesalerUpdateUrl)
    const headers = {
      "Content-Type": "application/json"
    }
    console.log(1)
    const body = JSON.stringify({
      id: `${confirmedPurchase.batch_no}`,
      wholesalerId: `${confirmedPurchase.wholesaler.id}`,
      wholesalerName: `${confirmedPurchase.wholesaler.name}`
    })
    console.log(2)
    try{
      console.log(3)
      const response = await fetch(wholesalerUpdateUrl,{
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
          message: "Unable to update entry",
          status:response.status
        })
      }
    }catch(err){
      res.status(422).json({
        message: "unable to update entry",
        err
      })
    }
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
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

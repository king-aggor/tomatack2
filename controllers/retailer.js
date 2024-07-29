//modules
const {PrismaClient} = require("@prisma/client")
const axios = require("axios")
const qrcode = require("qrcode")
const fs = require("fs")

//create instance of prisma
const prisma = new PrismaClient()

// get retailer
exports.getRetailer = async (req, res) => {
  try{
    const id = parseInt(req.params.id)
    const retailer = await prisma.retailer.findUnique({
      where:{
        id:id,
      }
    })
   res.status(200).json({
    retailer
   })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//get all wholesaler' available produce
exports.getWholesalerAvailableProduces = async (req, res) => {
  try{
    // const wholesalerId = parseInt(req.params.id)
    const wholesalerAvailableProduces = await prisma.product.findMany({
      where: {
        wholesalerId :{
          not:null
        },        
        retailerId:null,
      },
    });
    res.status(200).json({
      wholesalerAvailableProduces
     })
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//post purchase request
exports.purchaseRequest = async (req, res) => {
  try{
    const batch_no = parseInt(req.params.id)
    const request = await prisma.product.update({
      where:{
        batch_no
      },
      data:{
        request: {
          status: true,
          retailerId: req.body.retailerId,
          retailerName: req.body.retailerName
        }
      },
    })
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

//get retailer's orders
exports.getOrders = async (req, res) => {
  try{
    const retailerId = parseInt(req.params.id)
    const retailersPurchaseRequests = await prisma.product.findMany({
        where:{
          request: {
            path: ['status'],
            equals: true,
            path: ['retailerId'],
            equals: retailerId
          }
        }
    })
    res.status(200).json({
      message: "Retailers orders",
      retailersPurchaseRequests,
    });
   }catch(err){
    console.log(err)
    res.status(422).json({
      err
   })
  };
};

//get purchased produces
exports.getPurchasedProduces = (req, res) => {
  res.status(200).json({
    message: "Purchased Produces",
  });
};

//get all retailer's produces
exports.getAllProduces = async (req, res) => {
  try{
    const retailerId = parseInt(req.params.id)
    const retailerproduces = await prisma.product.findMany({
      where:{
        retailerId
      }
    })
    if (retailerproduces.length < 1) {
      return res.status(404).json({ message: "retailer has no products yet"});
    }
    else{
      res.status(200).json({
        message: "All Produces",
        retailerproduces,
        
       })
    }
  }catch(err){
    console.log(err)
    res.status(422).json({
      err
    })
  }
};

//get retailer's available produces
exports.getRetailerAvailableProduces = (req, res) => {
  res.status(200).json({
    message: "Available Produces",
  });
};

//post generate QR-code
exports.generateQRCode = async (req, res) => {
  const batch_no = parseInt(req.params.id)  
    const getEntryUrl = `http://${process.env.Blockchain_domain}:${process.env.Blockchain_farmer_port}/getEntry?id=${batch_no}`
    const headers = {
      "Content-Type": "application/json"
    }
    try{
      const response = await axios.get(getEntryUrl ,{
        headers: headers,
      });
      const produce = response.data
      console.log(response.data)
      // const produceData = [
      //   {
      //     variety
      //   }
      // ];
      const variety = {
        beefsteak:{"Best Suited For": "Salad", "Nutritional content":"Contains Vitamin C"},
        powerRano:{"Best Suited For": "Fresh consumption and salads", "Nutritional content": "Contains vitamins A and C, and antioxidants"},
        legonTomato:{"Best Suited For":"Fresh consumption", "Nutritional content":"High in vitamins A and C, and lycopene"},
        tomatoQueen:{"Best Suited For":"Sauces, purees, and soups","Nutritional content":"Sauces, purees, and soups"},
        auntyDede: {"Best Suited For":"Sauces, stews, and salads", "Nutritional content":"Rich in vitamins A and C, potassium, and antioxidants"},
        ramo: {"Best Suited For":"Sauces, pastes, and stews", "Nutritional content": "Rich in vitamins A and C, and lycopene"} 
      }
      //const v = "Aunty Dede"
      let qrCodeString1
      if(produce.Variety == "Beefsteak"){
         qrCodeString1 = `Batch Number: ${produce.BatchNo}\n Variety: ${produce.Variety}\n Farm Location: ${produce.FarmLocation}\n Harvest Date: ${produce.HarvestDate}\n Best Suited For: ${variety.beefsteak["Best Suited For"]}\n Nutritional content: ${variety.beefsteak["Nutritional content"]}`
         console.log(qrCodeString1)
        }
      else if(produce.Variety == "Power Rano"){
        qrCodeString1 = `Batch Number: ${produce.BatchNo}\n Variety: ${produce.Variety}\n Farm Location: ${produce.FarmLocation}\n Harvest Date: ${produce.HarvestDate}\n Best Suited For: ${variety.powerRano["Best Suited For"]}\n Nutritional content: ${variety.powerRano["Nutritional content"]}`
        console.log(qrCodeString1)
        }
      else if(produce.Variety == "Legon Tomato"){
        qrCodeString1 = `Batch Number: ${produce.BatchNo}\n Variety: ${produce.Variety}\n Farm Location: ${produce.FarmLocation}\n Harvest Date: ${produce.HarvestDate}\n Best Suited For: ${variety.legonTomato["Best Suited For"]}\n Nutritional content: ${variety.legonTomato["Nutritional content"]}`
        console.log(qrCodeString1)
        }
      else if(produce.Variety == "Tomato Queen"){
        qrCodeString1 = `Batch Number: ${produce.BatchNo}\n Variety: ${produce.Variety}\n Farm Location: ${produce.FarmLocation}\n Harvest Date: ${produce.HarvestDate}\n Best Suited For: ${variety.tomatoQueen["Best Suited For"]}\n Nutritional content: ${variety.tomatoQueen["Nutritional content"]}`
        console.log(qrCodeString1)
        }
      else if(produce.Variety == "Aunty Dede"){
        qrCodeString1 = `Batch Number: ${produce.BatchNo}\n Variety: ${produce.Variety}\n Farm Location: ${produce.FarmLocation}\n Harvest Date: ${produce.HarvestDate}\n Best Suited For: ${variety.auntyDede["Best Suited For"]}\n Nutritional content: ${variety.auntyDede["Nutritional content"]}`
        console.log(qrCodeString1)
        }
      else if(produce.Variety == "Ramo"){
        qrCodeString1 = `Batch Number: ${produce.BatchNo}\n Variety: ${produce.Variety}\n Farm Location: ${produce.FarmLocation}\n Harvest Date: ${produce.HarvestDate}\n Best Suited For: ${variety.ramo["Best Suited For"]}\n Nutritional content: ${variety.roma["Nutritional content"]}`
        console.log(qrCodeString1)
        }
      
      if(response.status == 200){
      qrcode.toBuffer(qrCodeString1,{type: "png"}, (err, code)=>{
       if(err){
        res.status(422).json({
          message:"Unable to generate QR Code"
        })
       }
       else{
        const base64Image = Buffer.from(code).toString('base64')
        res.status(200).json({
          QR_codeBase64Image: base64Image
        })
       }
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


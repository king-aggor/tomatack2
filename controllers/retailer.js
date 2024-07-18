//modules

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
    const wholesalerId = parseInt(req.params.id)
    const wholesalerAvailableProduces = await prisma.product.findMany({
      where: {
        wholesalerId,
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
          retailerId: req.body.retailerId
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

//get retailer's purchase requests
exports.getRetailerPurchaseRequests = async (req, res) => {
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
      message: "Purchase Requests",
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

//get all retrailer's producces
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
        retailerproduces,
        message: "All Produces",
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
exports.generateQRCode = (req, res) => {
  res.status(200).json({
    message: "Generate QRc-code",
  });
};

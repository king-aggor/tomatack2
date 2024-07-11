//modules

// get retailer
exports.getRetailer = async (req, res) => {
  try{
    const id = parseInt(req.params.id)
    const wholesaler = await prisma.wholesaler.findUnique({
      where:{
        id:id
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
exports.purchaseRequest = (req, res) => {
  res.status(200).json({
    message: "Purchase Request",
  });
};

//get retailer's purchase requests
exports.getRetailerPurchaseRequests = (req, res) => {
  res.status(200).json({
    message: "retailer Purchase requests",
  });
};

//get purchased produces
exports.getPurchasedProduces = (req, res) => {
  res.status(200).json({
    message: "Purchased Produces",
  });
};

//get all retrailer's producces
exports.getAllProduces = (req, res) => {
  res.status(200).json({
    message: "All Produces",
  });
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

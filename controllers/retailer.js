//modules

// get retailer
exports.getRetailer = (req, res) => {
  res.status(200).json({
    message: "Retailer Details",
  });
};

//get all wholesaler' available produce
exports.getWholesalerAvailableProduces = (req, res) => {
  res.status(200).json({
    message: "Wholesalers' available produces",
  });
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

//modules

// get wholesaler
exports.getWholesaler = (req, res) => {
  res.status(200).json({
    message: "Wholesaler details",
  });
};

//get all farmer's available produce
exports.farmerAvailableProduces = (req, res) => {
  res.status(200).json({
    message: "Farmer Available Produces",
  });
};

//post purchase request
exports.PurchaseRequest = (req, res) => {
  res.status(200).json({
    message: "Purchase Request",
  });
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

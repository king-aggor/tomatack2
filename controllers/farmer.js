//modules

// get farmer
exports.getFarmer = (req, res) => {
  res.status(200).json({
    message: "Farmer Details",
  });
};

//post add produce
exports.addProduce = (req, res) => {
  res.status(200).json({
    message: "Add produce",
  });
};

// get produce
exports.getProduce = (req, res) => {
  res.status(200).json({
    message: "Get produce",
  });
};

//delete produce
exports.deleteProduce = (req, res) => {
  res.status(200).json({
    message: "Delete produce",
  });
};

//get all farmer produces
exports.getFarmerProduces = (req, res) => {
  res.status(200).json({
    message: "All farmer's produces",
  });
};

//get available produces
exports.getAvailableProduces = (req, res) => {
  res.status(200).json({
    message: "Available Produces",
  });
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

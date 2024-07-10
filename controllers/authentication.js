//modules
const {PrismaClient} = require("@prisma/client")

//create an instance of prisma
const prisma = new PrismaClient()

// signup
exports.signup = async (req, res) => {
  try{
    const user = await prisma[req.body.role].create({
      data:{
        name:req.body.name,
        contact: req.body.contact,
        digital_address: req.body.digital_address,
        region: req.body.region
      }
    })
    res.status(200).json({
      message: "Account created successfull",
      user
    })
  }catch(err){
    console.log(err)
  }
};

//login
exports.login = (req, res) => {
  res.status(200).json({
    message: "login",
  });
};

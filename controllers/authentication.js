//modules
const {PrismaClient} = require("@prisma/client")
require("dotenv")
//import bcrypt
const bcrypt = require("bcrypt")

//import jsonwebtoken 
const jwt = require("jsonwebtoken")

//create an instance of prisma
const prisma = new PrismaClient()

const phoneNumberPattern =  /^(?:\+233|0)(24|54|55|59|20|50|26|56|27|57|23|28)\d{7}$/;

// signup
exports.signup = async (req, res) => {
  try{
    const email = req.body.email;
    const contact = req.body.contact;
    const password = req.body.password;
    const role = req.body.role.toLowerCase()

    //check if contact is valid 
    const phoneNumberMatch = await contact.match(phoneNumberPattern);

    if(phoneNumberMatch) {
      const hashPassword = await bcrypt.hash(password, 10);
      const contactCheck = await prisma[role].findMany({
        where:{
          contact
        }
      })
      if(contactCheck.length < 1){
        const user = await prisma[role].create({
          data:{
            name:req.body.name,
            contact: req.body.contact,
            email : req.body.email,
            digital_address: req.body.digital_address,
            region: req.body.region,
            password: hashPassword
          }
        })
        const token = jwt.sign(
          {
            role,
          },
          process.env.JWT_KEY
        )
        res.status(200).json({
          message: "Account created successfull",
          user,
          token
        })
      }
      else{
        res.status(404).json({
          message: "User already exist"
        })
      }
      }
    else{
    res.status(406).json({
      message:"Wrong phone number format"
    })
    }   
  }catch(err){
    console.log(err)
  }
};

//login
exports.login = async (req, res) => {
  const contact = req.body.contact
  const password = req.body.password
  const role = req.body.role.toLowerCase()
  const phoneNumberMatch = await contact.match(phoneNumberPattern);
  if (phoneNumberMatch){
    const user = await prisma[role].findMany({
      where:{
        contact,
      }
    })
    if(user.length > 0){
      const userPassword = user[0].password
      const passwordMatch = await bcrypt.compare(password,userPassword)
      if(passwordMatch == true){
        const token = jwt.sign(
          {
            role,
          },
          process.env.JWT_KEY
        )
        res.status(200).json({
          message: "Login Successful",
          token
        })
      }
      else{
        res.status(401).json({
          message: "Wrong Password"
        })
      }
    }
    else{
      res.status(406).json({
        message: "User does not exist"
      })
    }
  }
  else{
    res.status(406).json({
      message: "Wrong phone number format"
    })
  }
};

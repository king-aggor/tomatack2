
const cloudinary = require("cloudinary").v2; //importing cloudinary
const { CloudinaryStorage } = require("multer-storage-cloudinary"); //importing multer-storage-cloudinary

// setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Tomachain",
  },
});

module.exports = {storage};
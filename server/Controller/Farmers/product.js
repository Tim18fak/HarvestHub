const { Product, Farmer } = require('../../Model/DB_structure');
const { Cloudinary } = require('../../config/cloudinary.config');
const {ReqInfo} = require('./constants/reqInfo')
const multer = require("multer");
const { uploadImages } = require('./constants/uploadImages');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique name for the uploaded file
  },
});

const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
  try {
    // Access the image and description using their respective field names
    upload.fields([{ name: "image", maxCount: 5 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Image upload failed" });
      }
  
      const {productImages,
        description, 
        quantity,
        price, 
        catergory,
        location,
        date,userid} = await ReqInfo(req);
        
      const newProduct = new Product({Image: productImages,
        description: description, 
        quantity: quantity,
        price: price, 
        catergory: catergory,
        location: location,
        date:date,
      Farmer: userid})

      newProduct.save()
      .then(async (data) => {
        const FarmerProductArray = Farmer.findById(userid)
        FarmerProductArray.push(data._id)
        await FarmerProductArray.save();
      })
      res.status(200).json({ message: "Product created successfully" });
    });
  } catch (error) {
    res.status(500).send(error.message); // Respond with an error status
  }
};

const deleteProduct = async(req,res) => {
  const {produceId} =  req.params
  const deleteProduct = await Product.findByIdAndRemove(produceId)
  if(!deleteProduct){
    return res.status(403).json({'message': 'Produce Id not found'})
  }
  return res.status(204).json({'message': 'Produce Id Deleted'})
}

const testUploadProduct = async(req,res) => {
  try {
    const id = req.params.Id
  const {title,description,location,date,quantity,price,category} = req.body
  const imageUrl = await uploadImages(req.body.images)
  if(!imageUrl){
    return res.status(401).json({'message': 'Produce Upload Failed'})
  }
  const newProduce  = new Product({
    title,
    description,
    Image: imageUrl,
    date,
    quantity,
    price,
    category:category,
    Farmer: id,
    location,
  })
  const produceInfo = await newProduce.save()
  console.log('saved')
  const farmer =  await Farmer.findById(id);
  farmer.products.push(produceInfo._id)
  await farmer.save();
  console.log('product field updated')
  res.status(204).json({
    'message': 'Produce Uploaded Successfully'
  })
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = { createProduct, deleteProduct,testUploadProduct}
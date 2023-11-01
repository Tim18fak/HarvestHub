const { Product, Farmer } = require('../../Model/DB_structure');
const {ReqInfo} = require('./constants/reqInfo')
const multer = require("multer");

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

      await newProduct.save();

      /* console.log({productImages,description, quantity,price, category,location,date,userid}) */
      

     /*  await newProduct.save();
 */
      res.status(200).json({ message: "Product created successfully" });
    });
  } catch (error) {
    res.status(500).send(error.message); // Respond with an error status
  }
};

const deleteProduct = async() => {

}
module.exports = { createProduct, deleteProduct}
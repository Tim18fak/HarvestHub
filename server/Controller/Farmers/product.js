const { Product } = require('../../Model/DB_structure');
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
    upload.fields([{ name: "image", maxCount: 1 }, { name: "description", maxCount: 1 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Image upload failed" });
      }

      const { name, price } = req.body; // Assuming you have name and price fields in the form

      const image = req.files["image"][0];
      const description = req.body["description"];

      console.log("Image File:", image);
      console.log("Description:", description);
      console.log(`https://localhost/images/${image.filename}`);

      // Create a new product record in the database
     /*  const newProduct = new Product({
        name,
        price,
        image: `http://localhost:3000/images/${image.filename}`,
        description,
      }); */

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
const getProduct = async(req,res) => {
  const userId = req.query.userId;
  const user = req.query.user;

  res.status(200).json({ userId, user });
  /* const {userId} = req.query.userId;
  Product.find({UserId : userId},(err,produce) => {
    if(err){
      res.status(403).json('User\'s produces can\'t be found')
    }
    if(produce.length === 0){
      res.status(200).json('User has not added any produce yet')
    }
    res.status(200).json({produce})
  }) */
  console.log(userId)
  res.send('hell')

}
module.exports = { createProduct, deleteProduct, getProduct}
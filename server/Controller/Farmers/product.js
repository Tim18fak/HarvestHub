const { Product, Farmer } = require('../../Model/DB_structure');
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
      const farmerId = req.query.farmerId
      const { name, price } = req.body; // Assuming you have name and price fields in the form
      /*Product.find({ Farmer: farmerId }) checks the Product collection to find all Product objects that have a Farmer field equal to the farmerId value. It then searches the Farmer collection for an object that matches the farmerId value and populates the Farmer field of each Product object with the corresponding Farmer object.*/
      Product.find({ Farmer: farmerId }).populate('Farmer').exec((err, products) => {
        if (err) {
          // handle the error
        } else {
          // products will contain all the Product objects that match the farmerId value, with the Farmer field populated with the corresponding Farmer objects
          res.json(products);
        }
      });
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

  /* res.status(200).json({ userId, user }); */
  Product.find({User : userId})
  .then(data => {
    const datalength = data.length;
    if(data.length === 0)
    console.log(`user has an empty data ${data}`)
  res.status(200).json('hell')
  
  })
  .catch(err => {
    console.log(err)
  })
  console.log(userId,user)

}
const test = async(req,res) => {
  const farmerId = req.query.farmerId
  const {title, description,Image,location} = req.body
  console.log({title, description,Image,location,farmerId})
  const productData = {
    title: title,
    description: description,
    Image: Image,
    location: location,
    Farmer: req.query.farmerId // replace with the farmerId value sent from the frontend
  };
  
 /*  Product.create(productData, (err, product) => {
    if (err) {
      // handle the error
    } else {
      // product will contain the newly created Product object
    }
  }); */
  
}
module.exports = { createProduct, deleteProduct, getProduct,test}
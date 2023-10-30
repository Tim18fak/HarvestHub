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
    upload.fields([{ name: "image", maxCount: 5 }])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Image upload failed" });
      }

            // Assuming you have name and price fields in the form
      const image = req.files["image"];
      const description = req.body["description"]
      const quantity = req.body["quantity"]
      const price = req.body["price"];
      const category = req.body["category"]
      

      console.log("Image File:", image);
      console.log(description,quantity,price,category);
      let imageURLArray = []
      let imageURL;
      for(let i = 0; i < image.length; i++){
        imageURL = `https://localhost/images/${image[i].filename}`
        console.log(imageURL);
        imageURLArray.push(imageURL)
      }
      console.log(imageURL)
      /* console.log(`https://localhost/images/${image.filename}`); */

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
module.exports = { createProduct, deleteProduct}
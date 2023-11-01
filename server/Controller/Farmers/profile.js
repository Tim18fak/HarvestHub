const { Farmer } = require('../../Model/DB_structure');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ProfileImages/"); // Save uploaded files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique name for the uploaded file
  },
});

const upload = multer({ storage: storage });
const profile = async (req, res) => {
  try {
    // Access the image using the "profileImg" field name
    upload.single("proImage")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Image upload failed" });
      }
      const image = req.file.filename;
      const userId = req.query.userId;
       // Use req.file to access the uploaded image

      // Access other profile information from the request body
      const { fullname, email, phoneNumber, farmName, farm_address, home_Address, nationalId,aboutYourself } = req.body;
      const ProfileImage = `https://localhost/profileimages/${image}`
      const farmer = await Farmer.find({_id: userId})
      farmer.phoneNumber = phoneNumber;
      farmer.farmName = farmName;
      farmer.home_Address = home_Address;
      farmer.nationalId = nationalId;
      farmer.aboutYourself = aboutYourself;

      farmer.profileImage = ProfileImage;

      await farmer.save

      console.log(image)
      // You can save the image and profile info to the database or perform other actions here
      console.log(farmer)
      res.status(200).json({ message: "Profile information and image uploaded successfully", ProfileImage, });
    });
  } catch (error) {
    res.status(500).send(error.message); // Respond with an error status
  }
};

module.exports = { profile };

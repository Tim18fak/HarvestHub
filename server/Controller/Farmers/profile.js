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
      console.log(userId)
       // Use req.file to access the uploaded image

      // Access other profile information from the request body
      const { fullname, email, phoneNumber, farmName, farm_address, home_Address, nationalId,aboutYourself } = req.body;
      const ProfileImage = `https://localhost/profileimages/${image}`
      const farmer = await Farmer.findOne({_id: userId})


      farmer.fullname = fullname
      farmer.phoneNumber = phoneNumber;
      farmer.farmName = farmName;
      farmer.home_Address = home_Address;
      farmer.nationalId = nationalId;
      farmer.aboutYourself = aboutYourself;
      farmer.profileImage = ProfileImage;
      farmer.farm_Address = farm_address;
      await farmer.save()

      console.log(image)
      // You can save the image and profile info to the database or perform other actions here
      console.log(farmer)
      res.status(200).json({ message: "Profile information and image uploaded successfully", ProfileImage, });
    });
  } catch (error) {
    res.status(500).send(error.message); // Respond with an error status
  }
};

const getProfile = async(req,res) => {
  try {
    const userId = req.query.userId
  console.log(userId)
  const farmer = await Farmer.findOne({_id: userId})
  if(!farmer){
    res.send({'data':'not found'})
    console.log('not found'+farmer)
  }
console.log('found'+farmer)
  const {fullname,email,aboutYourself,farmName,home_Address,nationalId,phoneNumber} = farmer;
  res.status(200).json({'data':{fullname,email,aboutYourself,farmName,home_Address,nationalId,phoneNumber}})
  } catch (error) {
    
  }
}

module.exports = { profile, getProfile };


/* const updateData = {
  fullname :fullname, 
  email :email, 
  phoneNumber :phoneNumber, 
  farmName :farmName, 
  farm_address, 
  home_Address :home_Address, 
  nationalId :nationalId,
  aboutYourself :aboutYourself
} */

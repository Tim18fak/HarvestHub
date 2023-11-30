const { Farmer } = require('../../Model/DB_structure');

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
      const farmer = await Farmer.findOne({_id: userId})


      farmer.fullname = fullname
      farmer.phoneNumber = phoneNumber;
      farmer.farmName = farmName;
      farmer.home_Address = home_Address;
      farmer.nationalId = nationalId;
      farmer.aboutYourself = aboutYourself;
      farmer.profileImage = ProfileImage;
      farmer.farm_Address = farm_address
      await farmer.save()

      console.log(image)
      // You can save the image and profile info to the database or perform other actions here
      console.log(farmer)
      res.status(200).json({ message: "Profile information and image uploaded successfully", ProfileImage, });
    });
  } catch (error) {
    res.status(500).send(error.message); // Respond with an error status
  }
  res.status(200).json({
    "id":Id,
    "fullname":fullname,
    "username":username,
    "email":email
  })
}

const updateProfile = async(req,res) => {
  try {
    const {} = req.body
    const ID =  req.params.Id
    console.log(req.body)
    const farmer =  await Farmer.findById(ID);
  if(!farmer){
    
  }

  } catch (error) {
    
  }
}

module.exports = { profile,updateProfile };


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
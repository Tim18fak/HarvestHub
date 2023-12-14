const express = require('express')
const bcrypt = require('bcrypt')
const {adminLogin, createAdmin,test,compareActivation,adminReset} = require('../Controller/Admin/admin')
const {getAllFarmer,BlockFarmer,blockConsumer,getAllConsumer} =  require('../Controller/Admin/Admin_Roles/Roles');
const { authenticateAdminToken} = require('../middlewares/authenticateToken');
const { Farmer, User, Product, Admin } = require('../Model/DB_structure');
const router = express.Router();
router.post('/adminLogin',adminLogin)
router.post('/admincreation',createAdmin)
router.post('/compare',compareActivation)
router.post('/reset',adminReset),
router.get('/allConsumer/:Id',authenticateAdminToken,getAllConsumer)
router.get('/produce/:Id',authenticateAdminToken,async(req,res) => {
    const produce =  await Product.find({})
    res.send(produce)
})
router.get('/allFarmer/:Id',authenticateAdminToken,getAllFarmer)
router.get('/farmer/:farmerId/:Id',authenticateAdminToken,async(req,res) => {
    const {farmerId} = req.params
    const farmer =  await Farmer.findById(farmerId)
    if(farmer){
        const {profileImage,NIN,Id,email,verificationStatus,phoneNumber,address,farmDescription,farmType,farmingExperience,farm_Address,fullname}= farmer
        res.send({profileImage,NIN,Id,email,verificationStatus,phoneNumber,address,farmDescription,farmType,farmingExperience,farm_Address,fullname})
    }
})
router.post('/banFarmer/:blockFarmerId/:Id',authenticateAdminToken,BlockFarmer)
router.post('/banConsumer/:banConsumerId/:Id',authenticateAdminToken,blockConsumer)
router.put('/:id/:isFarmer/:Id',async(req,res) => {
   try {
    const {id,isFarmer} = req.params
    const activateUser =  isFarmer === 'true' ? await Farmer.findById(id) : await User.findById(id)
    if(activateUser.verificationStatus && activateUser.verificationStatus !== 'Fulfilled'){
        activateUser.verificationStatus = 'Fulfilled'
        await activateUser.save()
        res.sendStatus(204)
        return console.log('activated')
    }else if(activateUser.verificationStatus === 'Fulfilled'){
        return res.sendStatus(300)
    }
    console.log('no verification Status found')
   } catch (error) {
    
   }
})
router.put('/update/:Id', authenticateAdminToken, async (req, res) => {
    try {
      const { profileImage, fullname, email, password } = req.body.adminProfile;
      const adminId = req.params.Id;

      // Use findByIdAndUpdate to simplify the code
      const newHashedPassword = await bcrypt.hash(password, 15);
      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, {
        profileImage, fullname, email,newHashedPassword
      }, { new: true });
  
      if (!updatedAdmin) {
        // Handle the case where the admin with the given ID is not found
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      /* console.log('Profile updated:', updatedAdmin); */
      res.status(200).json(updatedAdmin);
    } catch (error) {
      console.error('Error updating admin profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/profile/:Id',authenticateAdminToken,async(req,res) => {
    const adminId = req.params.Id
    const admin =  await Admin.findById(adminId)
    console.log(admin)
    res.status(200).json(admin)
  })
module.exports = router;
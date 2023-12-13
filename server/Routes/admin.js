const express = require('express')
const {adminLogin, createAdmin,test,compareActivation,adminReset} = require('../Controller/Admin/admin')
const {getAllFarmer,BlockFarmer,blockConsumer,getAllConsumer} =  require('../Controller/Admin/Admin_Roles/Roles');
const { authenticateAdminToken} = require('../middlewares/authenticateToken');
const { Farmer, User } = require('../Model/DB_structure');
const router = express.Router();
router.post('/adminLogin',adminLogin)
router.post('/admincreation',createAdmin)
router.post('/compare',compareActivation)
router.post('/reset',adminReset),
router.get('/allConsumer/:Id',authenticateAdminToken,getAllConsumer)
router.get('/allFarmer/:Id',authenticateAdminToken,getAllFarmer)
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
module.exports = router;
const express = require('express')
const {adminLogin, createAdmin,test,compareActivation,adminReset} = require('../Controller/Admin/admin')
const {getAllFarmer,BlockFarmer,blockConsumer,getAllConsumer} =  require('../Controller/Admin/Admin_Roles/Roles');
const { authenticateAdminToken} = require('../middlewares/authenticateToken');
const router = express.Router();
router.post('/adminLogin',adminLogin)
router.post('/admincreation',createAdmin)
router.post('/compare',compareActivation)
router.post('/reset',adminReset),
router.get('/allConsumer',authenticateAdminToken,getAllConsumer)
router.get('/allFarmer',authenticateAdminToken,getAllFarmer)
router.post('/banFarmer/:blockFarmerId/:Id',authenticateAdminToken,BlockFarmer)
router.post('/banConsumer/:banConsumerId/:Id',authenticateAdminToken,blockConsumer)
module.exports = router;
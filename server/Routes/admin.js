const express = require('express')
const {adminLogin, createAdmin,test,compareActivation,adminReset} = require('../Controller/Admin/admin')
const {getAllFarmer,BlockFarmer,blockConsumer,getAllConsumer} =  require('../Controller/Admin/Admin_Roles/Roles')
const router = express.Router();
router.post('/adminLogin',adminLogin)
router.post('/admincreation',createAdmin)
router.post('/compare',compareActivation)
router.post('/reset',adminReset),
router.get('/allConsumer',getAllConsumer)
router.get('/allFarmer',getAllFarmer)
router.get('/banFarmerId/:blockFarmerId',BlockFarmer)
router.get('/banConsumer/:banConsumerId',blockConsumer)
module.exports = router;
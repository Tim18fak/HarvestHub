const express = require('express')
const {adminLogin, createAdmin,test,compareActivation,adminReset} = require('../Controller/Admin/admin')
const {getAllConsumer,getAllFarmer} = require('../Controller/Admin/Admin_Role/AdminRole')
const router = express.Router();
router.get('/test',test)
router.post('/adminLogin',adminLogin)
router.post('/admincreation',createAdmin)
router.post('/compare',compareActivation)
router.post('/reset',adminReset)
router.get('/getconsumer',getAllConsumer)
router.post('/getfarmer',getAllFarmer)
module.exports = router;
const express = require('express')
const {adminLogin, createAdmin,test,compareActivation} = require('../Controller/Admin/admin')
const router = express.Router();
router.get('/test',test)
router.post('/adminLogin',adminLogin)
router.post('/admincreation',createAdmin)
router.post('/compare',compareActivation)
module.exports = router;
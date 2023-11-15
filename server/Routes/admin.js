const express = require('express')
const {adminLogin, createAdmin,test,compareActivation,adminReset} = require('../Controller/Admin/admin')
const router = express.Router();
router.get('/test',test)
router.post('/adminLogin',adminLogin)
router.post('/admincreation',createAdmin)
router.post('/compare',compareActivation)
router.post('/reset',adminReset)
module.exports = router;
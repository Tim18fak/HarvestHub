const express = require('express')
const {adminLogin, createAdmin,test} = require('../Controller/Admin/admin')
const router = express.Router();
router.get('/test',test)
router.post('/adminLogin',adminLogin)
router.post('/admincreation',createAdmin)
module.exports = router;
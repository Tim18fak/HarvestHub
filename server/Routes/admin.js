const express = require('express')
const {adminLogin, createAdmin} = require('../Controller/Admin/admin')
const router = express.Router();
router.post('/adminLogin',adminLogin)
router.post('/adminCreation',createAdmin)
module.exports = router;
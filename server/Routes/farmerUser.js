const express = require('express')
const {testUploadProduct} = require('../Controller/Farmers/product')
const {profile,getProfile} = require('../Controller/Farmers/profile')
const { authenticateFarmerToken } = require('../middlewares/authenticateToken')
const router = express.Router()
router.get('/profile/:Id',profile)
router.get('/farmerProfile',getProfile)
router.post('/testProduce/:Id',testUploadProduct)
module.exports = router
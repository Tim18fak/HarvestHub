const express = require('express')
const {createProduct,testUploadProduct} = require('../Controller/Farmers/product')
const {profile,getProfile} = require('../Controller/Farmers/profile')
const router = express.Router()
router.post('/profile',profile)
router.get('/farmerProfile',getProfile)
router.post('/createProduct',createProduct)
router.post('/testProduce/:fMID',testUploadProduct)
module.exports = router
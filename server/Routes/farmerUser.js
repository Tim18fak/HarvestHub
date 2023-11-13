const express = require('express')
const {createProduct} = require('../Controller/Farmers/product')
const {profile,getProfile} = require('../Controller/Farmers/profile')
const router = express.Router()
router.post('/profile',profile)
router.get('/farmerProfile',getProfile)
router.post('/createProduct',createProduct)
module.exports = router
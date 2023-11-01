const express = require('express')
const {createProduct} = require('../Controller/Farmers/product')
const {profile} = require('../Controller/Farmers/profile')
const router = express.Router()
router.post('/profile',profile)
router.post('/createProduct',createProduct)
module.exports = router
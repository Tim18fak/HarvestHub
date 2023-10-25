const express = require('express')
const {createProduct} = require('../Controller/Farmers/product')

const router = express.Router()

router.post('/createProduct',createProduct)
module.exports = router
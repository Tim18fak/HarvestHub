const express = require('express')
const {createProduct, deleteProduct, getProduct} = require('../Controller/Farmers/product')

const router = express.Router()
router.get('/getProduct',getProduct)
router.post('/createProduct',createProduct)
module.exports = router
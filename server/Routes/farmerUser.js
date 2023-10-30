const express = require('express')
const {createProduct, deleteProduct, getProduct,test} = require('../Controller/Farmers/product')

const router = express.Router()
router.post('/test',test)
router.get('/getProduct',getProduct)
router.post('/createProduct',createProduct)
module.exports = router
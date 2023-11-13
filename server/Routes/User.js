const express = require('express')
const router = express.Router()
const {searchProduct} = require('../Controller/User/searchProduct')
router.post('/searchproduct', searchProduct);
module.exports = router
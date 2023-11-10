const express = require('express')
const router = express.Router()
const {searchProduct, test} = require('../Controller/User/searchProduct')
router.post('/searchproduct', searchProduct);
router.get('/test',test)
module.exports = router
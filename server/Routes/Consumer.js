const express = require('express')
const router = express.Router()
const {searchProduct, product} = require('../Controller/User/searchProduct');
const { User, Product } = require('../Model/DB_structure');
router.post('/searchproduct', async(req,res) => {
    const {searchTitle,selectedCategories,} =  req.body
    const produce =  await Product.find({})
    
    console.log(produce)
});
module.exports = router
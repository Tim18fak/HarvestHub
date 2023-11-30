const express = require('express')
const router = express.Router()
const {searchProduct, product} = require('../Controller/User/searchProduct');
const { User, Product } = require('../Model/DB_structure');
router.post('/searchproduct', async(req,res) => {
   try {
    const {searchTitle,selectedCategories,} =  req.body
    console.log(req.body)
    const produce =  await Product.find({})
    const filteredProducts = produce.filter(product => {
        return (
            product.title.includes(searchTitle) ||
            product.description.includes(searchTitle)
        );
    })
    console.log(filteredProducts)
    res.json(filteredProducts)
   } catch (error) {
    console.log(error.message)
   }
});
module.exports = router
const express = require('express')
const router = express.Router()
const {searchProduct, product} = require('../Controller/User/searchProduct');
const { User, Product } = require('../Model/DB_structure');
const { otherProduce } = require('../src/services/ClientFeatures/ProduceLogic/produceLogic');
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
router.get('/p/:produceId',async(req,res) => {
   try{
    const id = req.params.produceId
    const produce =  await Product.findById(id).populate({ path: 'Farmer' });
    const {title,description,Image,location,date,quantity,price,category,Farmer} = produce;
    const {fullname,username,products} = Farmer
    const otherProduces =  await otherProduce(products,id)
    console.log(products.length)
    res.json({title,description,Image,location,date,quantity,price,category,fullname,username,'otherProduce': otherProduces})
   }
   catch(err){

   }
})
module.exports = router
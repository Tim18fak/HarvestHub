const { Product, Farmer } = require('../../Model/DB_structure');
const { Cloudinary } = require('../../config/cloudinary.config');
const {ReqInfo} = require('./constants/reqInfo')


const deleteProduct = async(req,res) => {
  const {produceId} =  req.params
  const deleteProduct = await Product.findByIdAndRemove(produceId)
  if(!deleteProduct){
    return res.status(403).json({'message': 'Produce Id not found'})
  }
  return res.status(204).json({'message': 'Produce Id Deleted'})
}

const testUploadProduct = async(req,res) => {
  try {
    const id = req.params.Id
  const {title,description,location,date,quantity,price,category} = req.body
  const imageUrl = await uploadImages(req.body.images)
  if(!imageUrl){
    return res.status(401).json({'message': 'Produce Upload Failed'})
  }
  const newProduce  = new Product({
    title,
    description,
    Image: imageUrl,
    date,
    quantity,
    price,
    category:category,
    Farmer: id,
    location,
  })
  const produceInfo = await newProduce.save()
  console.log('saved')
  const farmer =  await Farmer.findById(id);
  farmer.products.push(produceInfo._id)
  await farmer.save();
  console.log('product field updated')
  res.status(204).json({
    'message': 'Produce Uploaded Successfully'
  })
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = { deleteProduct,testUploadProduct}
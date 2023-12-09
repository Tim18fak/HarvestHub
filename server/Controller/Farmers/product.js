const { Product, Farmer } = require('../../Model/DB_structure');
const { Cloudinary } = require('../../config/cloudinary.config');
const {ReqInfo} = require('./constants/reqInfo')
const {uploadImages} =   require('./constants/uploadImages')

const deleteProduct = async(req,res) => {
  try {
    const {produceId,farmerId} =  req.params
  console.log(produceId)
  const farmer =  await Farmer.findById(farmerId)
  console.log(farmer)
  const index = farmer.products.indexOf(produceId)
  const deleteproduce = farmer.products.splice(index,1)
  console.log(farmer)
    console.log(deleteproduce)
  console.log(index)
  if(index !== -1){
    farmer.products.splice(index,0)
    const deleteProduct = await Product.findByIdAndRemove(produceId)
    if(!deleteProduct){
    console.log('not found')
    return res.status(403).json({'message': 'Produce Id not found'})
    }
  await farmer.save()
  console.log(deleteProduct)
  
  return res.status(204).json({deleteProduct})
  }
  } catch (error) {
    console.log(error.message)
  }
  
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
const getProduce = async(req,res) => {
  const Id =  req.params.Id
  const results =  await Product.find({Farmer: Id})
  if(!results){
    return res.status(401).json({'message': "Farmer Has Not Uploaded Any Produce Yet"})
  }
  res.status(200).json({results})
  console.log(results)
}
module.exports = { getProduce,deleteProduct,testUploadProduct}
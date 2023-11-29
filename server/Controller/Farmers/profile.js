const { Farmer } = require('../../Model/DB_structure');

const profile = async (req, res) => {
  const id =  req.params.Id
  console.log(req.params)
  const farmer = await Farmer.findById(id)
  console.log(farmer)
  const {Id,fullname,username,email,} = farmer
  if(!farmer){
    res.status(403)
  }
  res.status(200).json({
    "id":Id,
    "fullname":fullname,
    "username":username,
    "email":email
  })
}

const updateProfile = async(req,res) => {
  try {
    const {} = req.body
    const ID =  req.params.Id
    console.log(req.body)
    const farmer =  await Farmer.findById(ID);
  if(!farmer){
    
  }

  } catch (error) {
    
  }
}

module.exports = { profile,updateProfile };


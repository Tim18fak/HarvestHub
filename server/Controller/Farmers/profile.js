const { Farmer } = require('../../Model/DB_structure');

const profile = async (req, res) => {
  const id =  req.params.Id
  const farmer = await Farmer.findById(id)
  const {Id,fullname,username,email,} = farmer
  if(!farmer){
    res.status(403)
  }
  res.status(204).json({
    Id,
    fullname,
    username,
    email
  })
}


module.exports = { profile };


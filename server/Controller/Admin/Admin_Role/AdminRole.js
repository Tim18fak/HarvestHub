const {User,Farmer,BlockedUser} = require('../../../Model/DB_structure')


const getAllConsumer = async(req,res) => {
try {
    const allConsumer = await User.find({})
    res.status(202).json({allConsumer})
} catch (error) {
    console.log(error)
}
}
const getAllFarmer = async(req,res) => {
   try {
    const getAllFarmer = await Farmer({})
    res.status(202).json({getAllFarmer})
   } catch (error) {
    console.log(error)
   }
}

module.exports = {getAllConsumer,getAllFarmer}
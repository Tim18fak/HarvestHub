const { Farmer, User } = require("../../../Model/DB_structure")


const addNotification = async(data)=> {
  const {_id,isFarmer} = data
  const user =  isFarmer ? await Farmer.findById(_id) : await User.findById(_id);
  const newDate =  new Date()
  console.log(user)
}

module.exports = {addNotification}
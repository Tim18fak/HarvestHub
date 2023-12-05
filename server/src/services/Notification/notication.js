const { Farmer, User } = require("../../../Model/DB_structure")


const addNotification = async(data)=> {
  const {_id,isFarmer} = data.userInfo
  const produceID =  data.result
  const user =  isFarmer ? await Farmer.findById(_id) : await User.findById(_id);
  const newDate =  new Date()
  user.notification.push({newDate,produceID})
  await user.save()
  return `produce Added with ${produceID}`
}

module.exports = {addNotification}
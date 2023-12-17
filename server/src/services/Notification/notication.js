const { Farmer, User } = require("../../../Model/DB_structure")


const addNotification = async(data)=> {
  try{
    const {_id,isFarmer} = data.userInfo
  const produceID =  data.result
  const message =  data.message
  const user =  isFarmer ? await Farmer.findById(_id) : await User.findById(_id);
  user.notification.push({
    date: new Date(),
    message})
  await user.save()
  console.log('notification added')
  return 'Done'
  }
  catch(err) {
    console.log(err.message)
  }

}

module.exports = {addNotification}
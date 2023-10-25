const { User, BlockedUser, Farmer} = require('../Model/DB_structure');
const bcrypt = require('bcrypt')
////////  authentication code analysis
const activationCodeCompare = (code,Code) => {
    if(code !== Code)
     return true;
}

async function checkUserExists(username, email,isFarmer) {
  //// check if an email has been registered has a farmer
  if(isFarmer){
    const existingFarmer = await Farmer.findOne({ $or: [{ username }, { email }] })
    if(existingFarmer){
      return true
    }
    return false
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if(existingUser){
    return true
  }
  return false
  }
  
  


  async function blockUser(username, email, Ip) {
    const Blocked = await BlockedUser.findOne({ $or: [{ username }, { email }, { Ip}] });

  if (Blocked) {
    return true; // Email and username have been blocked
  }

  return false; // Email and username have been blocked
}

const loginUser =  async(farmer, username) =>{
   if(farmer){
    const loginFarmer = await Farmer.findOne({ username })
    return loginFarmer
  }
  const user = await User.findOne({ username });
  return user
  console.log('this' + user)

}

module.exports = { activationCodeCompare, blockUser, checkUserExists, loginUser}  // to import function from a different folder
const { User, BlockedUser} = require('../Model/DB_structure');

////////  authentication code analysis
const activationCodeCompare = (code,Code) => {
    if(code !== Code)
     return true;
}

async function checkUserExists(username, email) {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
    if (existingUser) {
      return true; // User with the provided username or email already exists
    }
  
    return false; // User does not exist
  }
  
  async function blockUser(username, email, Ip) {
    const Blocked = await BlockedUser.findOne({ $or: [{ username }, { email }, { Ip}] });

  if (Blocked) {
    return true; // Email and username have been blocked
  }

  return false; // Email and username have been blocked
}

module.exports = { activationCodeCompare, blockUser, checkUserExists}  // to import function from a different folder
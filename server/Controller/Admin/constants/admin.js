const {Admin} = require('../../../Model/DB_structure')
const  bcrypt = require('bcrypt')

const adminLoginInfo = async(arg) => {
const {username,email,password} = arg
const adminResponse = await Admin.findOne({email})
if(!adminResponse) return /* { 'message': 'User not found' } */ {'statusCode': 403}
const success = await bcrypt.compare(password, adminResponse.hashedPassword);
if (!success) {
    return /* { 'message': 'Incorrect password' }; */  {'statusCode':401}  
   }
if(adminResponse){
    const {_id, username} = adminResponse;
    return {username, _id}

}
}

const createAdminInfo = async(arg) => {
    const {username,password,email,activationCode} = req.body
    const adminNumber = await Admin.countDocuments()
    const adminLimit = 1;
    if(adminNumber < adminLimit){
        const admin = new Admin(
            {username,
            password,
            email,
            activationCode}  
        )
        admin.save()
        return /* {'message': 'Admin has been created'} */{'statusCode': 202}
    }
    return /* { 'message': 'Admin creation limit has been reached' }*/{'statusCode': 202}
}


module.exports = {adminLoginInfo, createAdminInfo}
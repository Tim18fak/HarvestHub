const {Admin} = require('../../../Model/DB_structure')
const  bcrypt = require('bcrypt')
const crypto = require('crypto')

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
const compareActivationCode = (code1,code2) => {
    if(code1 !== code2){
        return false
    }
    return true
}
const createAdminInfo = async(arg) => {
    try {
        const {username,password,email,activationCode,secondActivationCode} = arg
        const adminCreationLimit = 3
        const adminNumber = await Admin.countDocuments()
        console.log(adminNumber)
        adminNumber > adminCreationLimit ? console.log('admin creation limit is reached') : console.log('admin creation limit has not been reached');
        const validActivationCode = await compareActivationCode(activationCode,secondActivationCode)
        !validActivationCode ? console.log('invalid') : console.log('valid');
        const adminExist = await Admin.findOne({'email': email})
        adminExist ? console.log('email has been used') : console.log('email has not been used');

        /*  */
        const adminId = crypto.randomBytes(16).toString('hex');
        const adminHashedPassword = await bcrypt.hash(password, 15);
        const admin = await Admin({

        })
    /* return {username,password,email,activationCode,secondActivationCode} */
    } catch (error) {
        
        
    }
}


module.exports = {adminLoginInfo, createAdminInfo}
const {adminLoginInfo, createAdminInfo,activationCode,resetPass} = require('./constants/admin')


const adminLogin = async(req,res) => {
const response = await adminLoginInfo(req.body)
console.log(response)
switch(response.statusCode){
    case 404:
        res.status(404).json({'messsage': 'Admin Account Not Found'})
            break;
    case 401:
        res.status(401).json({'messsage': 'Admin Account Activation Code Not Verified'})
        break;
    case 403:
        res.status(403).json({'message': 'Invalid Password'})
        break;
    case 202: 
        res.status(202).json({'message': 'Login Successful'},response._id,response.username,response.AdminId)
}
    
}

const createAdmin = async(req,res)  => {
    await createAdminInfo(req.body,res)
}

const compareActivation = async(req,res) => {
    const adminId = req.query.adminId
    console.log(adminId)
    await activationCode(req,adminId,res)
}
const adminReset = async(req,res) => {
    const email = req.body.email
    const response = resetPass(email)

}
module.exports = {adminLogin, createAdmin,compareActivation,adminReset}
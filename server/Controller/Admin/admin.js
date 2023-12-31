const { adminAccessToken } = require('../../middlewares/admin_authorization')
const {adminLoginInfo, createAdminInfo,activationCode,resetPass} = require('../../src/services/Admin_Authentication_Logic/admin')


const adminLogin = async(req,res) => {
const response = await adminLoginInfo(req.body)
try {
    switch(response.statusCode){
        case 404:
            res.status(404).json({'message': 'Admin Account Not Found'})
                break;
        case 401:
            res.status(401).json({'message': 'Admin Account Activation Code Not Verified'})
            break;
        case 403:
            res.status(403).json({'message': 'Invalid Password Or Username'})
            break;
        case 202:
            const {_id,username,adminId} = response
            const adminToken = await adminAccessToken(response._id,response.username,response.adminId,response.email)
            res.status(202).json({'message': 'Login Successful',adminToken,_id,username,adminId})
    }
} catch (error) {
    console.log(error.message)
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
    resetPass(email,res)

}
module.exports = {adminLogin, createAdmin,compareActivation,adminReset}
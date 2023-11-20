const { Admin } = require("../Model/DB_structure")
const { jwt } = require("../config/jwt.config")
const adminAccessToken = async(id,username,AdminId,email) => {
    const accessTokenPayload = {
        id,username,AdminId,email 
    }
    const accessToken = jwt.sign(accessTokenPayload,process.env.Admin_Authorization_Secret)
    const AdminAuthToken = await Admin.findById(id)

    AdminAuthToken.authorizationToken = accessToken;

    await AdminAuthToken.save()
    
    return accessToken
}
module.exports = {adminAccessToken}
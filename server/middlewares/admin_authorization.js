const { jwt } = require("../config/jwt.config")

const adminAccessToken = (id,username,AdminId,email) => {
    const accessTokenPayload = {
        id,username,AdminId,email 
    }
    const accessToken = jwt.sign(accessTokenPayload,process.env.Admin_Authorization_Secret)
    return accessToken
}
module.exports = {adminAccessToken}
const { jwt } = require("../config/jwt.config")

const authenticateAdminToken = async(req,res,next) => {
jwt.verify('htit',process.env.Admin_Authorization_Secret)

}

const authenticateClientToken = async(req,res,next) => {
    jwt.verify('',process.env.Client_Authorization_Secret)
}
module.exports = {authenticateAdminToken,authenticateClientToken} 
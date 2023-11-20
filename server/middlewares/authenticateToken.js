const { jwt } = require("../config/jwt.config")

const authenticateAdminToken = async(req,res,next) => {
jwt.verify('htit',process.env.Admin_Authorization_Secret,(err,data) =>{

})

}

const authenticateClientToken = async(req,res,next) => {
    jwt.verify('',process.env.Client_Authorization_Secret,(err,data)=>{
        
    })
}
module.exports = {authenticateAdminToken,authenticateClientToken} 
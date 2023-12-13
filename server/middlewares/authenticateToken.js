const { Admin,Farmer } = require("../Model/DB_structure")
const { jwt } = require("../config/jwt.config")

const authenticateAdminToken = async(req,res,next) => {
    try {
        const authHeader = req.headers['authorization']
    const id =  req.params.Id
    const authHeaderToken =  authHeader && authHeader.split(' ')[1]
    if(authHeaderToken === undefined){
        return  res.status(401)
    }
jwt.verify(authHeaderToken,process.env.Admin_Authorization_Secret,async (err,data) =>{
    if(err) return res.status(403).json({'messsage':'Your AuthToken is Was Not Signed By HarvestHub'})
    const admin = await Admin.findById(id)
    console.log(admin)
    if(admin.authorizationToken !== authHeaderToken) return res.status(401).json({'message':'Please Logout and Login Again'})
    req.authorizate = true
    next()
})
    } catch (error) {
        console.log(error.message)
    }
}

const authenticate =() => {

}


const authenticateFarmerToken = async(req,res,next) => {
    try {
        const farmerHeader = req.headers['authorization']
    const id =  req.params.Id
    const farmerHeaderToken =  farmerHeader && farmerHeader.split(' ')[1]
    if(farmerHeaderToken === undefined){
        return  res.status(401)
    }
jwt.verify(farmerHeaderToken,process.env.Client_Authorization_Secret,async (err,data) =>{
    if(err) return res.status(403).json({'messsage':'Your AuthToken is Was Not Signed By HarvestHub'})
    const farmer = await Farmer.findById(id)
    if(farmer.authorizationToken !== farmerHeaderToken) return res.status(401).json({'message':'Please Logout and Login Again'})
    req.authorizate = true
    next()
})
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {authenticateAdminToken,authenticateFarmerToken,authenticate} 
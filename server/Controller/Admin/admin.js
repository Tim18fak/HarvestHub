const {adminLoginInfo, createAdminInfo} = require('./constants/admin')


const adminLogin = async(req,res) => {
const response = await adminLoginInfo(req.body)
switch(response.statusCode){
    case 403: 
    res.status(403).json({'message': 'User not found'})
    break;
    case 401: 
    res.status(401).json({'message': 'Incorrect password'})
    break;
    case 200: 
    res.status(200).json({'message': 'Incorrect password'},response._id,response.username)

}
    
}

const createAdmin = async(req,res)  => {
    const response = await createAdminInfo(req.body)
    
   /*  switch(response){
        case 200: 
        res.status(202).json({'message': 'Admin has been created'})
        break;
        default: 
        res.status(202).json({'message': 'Unknown'})
    } */
}

const test = async(req,res) => {
    res.send('admin')
}
module.exports = {adminLogin, createAdmin,test}
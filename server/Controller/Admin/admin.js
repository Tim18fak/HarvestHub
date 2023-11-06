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

const createAdmin = async()  => {
    const response = await createAdminInfo(req.body)
    const {statusCode} = response
    switch(statusCode){
        case 200: 
        res.status(202).json({'message': 'Admin has been created'})
        break;
        case 403:
        res.status(202).json({'message': 'Admin has been created'})
        break;
        default: 
        res.status(202).json({'message': 'Unknown'})
    }
}


module.exports = {adminLogin, createAdmin}
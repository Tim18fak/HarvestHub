const { User, Farmer } = require("../Model/DB_structure");
const { jwt } = require("../config/jwt.config");

const clientAuthToken = async(_id,username,email,isFarmer) => {
    const clientAccessPayload = {
        _id,username,email,isFarmer
    }
    console.log(isFarmer)
    const clientToken =  isFarmer ? await Farmer.findById(_id) : await User.findById(_id)
    const accessToken = jwt.sign(clientAccessPayload,process.env.Client_Authorization_Secret)
    clientToken.authorizationToken =  accessToken;
    await clientToken.save()
    return accessToken;
}

module.exports ={clientAuthToken}
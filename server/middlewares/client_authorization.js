const { jwt } = require("../config/jwt.config");

const clientAuthToken = (_id,username,email) => {
    const clientAccessPayload = {
        _id,username,email
    }
    const accessToken = jwt.sign(clientAccessPayload,process.env.Client_Authorization_Secret)
    return accessToken;
}

module.exports ={clientAuthToken}
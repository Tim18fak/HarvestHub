const {signUp,clientLogin,clientActivationCode,clientResetPass} = require('../src/services/Client_Authentication_Logic/auth.js')

const activationCode = () => {
    const min = 1000
    const max = 9999
    const code = Math.floor(Math.random() * (max - min) + 1000)
    return code
}
/* Sign Up algorithm */
const signup = async(req,res) => {
  const Ip =  req.ip;
  signUp(req.body,Ip,res)
}

/* Login algorithm */
const login = async(req,res) => {
  const clientId =  req.query.clientId
  clientLogin(req.body,clientId,res)
}
const reset = async(req,res) => {
  clientResetPass(req.body,res)
}
const compareActivationCode = async(req,res) => {
  const clientId =  req.query.clientId
  clientActivationCode(req.body,res,clientId)
}
/* Activation code Algorithm */
const code = (res) => {
    res.json(activationCode());
}
module.exports = { signup, login, reset,code,compareActivationCode}
const { User, Farmer } = require('../Model/DB_structure.js')
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
const code = (req,res) => {
    res.json(activationCode());
}
const Found__Username = async(req,res) => {
  const {u,tr} = req.params;
  console.log(req.params)
  if(tr === "Farmer"){
    console.log('tr')
  }else{
    console.log('false')
  }
  const user = tr === 'Farmer' ? await Farmer.findOne({username: u}) : await User.findOne({username: u})
  if(user === null){
    return res.sendStatus(200)
  }
  res.sendStatus(403)
} 
module.exports = { signup, login, reset,code,compareActivationCode,Found__Username}
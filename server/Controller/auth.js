
const {User} = require('../Model/DB_structure')

const activationCode = () => {
    const min = 1000
    const max = 9999
    const code = Math.floor(Math.random() * (max - min) + 1000)
    return code
    console.log(code)
}
////////////

const activationCodeCompare = (code,Code) => {
    if(code !== Code)
     return false;
}
const signup = (req,res) => {
   try {
    const {fullname,
        username,
        email,
        password,
        confirmpassword,
        code,
        Code} = req.body 
    
        if(activationCodeCompare(code, Code)){
            throw new TypeError('Invalid activation code','The activation code provided is not valid. Please check and try again.')
        }



   } catch (error) {
    res.status(400).json({ 'error': error.message });
   }


}
const login = () => {

}
const reset = () => {

}
const code = (req,res) => {

    res.json(activationCode());
}
module.exports = { signup, login, reset,code}
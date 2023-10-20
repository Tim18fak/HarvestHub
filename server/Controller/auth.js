
const {User} = require('../Model/DB_structure')

const activationCode = () => {
    const min = 1000
    const max = 9999
    const code = Math.floor(Math.random() * (max - min) + 1000)
    return code
    console.log(code)
}

const signup = (req,res) => {
   const {fullname,
        username,
        email,
        password,
        confirmpassword,
        code,
        Code} = req.body 
    console.log({fullname,
        username,
        email,
        password,
        confirmpassword,
        code,
        Code})
        if(Code !== code){
            res.status(400).json({ error: 'Invalid activation code', message: 'The activation code provided is not valid. Please check and try again.' });
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
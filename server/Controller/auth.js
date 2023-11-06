const crypto = require('crypto')
const  bcrypt = require('bcrypt')
const { BlockedUser, User, Farmer } = require('../Model/DB_structure.js')
const { activationCodeCompare, blockUser ,checkUserExists} = require('../constants/auth.js')



const activationCode = () => {
    const min = 1000
    const max = 9999
    const code = Math.floor(Math.random() * (max - min) + 1000)
    return code
    console.log(code)
}
////////////
const signup = async (req, res) => {
    try {
       const { fullname, username, email, password, code, Code, isFarmer } = req.body;
        const Ip = req.ip
        console.log(Ip)
       console.log({ fullname, username, email, password, code, Code, isFarmer });
 
       const userId = crypto.randomBytes(16).toString('hex');
       const hashedPassword = await bcrypt.hash(password, 10);
 
       if(activationCodeCompare(code, Code)) {
          // Invalid activation code
          /* res.status(400).send({ 'error': 'Invalid activation code' }); */
          throw new TypeError('Invalid')
       }
 
       const block = await blockUser(username, email, Ip);
       if (block) {
        // Username and Email have been blocked
        /* res.send('Username and Email or Ip have been blocked'); */
          throw new Error('Banned')
       }
 
       const existUser = await checkUserExists(username, email, isFarmer);
       if (existUser) {
          // Username or email already exists
          /* res.send('Username or email already exists'); */
            throw new Error('Exist')
       }
       const user =  isFarmer ? new Farmer({
        username,
        email,
        fullname,
        hashedPassword,
        Code,
        Ip}) : new User({
          username,
          email,
          fullname,
          hashedPassword,
          Code,
          Ip
          /* email,
          fullname,
          hashedPassword,
          phoneNumber, */
       });
 
       await user.save();
 
       res.status(200).json({ username, fullname});
    } catch (error) {
        switch(error.message){
            case 'Exist':
                res.status(403).json({'message': 'Username or email already exists'});
                break;
            case "Invalid": 
                res.status(403).json({'message':'Invalid activation code'});
                break;
            case "Banned": 
                res.status(401).json({'message': 'Username and Email or Ip have been blocked'});
                break;
            default: 
                res.send(error.message)
               
        }
    }
 };
 
const login = async(req,res) => {

    try {
        const { username, password,farmer } = req.body;
        console.log(username, password)
        if(!farmer){

        const user = await User.findOne({ username });
        console.log(user)
        if (!user) return res.status(404).json({ 'message': 'User not found' });

        const success = await bcrypt.compare(password, user.hashedPassword);

        if (!success) {
         return res.status(400).json({ 'message': 'Incorrect password' });   
        }
        if(user){
            const {fullname, _id, username} = user
            res.status(200).json({ 'message': {'username': username,
            'fullname': fullname,
            '_id': _id}}) 
        }
    }

    const user = await Farmer.findOne({ username });
        console.log(user)
        if (!user) return res.status(404).json({ 'message': 'User not found' });

        const success = await bcrypt.compare(password, user.hashedPassword);

        if (!success) {
         return res.status(400).json({ 'message': 'Incorrect password' });   
        }
        if(user){
            const {fullname, _id, username} = user
            res.status(200).json({ 'message': {'username': username,
            'fullname': fullname,
            '_id': _id}}) 
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }

}
const reset = async(req,res) => {
    try {
        const resetPassword = []
        const letterArray = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    let min = 0
    let max = letterArray.length
    for(let i = 0; i < 20; i++){
      const num = Math.floor(Math.random() * (max - min))
      resetPassword.push(letterArray[num])
    }

        const {email, farmer} = req.body;
        const user = farmer ? await Farmer.findOne({ email }) : await User.findOne({ email }); 
        if(user === null)
            throw new Error('Email')

    const resetPasswordString = resetPassword.join('');

    const resetHashedPassword = await bcrypt.hash(resetPasswordString, 10)
    console.log(resetPasswordString)
    user.hashedPassword = resetHashedPassword;

    await user.save();

    res.status(200).json({'message': `Reset Password has been sent to your email`},{resetHashedPassword})
    console.log('Password updated successfully');
console.log('code' + resetPasswordString)
    } catch (error) {
        console.log(error)
        switch(error.message){
            case 'Email':
                res.status(400).json({'message': 'Email does not Exist'})
                break;
            default: 
                console.log(error.message)
        }

        
    }


}
const code = (req,res) => {

    res.json(activationCode());
}
module.exports = { signup, login, reset,code}
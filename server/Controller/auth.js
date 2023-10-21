const crypto = require('crypto')
const  bcrypt = require('bcrypt')
const { BlockedUser, User } = require('../Model/DB_structure.js')
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
       const { fullname, username, email, password, code, Code } = req.body;
        const Ip = req.ip
        console.log(Ip)
       console.log({ fullname, username, email, password, code, Code });
 
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
 
       const existUser = await checkUserExists(username, email);
       if (existUser) {
          // Username or email already exists
          /* res.send('Username or email already exists'); */
            throw new Error('Exist')
       }
 
       const user = new User({
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
 
       res.status(200).json({ username, userId, fullname});
       res.send('Sign Up completed')
    } catch (error) {
        switch(error.message){
            case 'Exist':
                res.send('Username or email already exists');
                break;
            case "Invalid": 
                res.send('Invalid activation code');
                break;
            case "Banned": 
                res.send('Username and Email or Ip have been blocked');
                break;
            default: 
                res.send(error.message)
               
        }
    }
 };
 
const login = async(req,res) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, user.hashedPassword);

        if (success) {
            res.status(200).json({ fullName: user.fullName, username, userId: user._id.toString() });
        } else {
            res.send({ 'message': 'Incorrect password' });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }

}
const reset = () => {

}
const code = (req,res) => {

    res.json(activationCode());
}
module.exports = { signup, login, reset,code}
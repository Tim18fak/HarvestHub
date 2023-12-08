const express = require('express');
const { signup, login, reset, code, compareActivationCode,Found__Username} = require('../Controller/auth');
const { Farmer, User } = require('../Model/DB_structure');
const bcrypt =  require('bcrypt');
const { uploadProfileImage } = require('../Controller/Farmers/constants/uploadImages');
const router = express.Router();

router.get('/code',code)
router.post('/signup', signup); // Corrected the path here
router.post('/login', login);
router.post('/reset', reset);
router.post('/activation',compareActivationCode);
/* fS  means Find Username
:u means username
:tr means true if the user is a farmer*/
router.get('/fS/:u/:tr',Found__Username)
router.get('/uD/:Id/:isFarmer',async(req,res) => {
    const {Id,isFarmer} = req.params;
    console.log(typeof isFarmer)
    if(isFarmer === 'true'){
        const userData = await Farmer.findById(Id)
        if(userData){
           return res.send(userData)
        }
    }else if(isFarmer === 'false'){
        const userData = await User.findById(Id)
        if(userData){
            return res.send(userData)
        }
    }
    
})
router.put('/uP/:userID/:isFarmer',async(req,res)=> {
   try {
    const {userID,isFarmer} = req.params;
    const userData =  isFarmer === 'true' ? await Farmer.findById(userID) : await User.findById(userID);
    if(!userData){
        return 
    }
    userData.fullname = req.body.fullname ? req.body.fullname: userData.fullname;
    userData.username = req.body.username ? req.body.username: userData.username;
    userData.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber: userData.phoneNumber;
    userData.email =  req.body.email ? req.body.email : userData.email;
    userData.NIN =  req.body.NIN ? req.body.NIN :userData.NIN;
    userData.address = req.body.address ? req.body.address: userData.address;
    userData.hashedPassword = req.body.password ? await bcrypt.hash(req.body.password,15):  userData.hashedPassword;
    userData.profileImage = req.body.profileImage ? await uploadProfileImage(req.body.profileImage,isFarmer): userData.profileImage;


    await userData.save()
    res.sendStatus(200)
    console.log('updated')
    
   } catch (error) {
    
   }
    
})
module.exports = router; 
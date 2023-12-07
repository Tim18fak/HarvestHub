const express = require('express');
const { signup, login, reset, code, compareActivationCode,Found__Username} = require('../Controller/auth');
const { Farmer, User } = require('../Model/DB_structure');
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
           delete userData.hashedPassword,
           delete userData.authorizationToken
        }
    }else if(isFarmer === 'false'){
        const userData = await User.findById(Id)
        if(userData){
            const modifiedData = await removeImportantData(userData,'hashedPassword', 'authorizationToken')
            console.log(modifiedData)
        }
    }
    
})
module.exports = router; 


const removeImportantData = (mainData,...dataToBeRemoved) => {
    dataToBeRemoved.forEach(removeData => delete mainData[removeData])
    return mainData
}
const { User, BlockedUser, Farmer} = require('../../../Model/DB_structure');
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { clientAuthToken } = require('../../../middlewares/client_authorization');
const { axios } = require('../../../config/axios.config');


////////  authentication code analysis
const sendResetPassword = async(email,new_password,res) => {
  const html = `${new_password}`

  const transporter = nodemailer.createTransport({
    service: process.env.EmailService,
    host: process.env.EmailHost,
    port: process.env.EmailServicePort,
    secure: false,
    auth: {
      user: process.env.HarvestHubGmail,
      pass: process.env.App_password,
    },
  });

  const sendInfo = {
    from: `"HarvestHub 👻"` + process.env.HarvestHubGmail,
    to: email,
    subject: `Your Reset Password`,
    text: 'Hello world?',
    html: html,
  };
  sendResetPasswordEmail(transporter,res,sendInfo)
}
/* Reset Password */
const resetPasswordCharacter = () => {
  const resetPassword = []
  const letterArray = [
'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
'!','@','#','$','<','>','+','=',':','~','*','&','^','%','$','&','*','#','@','!','$','%','^','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9','0'
]
let min = 0
let max = letterArray.length
for(let i = 0; i < 20; i++){
const num = Math.floor(Math.random() * (max - min))
resetPassword.push(letterArray[num])
}
const resetPasswordString = resetPassword.join('');
return resetPasswordString;
}
/*  */
const sendActivationCode = async (email, username, id, res, isFarmer) => {
  try {
    const response = await axios.get('http://localhost/auth/code');
    if (response.status >= 200 && response.status < 300) {
      const html = `
        <!-- Your HTML content -->
      `;

      const transporter = nodemailer.createTransport({
        service: process.env.EmailService,
        host: process.env.EmailHost,
        port: process.env.EmailServicePort,
        secure: false,
        auth: {
          user: process.env.HarvestHubGmail,
          pass: process.env.App_password,
        },
      });

      const sendInfo = {
        from: `"HarvestHub 👻"` + process.env.HarvestHubGmail,
        to: email,
        subject: `Your Code`,
        text: 'Hello world?',
        html: html,
      };

      sendEmail(transporter, sendInfo, res, response.data, id, isFarmer);
    } else {
      throw new Error(`Failed to fetch the activation code. Status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};
/* Send reset Password */
const sendResetPasswordEmail = async(transporter,res,sendInfo) => {
  try {
    await transporter.sendMail(sendInfo)
    res.status(200).json({'message': 'Your Temporary Password Has Been Sent'})
      
  } catch (error) {
    console.log(error)
  }
}
const sendEmail = async (transporter, sendInfo, res, activationCode, id, isFarmer) => {
  try {
    await transporter.sendMail(sendInfo);
    console.log('email sent successfully');
    console.log(id);
    const client = isFarmer ? await Farmer.findOne({ _id: id }) : await User.findOne({ _id: id });
    client.activationCode = activationCode;
    client.save()
      .then((data) => {
        const {fullname,username,Id} = data;
        res.status(200).json({ 'message': 'Your account has been created',id,fullname,username,Id});
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(client);
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (arg, ip, res) => {
  const { fullname, username, email, password, isFarmer } = arg;
  const blockUser = await BlockedUser.findOne({ $or: [{ username }, { email }, { ip }] });
  const user = isFarmer ? await Farmer.findOne({$or : [{ email },{username}] }) : await User.findOne({$or : [{ email },{username}] });

  if (blockUser) {
    return res.status(403).json({ 'message': 'Either email or IP has been banned' });
  }
  if (user) {
    return res.status(400).json({ 'message': 'Email has been used already' });
  }

  const Id = crypto.randomBytes(16).toString('hex');
  const newHashedPassword = await bcrypt.hash(password, 10);
  const newUser = isFarmer ? new Farmer({
    Id,
    fullname,
    username,
    Ip: ip,
    email,
    isFarmer,
    hashedPassword: newHashedPassword,
    activationCodeStatus: 'Pending',
  }) : new User({
    Id,
    fullname,
    username,
    Ip: ip,
    email,
    isFarmer,
    hashedPassword: newHashedPassword,
    activationCodeStatus: 'Pending',
  });

  newUser.save()
    .then(async (data) => {
      sendActivationCode(data.email, data.username, data._id, res, isFarmer);
    })
    .catch((err) => {
      console.log(err);
    });
};


const clientLogin = async(body,id,res) =>{
  const {email,password} = body;
  console.log(email,password)
  const farmer = await Farmer.findOne({email: email})
  const consumer = await User.findOne({email:email});
  if(!farmer && !consumer){
    return res.status(403).json({'message': 'Account Not Found'})
  }
  if(farmer){
    if(farmer.activationCodeStatus === 'Pending'){
      return res.status(403).json({'message': 'Account Has Not Been Verified'})
    }
    const validPass = await bcrypt.compare(password,farmer.hashedPassword)
    if(!validPass){
      return res.status(403).json({'message': 'Invalid Password'})
    }
    const {isFarmer,_id,username,email} =  farmer
    const accessToken = await clientAuthToken(_id,username,email,isFarmer)

    return res.status(200).json({accessToken,isFarmer,_id,username})
    
  }

  if(consumer){
    if(consumer.activationCodeStatus === 'Pending'){
      return res.status(403).json({'message': 'Account Has Not Been Verified'})
    }
    const validPass = await bcrypt.compare(password,consumer.hashedPassword)
    if(!validPass){
      return res.status(403).json({'message': 'Invalid Password'})
    }
    const {isFarmer,_id,username,email} = consumer
    const accessToken = await clientAuthToken(_id,username,email,isFarmer)

    return res.status(200).json({accessToken,isFarmer,_id,username})
  }

}
const clientActivationCode = async(body,res,Id) => {
  try {
    const code = body.code;
    console.log(Id)
  const farmerVerificationCode  =  await Farmer.findOne({_id: Id});
  const consumerVerificationCode = await User.findOne({_id:Id});
  /* If id is not found */
  if(!farmerVerificationCode && !consumerVerificationCode){
    return console.log('Account Not Found')
  }
  /*  */
  if(farmerVerificationCode){
    if(code  !== farmerVerificationCode.activationCode){
      return res.status(403).json({'message': 'Invalid Activation Code'})
    }
    farmerVerificationCode.activationCodeStatus = 'Fulfilled';
      await farmerVerificationCode.save();
      return res.status(202).json({'message': 'Valid Activation Code'})
  }
  /*  */
  if(consumerVerificationCode){
    if(code !== consumerVerificationCode.activationCode){
      return res.status(403).json({'message': 'Invalid Activation code'})
    }
    consumerVerificationCode.activationCodeStatus =  'Fulfilled'
      await consumerVerificationCode.save();
      return res.status(202).json({'message': 'Valid Activation code'})
  }
  } catch (error) {
    console.log(error.message)
  }
}
const clientResetPass = async(body,res) => {
 try {
  const email = body.email;
  const isFarmer = body.isFarmer;
  const userAccount =  isFarmer ? await Farmer.findOne({email: email}) 
  :
   await User.findOne({email:email});
   const new_password = resetPasswordCharacter();
   console.log(new_password)
   const newHashPassword = await bcrypt.hash(new_password,15)
   if(!userAccount){
    throw new Error('Account Not Found')
   }
   userAccount.hashedPassword = newHashPassword;
   userAccount.save()
   .then((data) => {
    sendResetPassword(email,new_password,res)
    console.log(data.hashedPassword)
   })
   .catch((err) => {

   })
 } catch (error) {
  console.log(error)
 }

}
module.exports = { signUp,clientLogin,clientActivationCode,clientResetPass};

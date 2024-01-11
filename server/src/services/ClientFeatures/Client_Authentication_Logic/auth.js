const { User, BlockedUser, Farmer} = require('../../../../Model/DB_structure');
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { clientAuthToken } = require('../../../../middlewares/client_authorization');
const { axios } = require('../../../../config/axios.config');
const { constants } = require('fs');
const { uploadImages, uploadProfileImage } = require('../../../../Controller/Farmers/constants/uploadImages');


////////  authentication code analysis
const sendResetPassword = async(email,new_password,res) => {
  const html = `  
  <!DOCTYPE html>
<html lang="en" >
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Document</title>
 <style>
  *{
   margin: 0;
   padding: 0;
   box-sizing: border-box;
  }
  nav{
   padding: 3rem;
   background-color: green;
   color: white;
  }
  section{
   padding: 2rem ;
  }
  section p{
   padding: .5rem 1rem;
  }
  footer{
   display: flex;
   justify-content: space-between;
   padding: 2rem .5rem ;
   background-color: rgb(2, 100, 2);
   color: white;
   align-items: center;
  }
 </style>
</head>
<body >
 <nav>
    <img src="https://t4.ftcdn.net/jpg/03/77/78/75/240_F_377787568_q9ElOtXZQnwNjyJ0W3o0La7E84gH8jPp.jpg" alt="">
    <h2>Reset Your Password</h2>
 </nav>
 <section>
  <p>Hello </p>
  <p>Your request to change your password. <br>We have sent you a temporary password in response to your request </p>
 <p>This is your temporary password <span><b>${new_password}</b></span></p>
 <strong>Do not share the password with anyone</strong>
 </section>
 <footer>
  <main >
   <h4>Contact</h4>
   <p><a href="#">Phone</a></p>
   <p><b>Mail:</b>harvestHub@gmail.com</p>
   <p><b>Location</b>3,iju-street,Lagos-Nigeria</p>
  </main>
  <p>Company @ All Right Reserved </p>
 </footer>
</body>
</html>`

  const transporter = nodemailer.createTransport({
    service: process.env.EmailService,
    host: process.env.EmailHost,
    port: process.env.Emairt,
    secure: false,
    auth: {
      user: process.env.HarvestHubGmail,
      pass: process.env.App_password,
    },
  });

  const sendInfo = {
    from: `"HarvestHub"` + process.env.HarvestHubGmail,
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
const sendActivationCode = async (email,activationCode, res,_id,isFarmer) => {
  try {
    if (activationCode) {
      const html = `
      <!DOCTYPE html>
<html lang="en" >
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Document</title>
 <style>
  *{
   margin: 0;
   padding: 0;
   box-sizing: border-box;
  }
  body{
   text-align: center;
  }
  nav{
   padding: 3rem;
   background-color: rgba(0, 128, 0, 0.39);
   color: white;
   display: flex;
   justify-content: center;
  }
.code{
   padding: .5rem 2rem;
  }


  section p{
   padding: .5rem 1rem;
  }
  footer{
   display: flex;
   justify-content: space-between;
   padding: 2rem .5rem ;
   background-color: rgb(2, 100, 2);
   color: white;
   align-items: center;
  }
 </style>
</head>
<body >
 <nav>
    <img src="https://cdn.templates.unlayer.com/assets/1701676201199-password.png" alt="">
 </nav>
 <section class="code">
  <h2>Your One-Time Code</h2>
  <p style="padding: 1rem 2rem;border: 3px solid;display: inline-block;margin: .5rem;">${activationCode}</p>
 </section>
 <section>
  <p>Please verify you're really you <br> by entering this code to activate your account</p>
 <strong>Do not share this code with anyone</strong>
 </section>
</body>
</html>
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

      sendEmail(transporter, sendInfo, res,_id,isFarmer);
    } else {
      throw new Error(`ActivationCode is null or Undefined. Status`);
    }
  } catch (error) {
    console.log(error);
  }
};
/* Send reset Password */
const sendResetPasswordEmail = async(transporter,res,sendInfo,) => {
  try {
    await transporter.sendMail(sendInfo)
    res.status(200).json({'message': 'Your Temporary Password Has Been Sent'})
      
  } catch (error) {
    console.log(error)
  }
}
const sendEmail = async (transporter, sendInfo, res,_id,isFarmer) => {
  try {
    await transporter.sendMail(sendInfo);
    console.log('email sent successfully');
    return res.status(200).json({_id,isFarmer})
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (arg, ip, res) => {
  try {
    const { fullname, username, email, password, isFarmer, extraInfo } = arg;
    const {profileImage,phoneNumber,address,nationalId} = extraInfo;
  const blockUser = await BlockedUser.findOne({ $or: [{ username }, { email }, { ip }] });
  const user = isFarmer ? await Farmer.findOne({$or : [{ email },{username}] }) : await User.findOne({$or : [{ email },{username}] });
  console.log(isFarmer)
  if (blockUser) {
    return res.status(403).json({ 'message': 'Either email or IP has been banned' });
  }
  if (user) {
    console.log('Email and Username has been used already')
    return res.status(400).json({ 'message': 'Email and Username has been used already' });
  }

  const Id = crypto.randomBytes(16).toString('hex');
  const response = await axios.get('http://localhost/auth/code');
  const imageUrl =  await uploadProfileImage(profileImage,isFarmer)
  const activationCode = response.data
  console.log(activationCode)
  const newHashedPassword = await bcrypt.hash(password, 10);
  const newUser = isFarmer ? new Farmer({
    /* Personal Information  */
    Id,
    fullname,
    username,
    Ip: ip,
    activationCode: activationCode,
    email,
    isFarmer,
    hashedPassword: newHashedPassword,
    NIN: nationalId,
    address: address,
    phoneNumber: phoneNumber,
    driverLicence: extraInfo.driverLicence ? extraInfo.driverLicence : '',
    profileImage: imageUrl,
    /* Farm info */
    farmType: extraInfo.type,
    farm_Address: extraInfo.location,
    farmingExperience: extraInfo.farmingExperience,
    /* Verification */
    verificationStatus: 'Pending',
    activationCodeStatus: 'Pending',
    /* Others */
    comeAbout: extraInfo.comeabout ? extraInfo.comeabout: '',
  }) : new User({
    Id,
    fullname,
    username,
    activationCode: activationCode,
    Ip: ip,
    email,
    isFarmer,
    hashedPassword: newHashedPassword,
    NIN: nationalId,
    address: address,
    phoneNumber: phoneNumber,
    profileImage: imageUrl,

    /* Verification */
    activationCodeStatus: 'Pending',
    verificationStatus: 'Pending',

    /* Others */
    comeAbout: extraInfo.comeabout ? extraInfo.comeabout: '',
  });

  newUser.save()
    .then(async (data) => {
      sendActivationCode(data.email,data.activationCode, res, data._id,data.isFarmer);
      console.log(data.activationCode)
    })
    .catch((err) => {
      console.log(err);
    });
  } catch (error) {
    console.log(error.message)
  }
};


const clientLogin = async(body,id,res) =>{
  try{
    const {email,password,username,isFarmer} = body;
  console.log(body)
  const clientLogin = isFarmer ? await Farmer.findOne({email: email}) : await User.findOne({email: email});
  console.log(clientLogin)
  if(!clientLogin){
    return res.status(403).json({'message': 'Account Not Found'})
  }
  if(clientLogin.activationCodeStatus === 'Pendind'){
    return res.status(403).json({'message': 'Account Has Not Been Verified'})
  }
  const clientValidPass = await bcrypt.compare(password,clientLogin.hashedPassword)
  if(!clientValidPass){
    return res.status(403).json({'message': 'Invalid Password'})
  }
  const {_id} =  clientLogin
  const accessToken = await clientAuthToken(_id,username,email,isFarmer)
  return res.status(200).json({accessToken,isFarmer,_id,username})
  /* hh */
  }
  catch(err){

  }

 
  }
const clientActivationCode = async(body,res,Id) => {
  try {
    /* to covert a string to number use Number(body.code) or parseInt() */
    const code = parseInt(body.code,10);
    console.log(code)
    const isFarmer = body.isFarmer;
    console.log(Id)

    const newClientAccountActivation = isFarmer ? await Farmer.findOne({_id:Id}) : await User.findOne({_id:Id})
    if(!newClientAccountActivation){
      return console.log('Account Not Found')
    }
    console.log(newClientAccountActivation)
    console.log(typeof code)
      if(code !== newClientAccountActivation.activationCode){
      console.log('invalid')
      return res.status(403).json({'message': 'Invalid ActivationCode'})
    }else{
      newClientAccountActivation.activationCodeStatus = 'fulfilled';
      await newClientAccountActivation.save()
      console.log('activation code successful')
      return res.status(200).json({'message': 'successful'})
    }
  } catch (error) {
    console.log(error.message)
  }
}
const clientResetPass = async (body, res) => {
  try {
    const email = body.email;
    const isFarmer = body.isFarmer;

    const userAccount = isFarmer ? await Farmer.findOne({ email: email }) : await User.findOne({ email: email });

    if (!userAccount) {
      throw new Error('Account Not Found');
    }

    // Generate a new password
    const new_password = resetPasswordCharacter();
    console.log(new_password)
    const newHashPassword = await bcrypt.hash(new_password, 15);

    // Update hashedPassword
    userAccount.hashedPassword = newHashPassword;

    // Save the updated userAccount
    await userAccount.save();

    // Send the updated userAccount or a success response to the client
    sendResetPassword(email, new_password, res);
  } catch (error) {
    // Log or handle errors
    console.error('Error in clientResetPass:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signUp,clientLogin,clientActivationCode,clientResetPass};

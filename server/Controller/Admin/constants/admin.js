const {Admin} = require('../../../Model/DB_structure')
const  bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const SendEmailFunction = require('../../../Email_Mechanism/Email')
const {UserInfo,confirmActivationCode} = require('../../../Email_Mechanism/email_Message')
const axios = require('axios')
const { throws } = require('assert')


const adminLoginInfo = async(arg) => {
const {username,email,password} = arg
const adminResponse = await Admin.findOne({email})
if(!adminResponse) return /* { 'message': 'User not found' } */ {'statusCode': 403}
const success = await bcrypt.compare(password, adminResponse.hashedPassword);
if (!success) {
    return /* { 'message': 'Incorrect password' }; */  {'statusCode':401}  
   }
if(adminResponse){
    const {_id, username} = adminResponse;
    return {username, _id}

}
}
const sendActivationCode = async(email,username,id) => {
    try {
        const response = await axios.get('http://localhost/auth/code');
        if (response.status >= 200 && response.status < 300) {


const html = `
<!DOCTYPE html>
<html>
<head>
    <title>HarvestHub Activation Code</title>
</head>
<body>
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5">
        <tr>
            <td>
                <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; font-family: Arial, sans-serif; border: 1px solid #e2e2e2;">
                    <tr>
                        <td>
                            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="background-color: #007BFF; color: #ffffff;">
                                <tr>
                                    <td height="30">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-size: 24px;">HarvestHub Activation</td>
                                </tr>
                                <tr>
                                    <td height="30">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="padding: 20px;">
                                <tr>
                                    <td>
                                        <p>Hello,${username}</p>
                                        <p>Thank you for signing up for HarvestHub. To activate your account, please use the following activation code:</p>
                                        <p style="font-size: 24px; text-align: center; color: #007BFF;">${response.data}</p>
                                        <p>If you did not sign up for HarvestHub, please ignore this email.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table align="center" cellpadding="0" cellspacing="0" width="100%" style="background-color: #007BFF; color: #ffffff;">
                                <tr>
                                    <td height="30">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center">© 2023 HarvestHub. All rights reserved HarvestHub.</td>
                                </tr>
                                <tr>
                                    <td height="30">&nbsp;</td>`
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.HarvestHubGmail,
      pass: process.env.App_password,
    },
  });

  const sendInfo = {
    from: `"HarvestHub 👻"`+ process.env.HarvestHubGmail, // sender address
    to: email, // list of receivers
    subject: `<h2 style=' co'>Your Code</h2>`, // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  };



const sendEmail = async(transporter,sendInfo) => {
    try {
        await transporter.sendMail(sendInfo)
        console.log('email sent successfully')
        console.log(id)
        const admin = await Admin.findOne({_id: id})

    admin.activationCode = response.data
    await admin.save()
    console.log(admin)

    } catch (error) {
        console.log(error)
        
    }
    
}

sendEmail(transporter,sendInfo)
        } else {
            throw new Error(`Failed to fetch the activation code. Status: ${response.status}`);
        }
    /* UserInfo.activationCode = code1;
    console.log(code) */
    /* SendEmailFunction(email,confirmActivationCode)
    const admin = Admin.findOne({_id: _id})
    console.log(admin)
    admin.activationCode = code; */
    } catch (error) {
        
    }
}
const createAdminInfo = async(arg) => {
    try {
        const {username,password,email} = arg
        const adminCreationLimit = 3
        const adminNumber = await Admin.countDocuments()
        console.log(adminNumber)
        if(adminNumber > adminCreationLimit){
            throw new Error('admin creation limit is reached')
        }
        const adminExist = await Admin.findOne({'email': email})
        if(adminExist){
            throw new Error('email has been used')
        }
        const adminId = crypto.randomBytes(16).toString('hex');
        const adminHashedPassword = await bcrypt.hash(password, 15);
        const admin = await Admin({
            adminId,
            username,
            email,
            activationCodeStatus: 'Pending',
            password: adminHashedPassword,
        })
        admin.save()
        .then((data) => {
            sendActivationCode(data.email,data.username,data._id)
        })
        /* return 200; */
    /* return {username,password,email,activationCode,secondActivationCode} */
    } catch (error) {
        console.log(error)

        
    }
}
const activationCode = async(arg,id) => {
try {
    const code =  arg.body.code;
    console.log(code)
const admin = await Admin.findById(id)
if(!admin){
    throw new Error('Account Not Found')
}
const storedCode = admin.activationCode
if(code !== storedCode){
    throw new Error('Invaild')
}else{
    admin.activationCodeStatus = 'fulfilled'
    await admin.save()
    console.log('succeed')
    return 200
    
}

} catch (error) {
    console.error(error)
    
}

}

const sendResetPass = (email,new_password) => {
    const html = ``
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.HarvestHubGmail,
          pass: process.env.App_password,
        },
      });

      const sendInfo = {
        from: `"HarvestHub 👻"`+ process.env.HarvestHubGmail, // sender address
        to: email, // list of receivers
        subject: "New Password", // Subject line
        text: "Reset Password", // plain text body
        html: html, // html body
      };

      const sendEmail = async(transporter,sendInfo) => {
        try {
            await transporter.sendMail(sendInfo)
            console.log('email sent successfully')
            console.log(id)
            const resetPass_Paswword = await bcrypt.hash(new_password,15)
            const admin = await Admin.findOne({email: email});
            admin.password = resetPass_Paswword;
            await admin.save()
            console.log(new_password)
            console.log(admin)
    
        } catch (error) {
            console.log(error)
            
        }
        
    }
    
    sendEmail(transporter,sendInfo)

}
const resetPasswordCharacter = () => {
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
    const resetPasswordString = resetPassword.join('');
    return resetPasswordString;
}
const resetPass = async(email) => {
    const generatedPass = resetPasswordCharacter()
    const res = sendResetPass(email,generatedPass)

}

module.exports = {adminLoginInfo, createAdminInfo,activationCode,resetPass}
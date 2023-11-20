const {Admin} = require('../../../Model/DB_structure')
const  bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { axios } = require('../../../config/axios.config')

/* login mechism */
const adminLoginInfo = async(arg) => {
try {
    const {username,email,password} = arg
const existAdmin = await Admin.findOne({email: email})
const invalidActivationCodeStatus = 'Pending'
if(!existAdmin){
    throw new Error('Unfound')
}
if(existAdmin.activationCodeStatus === invalidActivationCodeStatus){
    throw new Error('unverified')
}
const validPass = await bcrypt.compare(password,existAdmin.password)
if(!validPass){
    throw new Error('InvalidPass')
}
 const {_id,adminId} = existAdmin
    return {_id,adminId,username,email, 'statusCode': 202}
} catch (error) {
    const message = error.message
    switch(message){
        case 'Unfound':
            return {'statusCode': 404}
            break;
        case 'unverified':
            return {'statusCode': 401}
            break;
        case 'InvalidPass':
            return {'statusCode': 403}
            break;
        default: 
            console.log(message)
    }    
}

}

/*  */
const sendActivationCode = async(email,username,id,res) => {
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
    service: process.env.EmailService,
    host: process.env.EmailHost,
    port: process.env.EmailServicePort,
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
    subject: `<h2'>Your Code</h2>`, // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  };



const sendEmail = async(transporter,sendInfo,res) => {
    try {
        await transporter.sendMail(sendInfo)
        console.log('email sent successfully')
        console.log(id)
        const admin = await Admin.findOne({_id: id})

    admin.activationCode = response.data
    admin.save()
    .then(() => {
        res.status(200).json({'message': 'Your account has been created'})
    })
    .catch((err) => {
        console.log(err)
    })
    console.log(admin)

    } catch (error) {
        console.log(error)
        
    }
    
}

sendEmail(transporter,sendInfo,res)
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
const createAdminInfo = async(arg,res) => {
    try {
        const {username,password,email} = arg
        const adminCreationLimit = 3
        const adminNumber = await Admin.countDocuments()
        console.log(adminNumber)
        if(adminNumber > adminCreationLimit){
            return res.status(403).json({'message': 'Admin Account Creation Has Been Reached'})
        }
        const adminExist = await Admin.findOne({'email': email})
        if(adminExist){
            return res.status(403).json({'message': 'Admin Account Already Exist'})
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
            sendActivationCode(data.email,data.username,data._id,res)
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error)

        
    }
}

/*  */
const activationCode = async(arg,id,res) => {
try {
    const code =  arg.body.code;
    console.log(code)
    console.log(id)
const admin = await Admin.findById(id)
if(!admin){
    console.log('Account Not Found')
}
const storedCode = admin.activationCode
if(code !== storedCode){
    return res.status(401).json({'message':'Invaild Code'})
}else{
    admin.activationCodeStatus = 'fulfilled'
    await admin.save()
    console.log('succeed')
    return res.status(202).json({'message': 'Activation Code Valid'})
}

} catch (error) {
    console.error(error.message)
    
}

}

const sendResetPass = (email,new_password) => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
    </head>
    <body style="background-color: black;text-align: center">
        <h1 style="color: aliceblue;background-color: purple; padding: 1rem;">HarvestHub@Nigeria</h1>
        <h2 style="color: greenyellow; padding: 1rem;">This is your new Login passsword</h2>
        <a style="color: antiquewhite;">${new_password}</a>
        <br>
        <strong style="color: antiquewhite;">Update your password when You login, <span>This is a temporary password</span></strong>
        <br>
        <strong style="color: rgb(231, 16, 16);">Don't share this mail with anyone</strong>
        <footer>
            <address>
                <p style="color: antiquewhite;">5, Olushola street, Ikeja, Lagos State</p>
                <p style="color: antiquewhite;">Office Line:<span>09032134512</span></p>
                <hp style="color: antiquewhite;">Mail: <span>harvest4@gmail.com</span></hp>
            </address>
        </footer>
    </body>
    </html>`
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
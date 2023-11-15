const nodemailer = require('nodemailer')

const SendEmailFunction = async(reciever_email,messageBody) => {
try {
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
        from: '"HarvestHub 👻" <harvesthub4@gmail.com>', // sender address
        to: reciever_email, // list of receivers
        subject: messageBody.subject, // Subject line
        text: messageBody.text, // plain text body
        html: messageBody.html, // html body
      };

      const response = await transporter.sendMail(sendInfo)
      console.log('email sent')
      return response;
      
} catch (error) {
    console.log(error)
}  
    
}



/* const sendEmail = async(transporter,sendInfo) => {
    try {
        await transporter.sendMail(sendInfo)
        console.log('email sent successfully')
    } catch (error) {
        console.log(error)
        
    }
    
}

sendEmail(transporter,sendInfo) */

module.exports = {SendEmailFunction}
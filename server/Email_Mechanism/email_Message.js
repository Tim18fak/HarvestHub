const UserInfo =  {
    activationCode: null,
    username: null,
}



const resetPasswordMessage = {
    subject: `<h1>HarvestHub Password Reset</h1>`,
    text: `<h3>HarvestHub</h3>`,
    html: `<!DOCTYPE html>
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
                                            <p>Hello,${UserInfo.username}</p>
                                            <p>Thank you for signing up for HarvestHub. To activate your account, please use the following activation code:</p>
                                            <p style="font-size: 24px; text-align: center; color: #007BFF;">${UserInfo.activationCode}</p>
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
                                        <td align="center">© 2023 HarvestHub. All rights reserved {{from_name}}.</td>
                                    </tr>
                                    <tr>
                                        <td height="30">&nbsp;</td>`
}
const confirmActivationCode = {
    subject: `<h1>HarvestHub Account Creation Confirmation</h1>`,
    text: `<h3>HarvestHub</h3>`,
    html: `<!DOCTYPE html>
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
                                            <p>Hello,${UserInfo.username}</p>
                                            <p>Thank you for signing up for HarvestHub. To activate your account, please use the following activation code:</p>
                                            <p style="font-size: 24px; text-align: center; color: #007BFF;">${UserInfo.activationCode}</p>
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
                                        <td align="center">© 2023 HarvestHub. All rights reserved {{from_name}}.</td>
                                    </tr>
                                    <tr>
                                        <td height="30">&nbsp;</td>`
}


module.exports = {resetPasswordMessage,confirmActivationCode, UserInfo}
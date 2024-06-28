import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
 const mailSender = (email, title ,body) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
      secure: false, 
      auth: {
          user: String(process.env.EMAIL_ADDRESS),
          pass: String(process.env.PASSKEY),
      },
    });
    const mailOptions = {
        from:{
            name: 'TECHNOBYTE',
            address: process.env.EMAIL_ADDRESS
        },
        to:"",
        bcc:email,
        subject:title,
        html:body
    }
    const sendmail=async(transporter,mailOptions)=>{
        try{
            await transporter.sendMail(mailOptions);
            console.log("Mail Sent");
        }
        catch(err){
            console.log(err);
        }
    }
    sendmail(transporter,mailOptions);
}
export default mailSender;
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
 const mailSender = async(email, title ,body) =>{
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
        to:email,
        subject:title,
        html:body
    }
    const sendmail=async(transporter,mailOptions)=>{
        try{
            await transporter.sendMail(mailOptions);
        }
        catch(err){
            console.log(err);
        }
    }
   await sendmail(transporter,mailOptions);
}
export default mailSender;
import mailSender from '../utils/mailSender.js'
import User from '../model/user.js'
import dotenv from 'dotenv';
dotenv.config();

export const mailer= async (req,res)=>{
    const users=await User.find({newsletterIsSubscribed:true}); // this is an array of objects
    const mails=users.map(user=>user.email); // this is an array of emails

    const subject=req.body.subject;
    const HTML=req.body.html_body;

    mails.forEach(async(mail)=>{
      await mailSender(mail,subject,HTML);
    })


    res.json({message:'Mail sent successfully'});
}

//const User=require('../model/user')
import User from '../model/user'
//const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
// const express=require('express');
require('dotenv').config();
export default mailer= async (req,res)=>{
    const users=await User.find({newsletterIsSubscribed:true}); // this is an array of objects
    const mails=users.map(user=>user.email); // this is an array of emails

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: String(process.env.USER),
        pass: String(process.env.PASS),
      },
    });
    const mailOptions = {
        from:{
            name: 'Node Mailer',
            address: process.env.USER
        },
        to:mails,
        subject:'sent mail using node mailer for blogs',
        text:'This is a test mail',
        html:'<h1>This is a test mail</h1>'
    
    }
    
    const sendmail=async(transporter,mailOptions)=>{
        try{
            await transporter.sendMail(mailOptions);
            console.log('Mail sent successfully');
        }
        catch(err){
            console.log(err);
        }
    }
    
    sendmail(transporter,mailOptions);
    res.json({message:'Mail sent successfully'});
}

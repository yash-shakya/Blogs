//const express=require('express');
import express from 'express'
const router=express.Router()

//const User=require('../model/user')

import User from '../model/user.js'
//const controller=require('../controllers/news')

// import controller from '../controllers/newsletter'
import {mailer} from '../controllers/newsletter.js'

// a get method to get all users with newsletterIsSubscribed as true
router.get('/',async (req,res)=>{
    
    res.send( await User.find({newsletterIsSubscribed:true}));
})

router.get('/email',mailer)



//module.exports=router;
export default router;
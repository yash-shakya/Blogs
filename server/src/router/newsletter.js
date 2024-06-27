//const express=require('express');
import express from 'express'
const router=express.Router()

//const User=require('../model/user')

import User from '../model/user'
//const controller=require('../controllers/news')

import controller from '../controllers/newsletter'

// a get method to get all users with newsletterIsSubscribed as true
router.get('/',async (req,res)=>{
    
    res.send( await User.find({newsletterIsSubscribed:true}));
})

router.get('/email',controller.mailer)



//module.exports=router;
export default router;
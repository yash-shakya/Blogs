import express from 'express'
const router=express.Router()
import User from '../model/user.js'
import {mailer} from '../controllers/newsletter.js'
router.get('/',async (req,res)=>{
    
    res.send( await User.find({newsletterIsSubscribed:true}));
})
router.get('/email',mailer)
export default router;
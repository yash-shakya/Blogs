import express from 'express'
const router=express.Router()
import User from '../model/user.js'
import Comment from '../model/comment.js'

//Post Route for creating Comment
router.post("/:id",async (req,res)=>{
    const id=req.params.id;
    const token = req.headers.cookie.split('token=')[1].split(';')[0];

    //Veryfying auth_token and and user's id 
    if (!token) {
        // return res.status(401).json({ message: 'Unauthorized' });
        // return res.redirect('/auth/login');
        return res.send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, 'your_secret_key_here');
        if(id!=decoded.id) return res.send("Invalid token or id");
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error });
    }

    //Finding user and creating comment
    const user=await User.findById(id)
    if(!user) return res.json({message:"User not Found"})
    try {
        Comment.create({
        content:req.body.content,
        user:user.id
        })
    } catch (error) {
        res.json({message:"Comment creation failed", err:error})
    }
    res.json({message:"Comment created successfully"});
})

export default router;
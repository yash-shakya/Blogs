import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    } 
})
const Comment =mongoose.model('Comment',commentSchema);

export default Comment;
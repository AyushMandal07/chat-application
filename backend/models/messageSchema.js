import mongoose from "mongoose";
import Conversation from "./conversationModels";
 const messageSchema = mongoose.Schema({
    senderID:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
    },
    reciverID:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
    },
    message:{
        type:String,
        required: true
    },
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        default:[]
    },
 },{timestamps:true})

 const Message = mongoose.model('Message',messageSchema)

 export default Message
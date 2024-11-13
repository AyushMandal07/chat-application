import mongoose  from "mongoose";
const userSchema = mongoose.Schema({
    fullname:{
         type: String,
         required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    gender:{
        type: String,
         required:true,
         enum:["male","female"]
    },
    password:{
        type: String,
         required:true,
         minlength:6,
    },
    profilepic:{
        type: String,
        default:"https://avatar.iran.liara.run/public" 
    }
    
},{timestamps:true});

const User = mongoose.model("User",userSchema)

export default User;
import User from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import  jwtToken  from "../utils/jwtwebtToken.js";
export const userRegister = async (req, res) => {
    try {
        console.log("working");
        const { fullname, username, email, gender, password, profilepic } = req.body;

        // Check if the username or email already exists
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(500).send({ success: false, message: "Username or email already exists" });
        }

        // Hash the password
        const hashPassword = bcryptjs.hashSync(password, 10);

        // Set default profile picture based on gender
        const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy/username=${username}`;
        const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl/username=${username}`;
        
        // Create new user instance
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profile: gender === "male" ? profileBoy : profileGirl
        });

        // Save the new user to the database
        if (newUser) {
            await newUser.save();
            jwtToken(newUser._id,res)
            res.status(201).send({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profile: newUser.profile,  // Corrected to match the schema
                email: newUser.email,
            });
        } else {
            res.status(500).send({ success: false, message: "Invalid User Data" });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message  // Use error.message for clearer responses
        });
        console.log(error);
    }
};





export const userLogin=async(req,res)=>{
   try {
      const {email,password}=req.body;
      const user = await User.findOne({email})
      if (!user)return res.status(500).send({ success:false,message:"email does not exist, please register "})
      const comparePass = bcryptjs.compareSync(password,user.password||"")
   if(!comparePass)return res.status(500).send({success:false,message:"email or password not correct"})
     
      jwtToken(user._id,res);

      res.status(200).send({
         _id: user._id,
         fullname: user.fullname,
         username: user.username,
         profile: user.profile,  // Corrected to match the schema
         email: user.email,
         message:"successfully login"
     })
   } catch (error) {
      res.status(500).send({
         success: false,
         message: error.message  // Use error.message for clearer responses
     });
     console.log(error); 
   }
}



export const userLogout=async(req,res)=>{
   try {
      res.cookie("jwt",'',{
         maxAge:0
      })
      res.status(200).send({message:"user successfully Logged Out"})
      
   } catch (error) {
      res.status(500).send({
         success: false,
         message: error.message  // Use error.message for clearer responses
     });
     console.log(error);
   }
}
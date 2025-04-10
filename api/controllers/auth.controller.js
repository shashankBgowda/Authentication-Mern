import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';


export const signup = async(req,res)=>{
    const {username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password,10);
    const newuser = new User({username, email, password: hashedpassword});
    try{
        await newuser.save();
        res.status(200).json({message:"New User created successfully "});
    }catch(error){
        res.status(500).send({error:message})
    };
};
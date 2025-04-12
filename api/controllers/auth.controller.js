import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utiles/error.js";
import jwt from "jsonwebtoken";

export const signup = async(req,res, next)=>{
    const {username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password,10);
    const newuser = new User({username, email, password: hashedpassword});
    try{
        await newuser.save();
        res.status(200).json({message:"New User created successfully "});
    }catch(error){
        next(error);
    };
};

export const signin = async(req, res, next)=>{
    const {email, password} = req.body;
    try {
        const validuser = await User.findOne({email});
        if(!validuser){
            return next(errorHandler(404, 'User not found, please SIGN-UP'));
        }
       // Now if email exist then (down)  password inside database in hashed so we use bcryptedjs to unhash and to compare it.
       const validpassword = bcryptjs.compareSync(password, validuser.password);
       if(!validpassword){
        return next(errorHandler(404, 'wrong credentilas'));
       }
       //now if both emial and password are correct them we add token to the cookie of the browser... 
       const token = jwt.sign({id:validuser._id}, process.env.JWT_SECRET)
       //in the output, we dont want to get the hased password, so we should remove it.
       const {password:hashedpassword, ...rest} = validuser._doc;
       //will put this token inside the cookies
       const expiryDate = new Date(Date.now() + 3600000);
       res
        .cookie('access_token',token, {httpOnly : true, expires:expiryDate})
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
    }
};
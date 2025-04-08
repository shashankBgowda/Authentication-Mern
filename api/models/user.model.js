import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique : true
    },
    password:{
        type:String,
        require:true
    }
},
{timestamps:true});

const User = mongoose.model("User",userschema);

export default User;
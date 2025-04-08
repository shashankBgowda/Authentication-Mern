import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log(error,"somenthing went wrong in connecting to database");
});

app.listen(1900,()=>{
    console.log("Server listing to Port 1900!");
});
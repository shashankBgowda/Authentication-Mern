import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Userroute from "./routes/user.routes.js";
import Authroute from "./routes/authentication.route.js";


dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error, "Something went wrong in connecting to database");
});


app.listen(2908, () => {
    console.log("Server listening to Port 2908!");
});

app.use("/api/user", Userroute);
app.use("/api/authentication", Authroute);

app.use( (err, req, res, next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal server error";
    return res.status(statuscode).json({
        message,
        success:false,
        statuscode});
});
const express=require("express");
const User=require("../models/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userRouter=express.Router();

userRouter.post("/signup", async(req,res)=>{
    const {email,password,confirmpassword}=req.body
    const hashpassword=await bcrypt.hash(password, 10);
    try {
       const user=await User.create({email,confirmpassword,hashpassword});
       res.status(201).send("Signup Successfully");
    } catch (error) {
        res.status(400).send("Something went wrong:" + error.message);
    }
});


userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try {
       const user=await User.findOne({email});

       if(user&&await bcrypt.compare(password,user.hashpassword)){
        
        const token=jwt.sign({userId: user._id}, "masai", {expiresIn: "1h"});
        
        // res.json({token});
        localStorage.setItem("token", token);
        res.redirect("./dashboard");
       }
       
       else{
        res.status(401).json({error: "Invalid Credentials"});
       }
    } catch (error) {
        res.send("Server error here")
    }
});

module.exports=userRouter;
import BadRequestError from "../errors/bad-request.js";
import ConflictError from "../errors/conflict.js";

import userModel from "../models/user.models.js";
import sendCookie from "../services/cookie.services.js";
import validateEmail from "../services/validateEmail.services.js";



export const signUp=async(req,res)=>{
   
        const {email,fullName,password,profilePic,address,bio}=req.body;
        if(!fullName || !email || !password || !address){
           
            throw new BadRequestError("all fields are required")
        }
        if(!validateEmail(email)){
            throw new BadRequestError("please enter a valid email")
        }
        if(password.length<6){
            
            throw new BadRequestError("password length must be at least 6")
        }
        let user =await userModel.findOne({email})
       
        //if user exist
        if(user){
            
           
            throw new ConflictError("user already exist with this email")
        }


        user=await userModel.create({...req.body})
        const token=user.createJWT()
        sendCookie(res,token)
        return res.status(200).json({message:"user created",user})
        
}


export const logout=(req,res)=>{
   
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message:"logout successful"})
        
   
}

export const updateProfile=async(req,res)=>{
   
        const {profilePic,fullName,address}=req.body;
        const userDetail=req.user;
        if(!profilePic || !fullName || !address){
            throw BadRequestError("fill all fields")
        }
       
        const user=await userModel.findByIdAndUpdate(userDetail,{...req.body},{new:true}).select("-password")
        return res.status(200).json({message:"Information updated",user})
    
}

export const getProfile=(req,res)=>{
   
        return res.status(200).json({message:"got the user",user:req.user})
   
}
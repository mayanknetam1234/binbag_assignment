
import jwt from "jsonwebtoken"
import userModel from "../models/user.models.js"
import UnauthenticatedError from "../errors/unauthenticated.js";
export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            throw new UnauthenticatedError("not authorized")
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            throw new UnauthenticatedError("not authorized")
        }

        const user=await userModel.findById(decode._id).select("-password")
        if(!user){
            throw new UnauthenticatedError("not authorized")
        }
        req.user=user;
        next();
    } catch (error) {
        throw new UnauthenticatedError("not authorized")
    }
}
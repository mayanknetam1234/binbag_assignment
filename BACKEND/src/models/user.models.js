import mongoose  from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""

    },
    bio:{
        type:String,
        default:""
    },
    address:{
        type:String,
        required:true
    }
   
}, {timestamps:true})

userSchema.pre('save',async function (next){
    //generating the hash password
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.createJWT=function(){
    return jwt.sign({_id:this._id,email:this.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_TIMEOUT})
}

userSchema.methods.comparePassword=async function (canditatePassword) {
    const isMatch=await bcrypt.compare(canditatePassword,this.password);
    return isMatch;
    
}


const userModel=mongoose.model("User",userSchema)


export default userModel
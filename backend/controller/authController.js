import user from "../model/user.js";
import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"


export const register =async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        return res.status(400).json({message:"All feild are required "})
    }
    try{
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message:"User already exists please login"
            })
        }
        const hashPassword= await bcrypt.hash(password,10)
        const user =new User({
            username,
            email,
            password:hashPassword
        })
         await user.save()
          return res.status(200).json({
            message:"User register successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
         })

    }catch(error){
        console.log("Error occur while registering",error)
        return res.status(400).json({
            message:"Error occur while registering"
        })
        
        
    }
}

export const login =async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({message:"All feild are required "})
    }
    try{
        const user=await User.findOne({email})
        if(!user){
        return res.status(400).json({
                message:"User dont exits please register "
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"invalid credential"
            })
        }
        const accessToken =jwt.sign({id:user._id,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
        const refreshToken=jwt.sign({id:user._id,role:user.role},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict"
        })
        res.status(200).json({
            accessToken,user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            },
        })

    }catch(error){
        console.log("Error occur while login")
        return res.status(400).json({
            message:"Error occur while login"
        })
        
    }
}

export const refreshToken=async(req,res)=>{
    const token =req.cookies.refreshToken
    if(!token){
        return res.status(401).json({message:"No refresh token provided"})
    }
    try{
        const decoded =jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
        const user=await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({message:"User doesnot exits "})
        }
        const newAccessToken=jwt.sign({id:user._id,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
        res.status(200).json({
            accessToken:newAccessToken,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        })

    }catch(error){

        console.log("Error refreshing token ",error)
        return res.status(500).json({message:"Server error"})
    }
}
export const logout=(req,res)=>{
    try{
        res.clearCookie("refreshTOken",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
        })
        return res.status(200).json({
            message:"logout successfully"
        })

    }catch(error){
        console.log("Error while logouting ")
        res.status(500).json({
            message:"error while logouting "
        })
    }

}
import { mongo } from "mongoose"
import User from "../model/user.js"


export const getUsers=async(req, res)=>{
 
    try{
        const page = parseInt(req.query.page)||1
        const limit = parseInt(req.query.limit)||2;
        const skip=(page - 1) * limit;
        const total= await User.countDocuments()
        const user=await User.find().skip(skip).limit(limit).select("-password")
        res.status(200).json({
            user,total,totalPages:Math.ceil(total/limit),currentPage:page
        })
    }catch(error){
    console.log("error fetching user")
    return res.status(400).json({message:"error fetching user"})
 }
}


export const getProfile=async(req ,res )=>{
    try{
        const  user= await User.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        res.status(200).json(user)
    }catch(error){
        console.log("error while getting the profile ",error)
        return res.status(400).json({message:"error while getting the profile "})
    }

}

export const deleteUser=async(req , res)=>{
    try{
       const user=await User.findByIdAndDelete(req.params.id)
       if(!user){
        console.log("User doesnot exits")
        return res.status(400).json({message:"User doesnot exits"})
       }
       return res.status(200).json({message:"User deleted successfully"})
    }catch(error){
        console.log("Error while deleting user",error)
        return res.status(400).json({
            message:"Error while deleting the user"
        })
    }
}
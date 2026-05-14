import mongoose from "mongoose";

export const connectToDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connecting successfully ${conn.connection.host}`)


    }catch(error){

        console.log("Error while connecting to the database ")
        process.exit(1)
    }
}


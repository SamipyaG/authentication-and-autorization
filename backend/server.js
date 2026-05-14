import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { connectToDB } from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import cors from 'cors'


dotenv.config()

const PORT=process.env.PORT||5000

const app =express()



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

connectToDB()
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {setAuth}=useState()
  const navigate =useNavigate()
  const [form ,setForm]=useState({
    email:"",
    password:""
  })
const [error,setError]=useState(null)
  const handleLogin =async()=>{
    e.preventDefault()
    try{
      const res=await axios.post("/api/auth/login",form,{withCredentials:true})
      setAuth({accessToken:res.data.accessToken,role:res.data.role})
      console.log(res.data)
      if(res.data.role="admin"){
        navigate('/admin')
      }else{
        navigate("/user")
      }
    }catch(error){
      setError("Login failed invalid credentials ")
      console.log(error)
    } 
  }
  return (
   <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl" >
    <h1 className='text-2xl font-bold mb-4'>Login</h1>
    {error && <p className='text-red-500 mb-4'>{error}</p>}
    <form>
    <div>
      <input type='email' placeholder='Email' value={form.email} onChange={(e)=>{
        setForm({...form,email:e.target.value})}} className='w-full p-2 border rounded' required/>
      <input type='password' placeholder='Password' value={form.password} onChange={(e)=>{
        setForm({...form,password:e.target.value})
      }} className='w-full p-2 border rounded' required/>
    </div>
    <button className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700' onClick={handleLogin}>
      Login
    </button>
    </form>


   </div>
  )
}

export default Login
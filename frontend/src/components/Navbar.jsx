import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth} from "../context/AuthContext"

const Navbar = () => {
  const {auth} =useAuth()
const navigate=useNavigate()
const handleLogut =async()=>{
  try{
    await axios.post("/api/auth/logut",{},{withCredentials:true})
    setAuth(null)
    navigate("/login")
  }catch(error){
    console.log(error)

  }
}



  return (
    
    <nav className='bg-gray-800 p-4 text-white'>
        <div className='container mx-auto flex justify-between item-center'>
            <Link to ="/" className='text-white mr-4'>Home</Link>
            {auth?.accessToken ?(<>
            
            <button className='bg-red-600 px-3 py-1 rounded hover:bg-red-700' onClick={handleLogut}>Logout</button>
            
            </>)
            
            
            
            :(<>
            <Link to ="/login" className='text-white mr-4'>Login</Link>
            <Link to ="/register" className='text-white mr-4'>Register</Link>
            </>)}
        </div>
        
    </nav>
    
  )
}

export default Navbar
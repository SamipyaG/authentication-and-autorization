import React from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from "../context/AuthContext"

const Navbar = () => {
  return (
    
    <nav className='bg-gray-800 p-4 text-white'>
        <div className='container mx-auto flex justify-between item-center'>
            <Link to ="/" className='text-white mr-4'>Home</Link>
            [auth?.accessToken]
        </div>
        
    </nav>
    
  )
}

export default Navbar
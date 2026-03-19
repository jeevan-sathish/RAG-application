import React from 'react'
import { FaExclamationTriangle } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ message }) => {
  const navigate = useNavigate()

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-black text-white gap-6'>

      
     

     
      <FaExclamationTriangle className='text-yellow-400 text-[80px] animate-bounce' />

    
      <h1 className='text-[80px] font-extrabold text-red-500'>404</h1>


      <p className='text-xl text-gray-300 text-center px-4'>
        {message || "Oops! Something went wrong or prompt was empty."}
      </p>

     
      <button 
        onClick={() => navigate('/')}
        className='mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-800 rounded-xl text-white font-semibold transition duration-300 shadow-lg'
      >
        Go Back Home
      </button>

    </div>
  )
}

export default ErrorPage
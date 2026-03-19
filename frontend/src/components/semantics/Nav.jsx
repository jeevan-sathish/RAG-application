import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// React Icons
import { FaHome } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

const Nav = () => {
  const [page, setPage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (page === "logout") {
      navigate('/SignIN');
    } else if (page === "signin") {
      navigate('/SignIN');
    }
  }, [page, navigate]);

  return (
    <div className='w-full h-[9vh] flex justify-between items-center px-6 
    sticky top-0 z-50 bg-black text-white shadow-lg'>

     
      <Link 
        to='/' 
        className='flex items-center gap-2 text-lg font-semibold hover:text-green-400 transition duration-300'
      >
        <FaHome />
        Home
      </Link>

      
      <div className='flex gap-4'>

        <button 
          className='flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition duration-300'
          onClick={() => setPage("logout")}
        >
          <FaSignOutAlt />
          Logout
        </button>

        <button 
          className='flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300'
          onClick={() => setPage("signin")}
        >
          <FaSignInAlt />
          Sign In
        </button>

      </div>
    </div>
  );
};

export default Nav;
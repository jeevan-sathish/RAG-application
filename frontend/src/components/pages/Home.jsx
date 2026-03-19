import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-full h-[100vh] bg-gray-900 flex flex-row justify-center items-center '>
       <button className='bg-green-400'> <Link to='/SignIN'>get In</Link></button>
    </div>
  )
}

export default Home
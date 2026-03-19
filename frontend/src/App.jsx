import React from 'react'

import Nav from './components/semantics/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Action from './components/pages/Action'
import SignIN from './components/auth/SignIN'
import SignUP from './components/auth/SignUP'

const App = () => {
  return (
    <div>
    <Nav/>
    <div className=' bg-gray-900 w-full h-screen flex flex-row justify-center items-center'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Action' element={<Action/>} />
        <Route path='/SignIN' element={<SignIN/>} />
        <Route path='/SignUP' element={<SignUP/>} />
      </Routes>
    </div>

    </div>
    
    
    
  )
}

export default App
import React, { useState } from 'react'
import { FaRocket } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';



const SignIN = () => {
    const navigate =useNavigate()

    const [data,setData]=useState({
        email:"",
        password:""
    })

    const [res,setRes]=useState("")
    const [islogged,setIsLogged]= useState(false)

    function handleData(e){
        const {name,value }=e.target;
        setData((prev)=>({
            ...prev,
            [name]:value
        }))

    }

     async function handleSubmit(){
        try{
            const response = await fetch("http://127.0.0.1:5000/signin",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })

            const result = await response.json()
            setRes(result.message)
            if( result.message =="login succesfull"){
                setIsLogged(true)
            }
            else if(result.message =="login failed"){
                navigate('/SignUP')
            }
            else{
                setIsLogged(false)
            }
            setTimeout(()=>{
                if(result.message=="login succesfull"){
                        setIsLogged(false)
                        navigate("/Action")
                }
               
            },3000)
          

        }
        catch(err){
            console.log("error:",err)
        }


       

    }
  return (
   <>
    {
        !islogged?(
             <div className='w-[400px] h-[300px] rounded-2xl p-3 flex flex-col
     bg-black shadow-2xl shadow-amber-200 justify-evenly items-center'>
   <div className='w-full animate-pulse flex flex-row justify-center items-center gap-2'>
     <p className='text-center text-[30px] font-extrabold text-blue-700'>
     SignIn Here!
     </p>
     <FaRocket className='text-blue-500 text-[30px]' />

   </div>


    <input 
     type="email"
     name='email'
     value={data.email}
     placeholder='Enter your email' 
     onChange={handleData} required
     className='p-3 w-[80%] h-[45px] bg-gray-600 border border-black rounded-2xl '   
     />

     <input 
     type="password"
     name='password'
     value={data.password}
     placeholder='Enter your password' 
     onChange={handleData} required
     className='p-3 w-[80%] h-[45px] bg-gray-400 border border-black rounded-2xl '   
     />

     <button 
      className='w-[80%] h-[35px] border border-amber-300 bg-green-500 text-black rounded-2xl'
      onClick={handleSubmit}
       >
       submit
       </button>

       <p className='text-blue-300 text-[15px]'>create or Register now <Link to='/SignUP' className='text-red-300 underline hover:text-green-400'>Register!</Link></p>

       <h1 className='text-white'>{res}</h1>

       
    
    </div>
        ):(
            <div className='text-white'>
                 success✅
            </div>
        )
    }
   </>
  )
}

export default SignIN
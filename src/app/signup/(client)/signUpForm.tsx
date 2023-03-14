

'use client';


import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { CSSProperties } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import Image from 'next/image'
import { ClipLoader } from 'react-spinners';
import { SERVERURL } from '@/uttils/jsUtills';
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
function SignUpForm() {
    let name = useRef("")
    let email = useRef("")
    let password  = useRef<string>()
    let reEnterPassword = useRef<string>()
    let [passwordError , setPasswordError] = useState("") 
    let [emailError , setEmailErr] = useState("")
    let [repasswordErr , setRePaswwordErr] = useState(false)
    let [nameError , setNameError] = useState("")
    let [loading , setLoading] = useState(false)
    let router = useRouter()


  async function handleSignUp(e : React.MouseEvent<HTMLFormElement>){
    e.preventDefault()
    setLoading(true)
    if(password.current == reEnterPassword.current){

       await fetch(SERVERURL+"/api/signup" , {
            method : "POST" , 
            body : JSON.stringify({
                name : name.current , 
                email : email.current , 
                password : password.current
            })
        }).then(async res => {
            if(res.status == 403){
                setLoading(false)
                let {emailErr , passwordErr , nameError} = await res.json()
                setNameError(nameError)
                setEmailErr(emailErr)
                setPasswordError(passwordErr)
                return
            }
            router.push("/login")
        })
    }else{
        setLoading(false)

        setRePaswwordErr(true)
    }
    router.push("/login")
   }


  return (
    <div className='flex'>

    <div className=' w-full sm:w-[50%] h-full'>
        <div className='flex flex-col items-center direction-column    p-10'>
           <Image  alt='' onClick={() => router.push("/")} width = {100} height = {10} className = {"objecr-contain cursor-pointer"} src='/pngwing.com.png' />
           <form onSubmit={handleSignUp} className='border-2 border-black-500 p-5 w-[300px] sm:w-[400px] h-fit'>
                    <div className='text-lg font-bold'>Create account</div>

                    <div className='mb-2'>
                        <div className='text-sm font-semibold'>your name</div>
                       <input onChange={(e) => name.current = e.target.value} type="text" placeholder="Type here" className="input input-sm  input-bordered w-full " />
                       <div className='text-xs text-red-500'>{nameError}</div>
                    </div>

                    <div className='mb-2'>
                        <div className='text-sm font-semibold'>Email</div>
                       <input required onChange={(e) => email.current = e.target.value} type="text" placeholder="Type here" className="input input-sm input-bordered w-full " />
                       <div className='text-xs text-red-500'>{emailError}</div>
                    </div>


                    <div className='mb-2'>
                        <div className='text-sm font-semibold'>Password</div>
                       <input required onChange={(e) => password.current = e.target.value} type={"password"} placeholder="Type here" className="input input-sm input-bordered w-full " />
                       {passwordError && <div className='text-xs text-red-500'>{passwordError}</div>}
                       {repasswordErr && <div className='text-xs text-red-500'>Password field not equal re-Enter Password</div>}
                    </div>


                    <div className='mb-2'>
                        <div className='text-sm font-semibold'>Re-enter password</div>
                       <input required onChange={(e) => reEnterPassword.current = e.target.value} type={"password"} placeholder="Type here" className="input input-sm input-bordered w-full " />
                       {passwordError && <div className='text-xs text-red-500'>{passwordError}</div>}
                       {repasswordErr && <div className='text-xs text-red-500'>Password field not equal re-Enter Password</div>}
                     </div>
                   
                   
                    {!loading && <button type='submit' className='bg-gradient-to-b from-yellow-400 to-yellow-300 mx-auto w-full  h-fit p-1 text-center'>Continue</button>}
                    {loading &&<button type="button" className='bg-gradient-to-b from-yellow-400 to-yellow-300 mx-auto w-full  h-fit p-1 text-center'>
                    <ClipLoader
                        color={"white"}
                        loading={loading}
                        cssOverride={override}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                       /></button>}
                    <div className='mt-4 text-xs'>
                    By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
                    </div>


                    <div className='mt-4'>
                            Already have an account? <Link href={"/login"} className='text-cyan-600'>Sign in</Link>
                    </div>
           </form>
        </div>
    </div>


    <div className='w-[50%] hidden sm:flex  items-center h-screen'>
        <Image  width={500} height = {500}  alt='' src={"/Premium Vector _ Isometric online shopping, delivery, logistics concept_.jfif"} 
        className = {"object-contain w-full h-[50%]"}/>
    </div>

    </div>

  )
}

export default SignUpForm

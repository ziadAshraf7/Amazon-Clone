



'use client';

import {  signIn } from "next-auth/react"

import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image'
import {  CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { SERVERURL } from "@/uttils/jsUtills";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


function LoginForm() {
    let email = useRef("")
    let password  = useRef<string>()
    let router = useRouter()
    let [emailError , setEmailErr] = useState("")
    let [passwordErr , setPasswordErr] = useState("")
    let [loading , setLoading] = useState(false)

  async function handleSignUp(e : React.MouseEvent<HTMLFormElement>){
    e.preventDefault()
    setLoading(true)
   await signIn("credentials" , {
      email : email.current ,
      password : password.current,
      redirect : true
    }).then(async res => {
      if(res?.error){
        setLoading(false)
        if(res.error.includes("email")) {
          setEmailErr(res.error)
          setPasswordErr("")
        }else{
          setPasswordErr(res.error)
          setEmailErr("")
        }
        return
      }
      await fetch(SERVERURL+"/api/mergesessions")
      router.refresh()
    })
   }

  return (
    <div className="flex h-screen w-full">

    <div className=' w-full flex  items-center justify-center h-full sm:w-[50%] '>

        <div className='flex flex-col items-center justify-center w-full '>
        <Image  alt='' onClick={() => router.push("/")} width = {100} height = {10} className = {"objecr-contain cursor-pointer"} src='/pngwing.com.png' />
           <form onSubmit={handleSignUp} className='border-2 border-black-500 p-5 w-[300px] sm:w-[400px] h-fit'>
                    <div className='text-lg font-bold'>Login</div>
                    <div className='mb-2'>
                        <div className='text-sm font-semibold'>Email</div>
                       <input required onChange={(e) => email.current = e.target.value} type="text" placeholder="Type here" className="input input-sm input-bordered w-full " />
                       {emailError && <div className='text-xs text-red-500'>{emailError}</div>}
                    </div>


                    <div className='mb-2'>
                        <div className='text-sm font-semibold'>Password</div>
                       <input required onChange={(e) => password.current = e.target.value} type={"password"} placeholder="Type here" className="input input-sm input-bordered w-full " />
                       {passwordErr && <div className='text-xs text-red-500'>{passwordErr}</div>}
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
                            New to Amazon ? <Link className="text-cyan-600" href = {"/signup"}>Sign up</Link>
                    </div>
           </form>
        </div>
    </div>

    <div className='w-[50%] hidden sm:flex  items-center h-screen'>
        <Image width={500} height = {500} alt='' src={"/Premium Vector _ Isometric online shopping, delivery, logistics concept_.jfif"} 
        className = {"object-contain w-full h-[50%]"}/>
    </div>

    </div>

  )
}

export default LoginForm















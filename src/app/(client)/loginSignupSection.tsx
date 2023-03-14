
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function LoginSignupSection({
    userSession
}:{
    userSession : any
}) {
    let pathName = usePathname()


    if(pathName == "/userReviews" || pathName == "/login" || pathName == "/signup" || pathName == "/comment" || pathName?.includes("itemReviews") || pathName == "/browserHistory"){
        return <></>
      }

  return (
    <div>
    {!userSession.email && <div className=' flex flex-col w-full justify-center items-center py-10 border-y-[1px] border-gray-300'>
          <div className='text-sm'>See personalized recommendations</div>
          <Link href={"/login"} className='p-1 text-center w-[400px] bg-gradient-to-t from-yellow-400 to-yellow-300'>Sign in</Link>
          <div className='text-xs'>New here ? <Link href = {"/signup"} className='text-sm text-cyan-800'>Start here</Link></div>
        </div>
       }
    </div>
  )
}

export default LoginSignupSection



'use client'


import { usePathname } from 'next/navigation';
// #37475A
import React from 'react'

function Footer() {

    const pathname = usePathname();



    if(pathname?.includes("signup") || pathname?.includes("login")){
        return <></>
    }

  return (
    <div className='mt-4 w-full  text-white '>
        <div onClick={() => window.scrollTo({top : 0 , behavior : "smooth"})} className='p-3 hover:bg-[#4c5f76] cursor-pointer bg-[#37475A] text-center'>Back To Top</div>
        <div className='  bg-[#232F3E]  p-5'>
                <div className='w-[90%]  mx-auto grid grid-cols-2 sm:grid-cols-4 place-items-center gap-10'>
                    <div className='flex flex-col h-full gap-4'>
                        <div className='font-semibold '>Good To Know</div>
                        <div className='text-gray-500 text-sm'>Careers</div>
                        <div className='text-gray-500 text-sm'>Blog</div>
                        <div className='text-gray-500 text-sm'>About Amazon</div>
                        <div className='text-gray-500 text-sm'>Investor Relations</div>
                        <div className='text-gray-500 text-sm'>Amazon Devices</div>
                        <div className='text-gray-500 text-sm'>Amazon Science</div>
                    </div>
                   
                   <div className='flex flex-col gap-4 h-full'>
                    <div className=''>Make Money with Us</div>
                    <div className='text-gray-500 text-sm'>Sell products on Amazon</div>
                    <div className='text-gray-500 text-sm'>Sell on Amazon Business</div>
                    <div className='text-gray-500 text-sm'>Sell apps on Amazon</div>
                    <div className='text-gray-500 text-sm'> Become an Affiliate</div>
                    <div className='text-gray-500 text-sm'> Advertise Your Products</div>
                    <div className='text-gray-500 text-sm'> Self-Publish with Us</div>
                    <div className='text-gray-500 text-sm'>Host an Amazon Hub</div>
                    <div className='text-gray-500 text-sm'>›See More Make Money with Us</div>
                    </div>
                 

                    <div className='flex flex-col gap-4 h-full'>
                    <div className=''>Amazon Payment Products</div>
                    <div className='text-gray-500 text-sm'>Amazon Business Card</div>
                    <div className='text-gray-500 text-sm'>Shop with Points</div>
                    <div className='text-gray-500 text-sm'>Reload Your Balance</div>
                    <div className='text-gray-500 text-sm'>Amazon Currency Converter</div>
                    </div>

                    <div className='flex flex-col gap-4 h-full'>
                    <div className=''>Let Us Help You</div>
                    <div className='text-gray-500 text-sm'>Let Us Help You</div>
                    <div className='text-gray-500 text-sm'>Your Account</div>
                    <div className='text-gray-500 text-sm'>Your Orders</div>
                    <div className='text-gray-500 text-sm'>Shipping Rates & Policies</div>
                    <div className='text-gray-500 text-sm'> Returns & Replacements</div>
                    <div className='text-gray-500 text-sm'>Manage Your Content and Devices</div>
                    <div className='text-gray-500 text-sm'>Amazon Assistant</div>
                    <div className='text-gray-500 text-sm'>Help</div>
                    </div>

                </div>
        </div>
    </div>
  )
}

export default Footer

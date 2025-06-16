"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Link from 'next/link'

function Header() {
    const path=usePathname();
    useEffect(()=>{
        console.log("path",path);
    },[])

  return (
    <div className='flex p-2 items-center justify-between bg-gradient-to-r from-black via-purple-900 to-black shadow-lg border-b border-purple-500/20'>
      <div className='flex items-center'>
      <Image src={`/logo.png`} width={70} height={60} alt="Logo" className="hover:opacity-90 transition-opacity" />
      <h1 className="text-white text-2xl font-bold ml-2">HirePrepAI</h1>
      </div>
      <ul className='hidden md:flex gap-8'>
        <li>
          <Link href="/how-it-works" className={`text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 cursor-pointer ${path == '/how-it-works' && 'after:w-full'}`}>
            How it works?
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className={`text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 cursor-pointer ${path == '/dashboard' && 'after:w-full'}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/questions" className={`text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 cursor-pointer ${path == '/questions' && 'after:w-full'}`}>
            Questions
          </Link>
        </li>
        
        {/* <li>
          <Link href="/upgrade" className={`text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 cursor-pointer ${path == '/upgrade' && 'after:w-full'}`}>
            Upgrade
          </Link>
        </li> */}
      </ul>
      <div className="relative after:absolute after:w-12 after:h-12 after:rounded-full after:bg-purple-500/20 after:-z-10 after:blur-lg after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
        <UserButton />
      </div>
    </div>
  )
}

export default Header
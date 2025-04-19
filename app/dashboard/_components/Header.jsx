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
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={`/logo.svg`} width={160} height={160} alt="Logo" />
      <ul className='hidden md:flex gap-6'>
        <li>
          <Link href="/how-it-works" className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${path == '/how-it-works' && 'text-primary font-semibold'}`}>
            How it works?
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-semibold'}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/questions" className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${path == '/questions' && 'text-primary font-semibold'}`}>
            Questions
          </Link>
        </li>
        <li>
          <Link href="/profile" className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${path == '/profile' && 'text-primary font-semibold'}`}>
            Profile
          </Link>
        </li>
        {/* <li>
          <Link href="/upgrade" className={`hover:text-primary hover:font-semibold transition-all cursor-pointer ${path == '/upgrade' && 'text-primary font-semibold'}`}>
            Upgrade
          </Link>
        </li> */}
      </ul>
      <UserButton />
    </div>
  )
}

export default Header
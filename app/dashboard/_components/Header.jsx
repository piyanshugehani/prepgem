"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'

function Header() {
    const path = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className='flex p-2 items-center justify-between bg-gradient-to-r from-black via-purple-900 to-black shadow-lg border-b border-purple-500/20'>
                <div className='flex items-center'>
                    <Image src={`/logo.png`} width={70} height={60} alt="Logo" className="hover:opacity-90 transition-opacity" />
                    <h1 className="text-white text-2xl font-bold ml-2">HirePrepAI</h1>
                </div>

                {/* Desktop Menu */}
                <ul className='hidden md:flex gap-8'>
                    <li>
                        <Link href="/dashboard" className={`text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 cursor-pointer ${path == '/dashboard' && 'after:w-full'}`}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/how-it-works" className={`text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 cursor-pointer ${path == '/how-it-works' && 'after:w-full'}`}>
                            How it works?
                        </Link>
                    </li>
                    <li>
                        <Link href="/questions" className={`text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300 cursor-pointer ${path == '/questions' && 'after:w-full'}`}>
                            Questions
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button onClick={toggleSidebar} className="md:hidden text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>

                <div className="relative mr-6 after:absolute after:w-12 after:h-12 after:rounded-full after:bg-purple-500/20 after:-z-10 after:blur-lg after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
                    <UserButton />
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-black bg-opacity-95 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-50`}>
                <div className="p-4">
                    <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ul className="space-y-4 mt-12">
                        <li>
                            <Link href="/dashboard" onClick={toggleSidebar} className={`text-gray-300 block py-2 ${path == '/dashboard' && 'text-white'}`}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/how-it-works" onClick={toggleSidebar} className={`text-gray-300 block py-2 ${path == '/how-it-works' && 'text-white'}`}>
                                How it works?
                            </Link>
                        </li>
                        <li>
                            <Link href="/questions" onClick={toggleSidebar} className={`text-gray-300 block py-2 ${path == '/questions' && 'text-white'}`}>
                                Questions
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    )
}

export default Header
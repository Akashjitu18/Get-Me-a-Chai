"use client"
import React,{useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Search from './Search'


const Navbar = () => {
    const { data: session } = useSession()

    const [showdropdown, setshowdropdown] = useState(false)


    return (
        <nav className='bg-black text-white flex justify-between items-center px-6 md:h-16 z-10 flex-col md:flex-row gap-2'>
            <Link href={"/"}>
            <div className="logo font-bold text-xl flex justify-center items-end">
                <img src="./tea.gif" width={38} alt="tea" />
                <span> GetMeAChai! </span>
            </div>
            </Link>
            {/* <ul className='flex justify-between gap-4'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul> */}

            <div className=' relative p-3'>
            <Search />
                {session && <>
                    <button onClick={()=>{setshowdropdown(!showdropdown)}} onBlur={()=>{setTimeout(()=>{setshowdropdown(false)},200);}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" mx-4 text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.name} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>

                    
                    <div id="dropdown" className={`z-10  ${showdropdown?"":"hidden"} absolute left-[100px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link> 
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            <li>
                                <Link  onClick={() => { signOut() }} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log out</Link>
                            </li>
                        </ul>
                    </div>
                </>
                }

                {!session && <Link href={"/login"}>
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2">Login</button>
                </Link>}

            </div>


        </nav>
    )
}

export default Navbar

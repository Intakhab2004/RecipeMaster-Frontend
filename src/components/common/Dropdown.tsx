"use client"


import { FaUser } from "react-icons/fa";
import { GiCampCookingPot } from "react-icons/gi";
import { MdOutlineChecklist } from "react-icons/md";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Contact2Icon, IndentIncrease, LayoutDashboard, LogIn, LogOut, LogOutIcon, LucideHome } from "lucide-react";


export function DesktopDropdown(){
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer">
                    <FaUser size={20} className="text-gray-800 dark:text-white"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="start">
                <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/dashboard" className=" flex gap-2 items-center font-semibold">
                            <LayoutDashboard /> Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <button 
                            // onClick={() => signOut({callbackUrl: "/"})} 
                            className="flex gap-2 items-center text-gray-500 dark:text-gray-400 font-medium cursor-pointer"
                        >
                            <LogOut className='w-5 h-5'/> Logout
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export function MobileDropdown(){

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer">
                    <FaUser size={20} className="text-gray-800 dark:text-white"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="start">
                <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/" className=" flex gap-2 items-center font-semibold">
                            <LucideHome /> Home
                        </Link>
                    </DropdownMenuItem>
                    {
                        true && (
                            <DropdownMenuItem>
                                <Link href="/dashboard" className=" flex gap-2 items-center font-semibold">
                                    <LayoutDashboard /> Dashboard
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {
                        true && (
                            <DropdownMenuItem>
                                <Link href="/notes-collections" className=" flex gap-2 items-center font-semibold">
                                    <GiCampCookingPot /> Get Recipe
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {
                        true && (
                            <DropdownMenuItem>
                                <Link href="/upload-notes" className=" flex gap-2 items-center font-semibold">
                                    <MdOutlineChecklist /> Log Nutrition
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {true && <DropdownMenuSeparator />}

                    <DropdownMenuItem>
                        <Link href="/about" className=" flex gap-2 items-center font-semibold">
                            <IndentIncrease/> About
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/contact" className=" flex gap-2 items-center font-semibold">
                            <Contact2Icon/> Contact Us
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        {
                            !true ? (
                                            <Link href="/sign-up" className=" flex gap-2 items-center font-semibold">
                                                <LogIn /> Sign up
                                            </Link>
                                        ) 
                                        : 
                                        (
                                            <button 
                                                // onClick={() => signOut({callbackUrl: "/"})} 
                                                className="flex gap-2 items-center justify-center w-full font-semibold border-1 rounded-md py-1 px-4 transition-all duration-300 border-gray-400 
                                                text-black/90 bg-gradient-to-r from-red-300 to-gray-100 shadow-sm"
                                            >
                                                <LogOutIcon className="text-black"/> Logout
                                            </button>
                                        )
                        }
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



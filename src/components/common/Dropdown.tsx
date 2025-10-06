"use client"


import { FaTools, FaUser } from "react-icons/fa";
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
import { Contact2Icon, IndentIncrease, LayoutDashboard, Loader2, LogIn, LogOut, LucideHome } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


export function DesktopDropdown(){
    const {logoutLoader, logout} = useAuth();

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
                            disabled={logoutLoader}
                            onClick={logout}
                            className="flex gap-2 items-center text-gray-500 dark:text-gray-400 font-medium cursor-pointer"
                        >
                            {
                                logoutLoader ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </>
                                ) 
                                : 
                                (
                                    <>
                                        <LogOut className='w-5 h-5'/> Logout
                                    </>
                                )
                            }
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export function MobileDropdown(){
    const {user, logoutLoader, logout} = useAuth();

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
                        user && (
                            <DropdownMenuItem>
                                <Link href="/dashboard" className=" flex gap-2 items-center font-semibold">
                                    <LayoutDashboard /> Dashboard
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {
                        user && (
                            <DropdownMenuItem>
                                <Link href="/notes-collections" className=" flex gap-2 items-center font-semibold">
                                    <GiCampCookingPot /> Get Recipe
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {
                        user && (
                            <DropdownMenuItem>
                                <Link href="/upload-notes" className=" flex gap-2 items-center font-semibold">
                                    <MdOutlineChecklist /> Log Nutrition
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {user && <DropdownMenuSeparator />}

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
                        <Link href="/features" className=" flex gap-2 items-center font-semibold">
                            <FaTools /> Features
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        {
                            !user ? (
                                            <Link href="/sign-up" className=" flex gap-2 items-center font-semibold">
                                                <LogIn /> Sign up
                                            </Link>
                                        ) 
                                        : 
                                        (
                                            <button
                                                disabled={logoutLoader}
                                                onClick={logout}
                                                className="flex gap-2 items-center text-gray-500 dark:text-gray-400 font-medium cursor-pointer"
                                            >
                                                {
                                                    logoutLoader ? (
                                                                <>
                                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                                                </>
                                                    ) 
                                                    : 
                                                    (
                                                        <>
                                                            <LogOut className='w-5 h-5'/> Logout
                                                        </>
                                                    )
                                                }
                                            </button>
                                        )
                        }
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



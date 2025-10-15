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
import { Contact2Icon, IndentIncrease, LayoutDashboard, Loader2, LogIn, LogOut, LucideHome, Settings, TimerReset } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


export function DesktopDropdown(){
    const {logoutLoader, logout} = useAuth();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className="p-2 rounded-md bg-white dark:bg-[#2A2A2A] hover:bg-gray-300 dark:hover:bg-gray-600 border border-[#FF7043] cursor-pointer">
                    <FaUser size={20} className="text-[#FF5722]"/>
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
                <div className="p-2 rounded-md bg-white dark:bg-[#2A2A2A] hover:bg-gray-300 dark:hover:bg-gray-600 border border-[#FF7043] cursor-pointer">
                    <FaUser size={20} className="text-[#FF5722]"/>
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
                                <Link href="/get-recipe" className=" flex gap-2 items-center font-semibold">
                                    <GiCampCookingPot /> Get Recipe
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {
                        user && (
                            <DropdownMenuItem>
                                <Link href="/log-nutrition" className=" flex gap-2 items-center font-semibold">
                                    <MdOutlineChecklist /> Log Nutrition
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                    {
                        user && (
                            <DropdownMenuItem>
                                <Link href="/recent-recipe" className=" flex gap-2 items-center font-semibold">
                                    <TimerReset /> Recent Recipe
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
                    {
                        user && (
                            <DropdownMenuItem>
                                <Link href="/setting" className=" flex gap-2 items-center font-semibold">
                                    <Settings /> Settings
                                </Link>
                            </DropdownMenuItem>
                        )
                    }

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



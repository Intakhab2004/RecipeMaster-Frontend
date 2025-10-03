"use client"

import Link from "next/link"
import logo from "@/assets/logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { DesktopDropdown, MobileDropdown } from "./Dropdown";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";



const links = ["Home", "About", "Contact", "Features"];


export default function NavBar(){
    const {token, setToken, loading} = useAuth();
    const pathName = usePathname();

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <header className="sticky top-0 z-50 bg-[#FFF8F0]/90 dark:bg-[#1F1F1F]/90 backdrop-blur-md shadow-md transition-colors duration-300">
            <nav className="w-full md:max-w-4/5 mx-auto flex justify-between items-center py-3 px-3 md:px-0">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src={logo.src}
                        alt="Logo image"
                        width={140}
                        className="dark:invert"
                    />
                </Link>

                {/* Nav Links */}
                
                <div className="hidden md:flex gap-6 font-bold text-gray-800 dark:text-gray-200">
                    {
                        links.map((link, idx) => {
                            const href = link === "Home" ? "/" : `/${link.toLowerCase()}`;
                            const activeLink = pathName === href;
                            return (
                                <Link
                                    key={idx}
                                    href={href}
                                    className={`${activeLink ? "text-[#FF5722]" : ""} hover:text-[#e27351] dark:hover:text-[#e8876a] transition-colors duration-300`}
                                >
                                {link}
                            </Link>
                            )
                        })
                    }
                </div>

                <div className="flex items-center gap-3">
                    {
                        !token ? (
                            <div className="hidden md:flex gap-3">
                                <Link 
                                    href="/signin"
                                    className="px-4 py-[6px] font-semibold rounded-md bg-orange-500 text-white cursor-pointer 
                                        hover:bg-orange-600 transition"
                                >
                                    Sign In    
                                </Link>
                                <Link 
                                    href="/sign-up"
                                    className="px-4 py-[6px] font-semibold rounded-md bg-gray-800 text-white cursor-pointer 
                                        hover:bg-gray-900 transition"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )
                        :
                        (
                            <div className="hidden md:flex">
                                <DesktopDropdown />
                            </div>
                        )
                    }
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 md:hidden">
                    <MobileDropdown />
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}



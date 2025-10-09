"use client"

import { Moon } from "lucide-react"
import { Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"


export const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if(!mounted) return null;

    return(
        <div
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full cursor-pointer bg-white dark:bg-[#2A2A2A] hover:bg-gray-300 dark:hover:bg-gray-600 
                border border-[#FF7043] transition-colors duration-300"
        >
            {
                theme === "light" ? (
                                        <Moon size={20} className="text-gray-800"/>
                                    ) :
                                    (
                                        <Sun size={20} className="text-yellow-300"/>
                                    )
            }
        </div>
    )
}
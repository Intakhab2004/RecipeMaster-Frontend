"use client"

import { LayoutDashboard, Salad, LogIn, LogOut, Settings, TimerReset } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
    const menuItems = [
        { name: "Get Recipe", icon: <Salad size={20} />, href: "/get-recipe" },
        { name: "Log Nutrition", icon: <LogIn size={20} />, href: "/log-nutrition" },
        { name: "Recent Recipe", icon: <TimerReset size={20} />, href: "/recent-recipe"},
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
        { name: "Settings", icon: <Settings size={20} />, href: "/setting"}
    ]

    return (
        <aside
            className="sticky top-[80px] h-[calc(100vh-80px)] w-60 bg-gradient-to-b from-[#FF7043] to-[#FF5722] 
            dark:from-[#2C2C2C] dark:to-[#1F1F1F] shadow-lg flex flex-col justify-between transition-all duration-300 rounded-r-3xl"
        >
            <div className="flex flex-col gap-2 mt-8 px-4">
                {
                    menuItems.map((item, index) => (
                        <Link
                            href={item.href}
                            key={index}
                            className="flex items-center gap-2 py-2 px-3 rounded-xl text-white dark:text-gray-100 hover:bg-white/20 
                                dark:hover:bg-[#FF5722]/30 transition-all duration-300"
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))
                }
            </div>

            <div className="p-4 border-t border-white/20">
                <Button
                    className="w-full flex items-center justify-center gap-3 bg-white text-[#FF5722] dark:bg-[#FF5722] 
                        dark:text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 py-3"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </Button>
            </div>
        </aside>
    )
}

"use client"


import { ReactNode, useEffect, useState } from "react";
import CoffeeLoader from "./common/CoffeeLoader";


export default function AppMountWrapper({children}: {children: ReactNode}){
    const [mounted, setMounted] = useState(false)
    
    // It is for checking the system's theme before mounting the UI.
    useEffect(() => {
        setMounted(true)
    }, [])
    
    if (!mounted){
        return (
            <div className="flex items-center justify-center min-h-screen bg-orange-50 dark:bg-[#1F1F1F]">
                <CoffeeLoader />
            </div>
        )
    }

    return <>{children}</>
}
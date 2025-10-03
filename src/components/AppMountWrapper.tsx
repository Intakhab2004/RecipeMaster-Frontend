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
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 
                dark:bg-gradient-to-b dark:from-blue-900 dark:to-black/90"
            >
                <CoffeeLoader />
            </div>
        )
    }

    return <>{children}</>
}
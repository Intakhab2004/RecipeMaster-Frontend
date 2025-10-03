"use client"


import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({children}: {children: ReactNode} ) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const tokenString = Cookies.get("token") ?? null;
        setToken(tokenString);

        setLoading(false);
        
    }, [])

    return (
        <AuthContext.Provider value={{token, setToken, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
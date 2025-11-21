"use client"


import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import axios, { isAxiosError } from "axios";
import { auth, getData } from "@/services/apiUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */


interface AuthContextType {
    user: any | null;
    setUser: (user: any | null) => void;
    fetchUser: () => void;
    loading: boolean;
    logoutLoader: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({children}: {children: ReactNode} ) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [logoutLoader, setLogoutLoader] = useState(false);
    const router = useRouter();

    const fetchUser = async() => {
        setLoading(true);

        try{
            const response = await axios.get(getData.USER_DETAILS_API, {withCredentials: true});
            if(response.data.success) setUser(response.data.user);
            else setUser(null);
        }
        catch(error){
            if(isAxiosError(error)){
                console.log("Something went wrong while fetching user data: ", error.response?.data);
            }
            else if(error instanceof Error){
                console.log("General error: ", error.message);
            }
            else{
                console.log("An unknown error: ", error);
            }

            setUser(null);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!user){
            fetchUser();
        }
    }, [])

    const logout = async() => {
        setLogoutLoader(true);

        try{
            const response = await axios.post(auth.LOGOUT_API, {}, {withCredentials: true});
            if(response.data.success){
                setUser(null);

                const toastId = toast(
                    "Success ✅",
                    {
                        description: response.data.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )

                router.replace("/sign-in");
            }
        }
        catch(error){
            console.error("Logout failed:", error);
            const toastId = toast(
                "Logout Failed",
                    {
                    description: "Internal server error",
                    action: {
                        label: "Dismiss",
                        onClick: () => {
                            toast.dismiss(toastId);
                        }
                    }
                }
            )
        }
        finally{
            setLogoutLoader(false);
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, fetchUser, loading, logoutLoader, logout}}>
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
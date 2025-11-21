"use client";

import React, { useState } from "react";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import axios, { isAxiosError } from "axios";
import { auth } from "@/services/apiUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/schemas/signinSchema";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage(){
    const [loader, setLoader] = useState(false);
    const {setUser} = useAuth();
    const router = useRouter();


    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })


    const submitHandler = async(data: z.infer<typeof signinSchema>) => {
        setLoader(true);

        try{
            const response = await axios.post(auth.SIGN_IN_API, data, {withCredentials: true});
            setUser(response.data.user);
            if(response.data.success){
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

                router.replace(`/dashboard`);
            }
            
        }
        catch(error: unknown){
            if(isAxiosError(error)){
                console.log("Something went wrong while signup: ", error.response?.data);
                const toastId = toast(
                    "Something went wrong while signing up",
                    {
                        description: error.response?.data?.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId);
                            }
                        }
                    }
                )
            }
            else if(error instanceof Error){
                console.log("General error:", error.message);
                const toastId = toast(
                    "Unexpected error",
                    {
                        description: error.message,
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId)
                            },
                        },
                    }
                )
            }
            else{
                console.log("An unknown error: ", error);
                const toastId = toast(
                    "Something went wrong",
                    {
                        description: "Please try again later",
                        action: {
                            label: "Dismiss",
                            onClick: () => {
                                toast.dismiss(toastId)
                            },
                        },
                    }
                )
            }
        }
        finally{
            setLoader(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] dark:bg-[#1F1F1F] p-2">
            <div className="relative max-w-lg w-full bg-white dark:bg-[#2A2A2A] rounded-2xl shadow-xl p-5 md:p-12 overflow-hidden">
                <div className="absolute top-0 md:top-10 -left-3 md:left-1 text-5xl">🍕</div>
                <div className="absolute bottom-0 md:bottom-10 -right-3 md:right-10 text-5xl">🍔</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-20 animate-spin-slow">🍩</div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#FF5722] dark:text-[#FF7043] mb-3 md:mb-6 text-center">
                    RecipeMaster 🍴
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-5 md:mb-8">
                    Get into the RecipeMaster with your credentials and start exploring delicious recipes!
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                                        Email / Username
                                    </FormLabel>
                                    <FormControl>
                                        <input 
                                            {...field}
                                            placeholder="Email or Username" 
                                            className="w-full px-4 py-2 text-[15px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 
                                                focus:ring-orange-400 outline-none transition"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <input 
                                            {...field}
                                            type="password"
                                            placeholder="Enter Password" 
                                            className="w-full px-4 py-2 text-[15px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 
                                                focus:ring-orange-400 outline-none transition"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <button
                            type="submit"
                            disabled={loader}
                            className="w-full flex justify-center items-center py-3 bg-[#FF5722] dark:bg-[#FF7043] text-white font-bold rounded-xl hover:bg-[#FF7043] dark:hover:bg-[#FF8A65] transition-colors text-lg"
                        >
                            {
                                loader ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </>
                                ) 
                                : 
                                ("Sign In")
                            }
                        </button>
                    </form>
                </Form>

                {/* Footer */}
                <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="text-[#FF5722] dark:text-[#FF7043] font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

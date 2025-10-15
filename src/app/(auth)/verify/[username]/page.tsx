"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios, { isAxiosError } from "axios";
import { auth } from "@/services/apiUrl";
import { useParams, useRouter } from "next/navigation";


export default function VerifyOtpPage() {
    const [loader, setLoader] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [resendLoader, setResendLoader] = useState(false);
    const params = useParams<{username: string}>();
    const router = useRouter();


    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            otpCode: ""
        }
    })

    // Countdown for resend button
    useEffect(() => {
        if(resendTimer > 0){
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }

    }, [resendTimer])


    const submitHandler = async(data: z.infer<typeof verifySchema>) => {
        setLoader(true);

        try{
            const response = await axios.post(auth.VERIFY_API, {
                username: params.username,
                otpCode: data.otpCode
            })

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

                router.replace("/sign-in");
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
                        }
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
                        }
                    }
                )
            }
        }
        finally{
            setLoader(false);
        }
    }


    const handleResendOTP = async() => {
        setResendLoader(true)

        try{
            const response = await axios.post(auth.SEND_OTP_API, {username: params.username});
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
            }

            setResendTimer(30);
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
                        }
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
                        }
                    }
                )
            }
        } 
        finally{
            setResendLoader(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] dark:bg-[#1F1F1F] p-4">
            <div className="relative w-full max-w-md bg-white dark:bg-[#2A2A2A] rounded-2xl shadow-xl p-6 md:p-10 overflow-hidden">
                <div className="absolute -top-4 left-4 text-4xl">🍕</div>
                <div className="absolute top-1/2 -right-4 text-4xl">🍔</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-6xl opacity-20 animate-spin-slow">🍩</div>

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-2">
                        <Mail className="h-10 w-10 text-[#FF5722] dark:text-[#FF7043] animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#FF5722] dark:text-[#FF7043]">Verify Your OTP 🔐</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                        We&apos;ve sent a 6-digit code to your registered email.
                    </p>
                </div>

                {/* OTP Inputs */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="otpCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                                        6-Digits OTP
                                    </FormLabel>
                                    <FormControl>
                                        <input 
                                            {...field}
                                            placeholder="XXXXXX" 
                                            className="w-full px-4 py-2 text-[15px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 
                                                focus:ring-orange-400 outline-none transition"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Verify Button */}
                        <button
                            type="submit"
                            disabled={loader}
                            className="w-full flex justify-center items-center py-3 bg-[#FF5722] dark:bg-[#FF7043] text-white font-bold rounded-xl 
                                hover:bg-[#FF7043] dark:hover:bg-[#FF8A65] transition-colors text-lg"
                        >
                            {
                                loader ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying...
                                    </>
                                ) 
                                : 
                                (
                                    "Verify OTP"
                                )
                            }
                        </button>
                    </form>
                </Form>

                {/* Resend Section */}
                <div className="text-center mt-5">
                    {
                        resendTimer > 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Resend OTP in <span className="font-semibold text-[#FF5722]">{resendTimer}s</span>
                            </p>
                        ) 
                        : 
                        (
                            <button
                                onClick={handleResendOTP}
                                disabled={resendLoader}
                                className="flex justify-center items-center gap-2 mx-auto text-[#FF5722] dark:text-[#FF7043] 
                                    hover:underline text-sm font-semibold"
                            >
                                <RotateCcw className={`h-4 w-4 ${resendLoader ? "animate-spin" : ""}`} /> 
                                {
                                    resendLoader ? "Resending..." : "Resend OTP"
                                }
                            </button>
                        )
                    }
                </div>

                <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm">
                    Wrong email?{" "}
                    <Link href="/sign-up" className="text-[#FF5722] dark:text-[#FF7043] font-semibold hover:underline">
                        Go Back
                    </Link>
                </p>
            </div>
        </div>
    )
}

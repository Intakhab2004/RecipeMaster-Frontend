"use client";

import React from "react";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function SignUpPage(){

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const submitHandler = async(data: z.infer<typeof signUpSchema>) => {

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] dark:bg-[#1F1F1F] p-2">
            <div className="relative max-w-lg w-full bg-white dark:bg-[#2A2A2A] rounded-2xl shadow-xl p-5 md:p-12 overflow-hidden">
                <div className="absolute top-0 md:top-10 -left-3 md:left-1 text-5xl animate-bounce-slow">🍕</div>
                <div className="absolute bottom-0 md:bottom-10 -right-3 md:right-10 text-5xl animate-bounce-slow animation-delay-500">🍔</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-20 animate-spin-slow">🍩</div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#FF5722] dark:text-[#FF7043] mb-3 md:mb-6 text-center">
                    Join RecipeMaster 🍴
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-5 md:mb-8">
                    Create your account and start exploring delicious recipes!
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <input 
                                            {...field} 
                                            placeholder="Enter Username"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <input 
                                            {...field}
                                            placeholder="abc@example.com" 
                                            className="w-full px-4 py-2 text-[15px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 
                                                focus:ring-orange-400 outline-none transition"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Passwords on same row */}
                        <div className="flex gap-4">
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                {...field}
                                                type="password"
                                                placeholder="Confirm Password" 
                                                className="w-full px-4 py-2 text-[15px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 
                                                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 
                                                    focus:ring-orange-400 outline-none transition"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#FF5722] dark:bg-[#FF7043] text-white font-bold rounded-xl hover:bg-[#FF7043] dark:hover:bg-[#FF8A65] transition-colors text-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                </Form>

                {/* Footer */}
                <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-[#FF5722] dark:text-[#FF7043] font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

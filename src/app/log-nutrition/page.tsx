"use client"


import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import Sidebar from "@/components/common/Sidebar";
import z from "zod";
import { useForm } from "react-hook-form";
import { customMealSchema } from "@/schemas/customMealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axios, { isAxiosError } from "axios";
import { nutrition } from "@/services/apiUrl";
import { toast } from "sonner";

interface itemType {
    customMeals: string,
    nutrition: {
        calories: string,
        protein: string,
        carbs: string,
        fat: string
    },
    createdAt: Date,
}

interface SummaryType {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export default function NutritionLog() {

    const [range, setRange] = useState("7");
    const [loader, setLoader] = useState(false);
    const { user, fetchUser } = useAuth();

    // Auto-summary based on dummy logs
    const summary = user?.nutritionLogs?.reduce((acc: SummaryType, item: itemType) => {
            acc.calories += parseInt(item.nutrition.calories);
            acc.protein += parseInt(item.nutrition.protein);
            acc.carbs += parseInt(item.nutrition.carbs);
            acc.fat += parseInt(item.nutrition.fat);
            return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 } as SummaryType
    );

    const form = useForm<z.infer<typeof customMealSchema>>({
        resolver: zodResolver(customMealSchema),
        defaultValues: {
            recipeName: "",
            calories: "",
            protein: "",
            carbs: "",
            fat: ""
        }
    })

    const submitHandler = async(data: z.infer<typeof customMealSchema>) => {
        try{
            setLoader(true);

            const response = await axios.post(nutrition.LOG_MANUAL_NUTRITION_API, data, {withCredentials: true});
            if(response.data.success){
                fetchUser();
                console.log("Meal nutritions logged successfully");
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
        }
        catch(error: unknown){
            if(isAxiosError(error)){
                console.log("Something went wrong while logging meal: ", error.response?.data);
                const toastId = toast(
                    "Something went wrong",
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
            form.reset();
        }
    }

    return (
        <section className="min-h-screen flex flex-col bg-[#FFF8F0] dark:bg-[#1F1F1F] text-gray-800 dark:text-gray-100 transition-all duration-300">
            <div className="fixed top-0 left-0 w-full z-50">
                <NavBar />
            </div>

            <div className="flex flex-1 pt-[80px]">
                <div className="hidden md:block w-64">
                    <Sidebar />
                </div>

                <main className="flex-1 px-4 py-6 md:p-12 pb-20 overflow-y-auto">
                    <div className="mb-10 bg-gradient-to-br from-[#FFE3D2] to-[#FFD0B3] dark:from-[#2A2A2A] dark:to-[#1D1D1D] p-10 rounded-3xl shadow-lg">
                        <h1 className="text-4xl font-extrabold text-[#FF5722] dark:text-[#FF8A65]">
                            Your Nutrition Dashboard
                        </h1>

                        <p className="max-w-2xl mt-3 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                            Monitor your meals, track your macros, and get insights that help you maintain a balanced diet. Your logs are automatically organized and analyzed for the last 
                            <span className="font-bold text-[#FF5722]"> 30 days</span>.
                        </p>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 italic">
                            * Keep your fitness journey aligned with precise nutrition tracking.
                        </p>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-3">
                            Nutrition Summary Overview
                        </h2>

                        <div className="flex gap-4 mb-6">
                            {
                                ["7", "30"].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setRange(num)}
                                        className={`px-6 py-2 rounded-xl border font-medium transition-all duration-300 ${range === num ? 
                                            "bg-[#FF5722] text-white border-[#FF7043]" : "border-[#FF7043] text-[#FF5722] dark:text-[#FF8A65] hover:bg-[#FFE3D2]"}`}
                                    >
                                        Last {num} Days
                                    </button>
                                ))
                            }
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {
                                [
                                    { label: "Calories (kcal)", value: summary.calories }, { label: "Protein (g)", value: summary.protein },
                                    { label: "Carbs (g)", value: summary.carbs }, { label: "Fats (g)", value: summary.fat },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="backdrop-blur-xl bg-white/70 dark:bg-[#1F1F1F]/50 px-4 py-8 md:p-8 rounded-2xl shadow-md 
                                            border border-[#FF7043]/20 hover:scale-[1.03] transition-all duration-300 text-center"
                                    >
                                        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                                            {item.label}
                                        </p>
                                        <h3 className="text-3xl font-bold text-[#FF5722] dark:text-[#FF8A65] mt-1">
                                            {item.value}
                                        </h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#2A2A2A] p-8 rounded-3xl shadow-xl mb-10">
                        <h2 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-4">
                            Add a Custom Meal
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Log your meals manually to maintain accuracy. This is useful when consuming items 
                            not available in the recipe database.
                        </p>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                                <FormField
                                    control={form.control}
                                    name="recipeName"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                            <input
                                                {...field}
                                                placeholder="Meal Name"
                                                className="bg-transparent border-b-2 border-gray-400 pb-2 focus:border-[#FF5722] outline-none transition-all"
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="calories"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                            <input
                                                {...field}
                                                placeholder="Calories (kcal)"
                                                className="bg-transparent border-b-2 border-gray-400 pb-2 focus:border-[#FF5722] outline-none transition-all"
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="protein"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                            <input
                                                {...field}
                                                placeholder="Protein (g)"
                                                className="bg-transparent border-b-2 border-gray-400 pb-2 focus:border-[#FF5722] outline-none transition-all"
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="carbs"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                            <input
                                                {...field}
                                                placeholder="Carbs (g)"
                                                className="bg-transparent border-b-2 border-gray-400 pb-2 focus:border-[#FF5722] outline-none transition-all"
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fat"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                            <input
                                                {...field}
                                                placeholder="Fats (g)"
                                                className="bg-transparent border-b-2 border-gray-400 pb-2 focus:border-[#FF5722] outline-none transition-all"
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="col-span-full text-base bg-[#FF5722] text-white py-6 rounded-xl mt-4 hover:bg-white hover:text-[#FF5722] 
                                        border border-[#FF7043] transition-all duration-300 font-semibold shadow-md cursor-pointer"
                                >
                                    {
                                        loader ? (
                                            <div className="flex items-center">
                                                <Loader2 className="mr-2 animate-spin" /> Saving...
                                            </div>
                                        )
                                        :
                                        "Add Log"
                                    }
                                </Button>
                            </form>
                        </Form>
                    </div>

                    <div className="bg-white dark:bg-[#2A2A2A] p-8 rounded-3xl shadow-xl">
                        <h2 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-6 flex items-center gap-2">
                            Your Meal History
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                user?.nutritionLogs && user.nutritionLogs.length > 0 ? (
                                    user.nutritionLogs.map((log: itemType, index: number) => (
                                        <div
                                            key={index}
                                            className="bg-white dark:bg-[#1F1F1F] p-6 rounded-3xl shadow-md hover:scale-[1.03] border border-transparent 
                                                hover:border-[#FF7043]/30 transition-all duration-300"
                                        >
                                            <h3 className="text-xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-2">
                                                {log.customMeals}
                                            </h3>

                                            <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                                                <li>Calories: <b>{log.nutrition.calories}kcal</b></li>
                                                <li>Protein: <b>{log.nutrition.protein}g</b></li>
                                                <li>Carbs: <b>{log.nutrition.carbs}g</b></li>
                                                <li>Fat: <b>{log.nutrition.fat}g</b></li>
                                            </ul>

                                            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                                                Logged on {new Date(log.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))
                                ) 
                                : 
                                (
                                    <p>
                                        No nutrition log records found. Start adding your meals to track your daily nutrition!
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </main>
            </div>

            <footer className="w-full mt-auto">
                <Footer />
            </footer>
        </section>
    );
}

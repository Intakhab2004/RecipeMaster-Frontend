"use client"

import Footer from "@/components/common/Footer"
import NavBar from "@/components/common/NavBar"
import RecipeCard from "@/components/common/RecipeCard"
import Sidebar from "@/components/common/Sidebar"
import { useEffect, useState } from "react"
import { recipeType } from "../get-recipe/page"
import axios, { isAxiosError } from "axios"
import { toast } from "sonner"
import { getData } from "@/services/apiUrl"
import { Loader2 } from "lucide-react"


export default function RecentRecipe(){
    const [recentRecipes, setRecentRecipes] = useState<recipeType[]>([]);

    useEffect(() => {
        const getRecentRecipes = async() => {
            try{
                const response = await axios.get(getData.RECENT_RECIPE_API, {withCredentials: true});
                if(response.data.success){
                    console.log("Recipes generated successfully: ", response.data.recipes);
                    setRecentRecipes(response.data.recentRecipe || []);
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
                                onClick: () => toast.dismiss(toastId),
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
                                onClick: () => toast.dismiss(toastId),
                            },
                        }
                    )
                }
            }
        }

        getRecentRecipes();

    }, [recentRecipes]);


    return (
        <section className="min-h-screen flex flex-col bg-[#FFF8F0] dark:bg-[#1F1F1F] text-gray-800 dark:text-gray-100 transition-all duration-300">
            <div className="fixed top-0 left-0 w-full z-50">
                <NavBar />
            </div>
        
            <div className="flex flex-1 pt-[80px]">
                <div className="hidden md:block w-64">
                    <Sidebar />
                </div>
        
                <main className="flex-1 px-4 py-6 md:p-12 pb-20 overflow-y-auto bg-[#FFF8F0] dark:bg-[#1F1F1F] transition-colors duration-300">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FF5722] dark:text-[#FF8A65] mb-3">
                            Discover Delicious Recipes Instantly 🍲
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                            Enter your favorite ingredients and let us do the magic, we&apos;ll find recipes that perfectly match your cravings! Explore, cook, and enjoy every bite.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-6">
                            Recently Searched Recipes
                        </h2>

                        {
                            recentRecipes && recentRecipes.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {
                                        recentRecipes.map((recipe) => (
                                            <RecipeCard
                                                key={recipe.spoonacularId} 
                                                recipe={recipe} 
                                            />
                                        ))
                                    }
                                </div>
                            ) 
                            : 
                            (
                            <div className="flex flex-col items-center justify-center mt-10 text-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3820/3820331.png"
                                    alt="No recipes"
                                    className="w-32 h-32 opacity-80 mb-4"
                                />
                                <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                                    No recent recipes found. Try searching something tasty!
                                </p>
                            </div>
                            )
                        }
                    </div>
                </main>

            </div>
        
            <footer className="w-full mt-auto">
                <Footer />
            </footer>
        </section>
    )
}
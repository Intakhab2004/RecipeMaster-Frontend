"use client"

import { recipeType } from "@/app/get-recipe/page";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import Sidebar from "@/components/common/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { recipe } from "@/services/apiUrl";
import axios, { isAxiosError } from "axios";
import { Heart, Loader2 } from "lucide-react";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function RecipeDetails(){
    const [loader, setLoader] = useState(false);
    const [saveLoader, setSaveLoader] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState<recipeType | null>(null);
    const { fetchUser } = useAuth();

    const params = useParams();
    const { recipeId } = params;

    useEffect(() => {
        const getRecipeDetails = async() => {
            setLoader(true);

            try{
                const response = await axios.put(recipe.RECIPE_SUMMARY_API, {recipeId}, {withCredentials: true});
                if(response.data.success){
                    console.log("Data fetched successfully: ", response.data.currentRecipe);
                    setRecipeDetails(response.data.recipeSummary);
                }
            }
            catch(error: unknown){
                if(isAxiosError(error)){
                    console.log("Something went wrong while fetching recipe details: ", error.response?.data);
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
            }
        }

        getRecipeDetails();

    }, [])


    const saveHandler = async() => {
        setSaveLoader(true);

        try{
            const response = await axios.post(recipe.SAVE_RECIPE_API, {recipeId}, {withCredentials: true});
            if(response.data.success){
                console.log("Recipe saved successfully");
                fetchUser();
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
                console.log("Something went wrong while saving the recipe: ", error.response?.data);
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
            setSaveLoader(false);
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
                
                {
                    loader ? (
                        <div className="w-full text-2xl font-bold flex flex-col justify-center items-center text-[#FF5722] dark:text-[#FF8A65]">
                            <Loader2 className="w-10 h-10 animate-spin" />
                            <p>Please wait...</p>
                        </div>
                    )
                    :
                    (
                        <main className="flex-1 px-6 py-12 md:px-12 md:py-16 bg-[#FFF8F0] dark:bg-[#1F1F1F] transition-colors duration-300">
                            <div className="flex flex-col items-center mb-12">
                                <img
                                    src={recipeDetails?.imageURL}
                                    alt={recipeDetails?.title}
                                    className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-2xl shadow-lg mb-6"
                                />
                                <h1 className="text-3xl md:text-4xl font-bold text-[#FF5722] dark:text-[#FF8A65] mb-2 text-center">
                                    {recipeDetails?.title}
                                </h1>
                                <p className="text-gray-700 dark:text-gray-300 text-center mb-4 px-4 md:px-0">
                                    {recipeDetails?.summary}
                                </p>
                                <div className="bg-[#FFF3E0] dark:bg-[#2A2A2A] px-4 py-2 rounded-xl shadow-md mb-6 text-center border-l-4 border-[#FF7043] animate-pulse">
                                    <span className="font-semibold text-[#FF5722] dark:text-[#FF8A65]">
                                        ⚠️ Make sure to save this recipe! It disappears in 24 hrs!
                                    </span>
                                </div>
                                <button
                                    onClick={saveHandler}
                                    disabled={saveLoader}
                                    className="flex items-center gap-2 bg-[#FF5722] hover:bg-[#FF7043] text-white px-6 py-3 
                                        rounded-xl shadow-lg font-semibold cursor-pointer transition-all duration-300"
                                >
                                    {
                                        saveLoader ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <Heart size={18} />
                                                Save Recipe
                                            </>
                                        )
                                    }
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                <div className="bg-white dark:bg-[#2A2A2A] rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                                    <h2 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-4">
                                        Fresh Ingredients 🍅
                                    </h2>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                        {
                                            recipeDetails?.ingredients.map((item, index) => (
                                                <li key={index}>
                                                    {item}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <div className="bg-white dark:bg-[#2A2A2A] rounded-3xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                                    <h2 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-4">
                                        Step-by-Step Instructions 👨‍🍳
                                    </h2>
                                    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                        {
                                            recipeDetails?.instructions.map((step, index) => (
                                                <li key={index}>
                                                    {step}
                                                </li>
                                            ))
                                        }
                                    </ol>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-[#FF7043] to-[#FF5722] dark:from-[#2C2C2C] dark:to-[#1F1F1F] rounded-3xl p-8 shadow-lg max-w-md mx-auto text-white mb-12">
                                <h2 className="text-2xl font-bold mb-4">Nutrition Facts 💪</h2>
                                <div className="grid grid-cols-2 gap-4 text-white font-medium">
                                    <p>Calories: {`${recipeDetails?.nutritions.calories}kcal`}</p>
                                    <p>Protein: {recipeDetails?.nutritions.protein}</p>
                                    <p>Carbs: {recipeDetails?.nutritions.carbs}</p>
                                    <p>Fat: {recipeDetails?.nutritions.fat}</p>
                                </div>
                            </div>

                            <div className="mt-6 text-center max-w-2xl mx-auto">
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-semibold">
                                    Unlock your culinary creativity and explore recipes that make every meal a masterpiece! 🍴✨
                                </p>
                            </div>
                        </main>
                    )
                }
            </div>
                
            <footer className="w-full mt-auto">
                <Footer />
            </footer>
        </section>
    )
}
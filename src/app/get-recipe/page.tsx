"use client"

import Footer from "@/components/common/Footer"
import NavBar from "@/components/common/NavBar"
import RecipeCard from "@/components/common/RecipeCard"
import Sidebar from "@/components/common/Sidebar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { recipeSchema } from "@/schemas/recipeSchema"
import { recipe } from "@/services/apiUrl"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { isAxiosError } from "axios"
import { Loader2, Search } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"


export interface recipeType {
    spoonacularId: number,
    title: string,
    imageURL: string,
    summary: string,
    ingredients: string[],
    instructions: string[],
    
    nutritions: {
        calories: string,
        protein: string,
        carbs: string,
        fat: string
    }
}


export default function GetRecipe(){
    const [loader, setLoader] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [recipes, setRecipes] = useState<recipeType[]>([]);


    const form = useForm<z.infer<typeof recipeSchema>>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            ingredients: ""
        }
    })

    const submitHandler = async(data: z.infer<typeof recipeSchema>) => {
        setLoader(true);
        setHasSearched(true);

        try{
            const response = await axios.post(recipe.GENERATE_RECIPE_API, data, {withCredentials: true});
            if(response.data.success){
                console.log("Recipes generated successfully: ", response.data.recipes);
                setRecipes(response.data.recipes || []);

                form.reset({ingredients: ""});
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
        finally{
            setLoader(false);
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
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#FF5722] dark:text-[#FF8A65] mb-4">
                            Find Your Perfect Recipe 🍲
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                            Discover delicious and healthy meals by simply entering the ingredients you have at home. Let RecipeMaster inspire your next plate!
                        </p>
                    </div>

                    <div className="flex justify-center mb-12">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(submitHandler)}
                                className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-[#2A2A2A] shadow-lg rounded-3xl p-6 w-full max-w-2xl"
                            >
                                <FormField
                                    control={form.control}
                                    name="ingredients"
                                    render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                        <input
                                            {...field}
                                            placeholder="Enter ingredients (e.g., tomato, pasta, cheese)"
                                            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 
                                                bg-[#FFF8F0] dark:bg-[#1F1F1F] text-gray-800 dark:text-gray-200 
                                                placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7043]"
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />

                                <button
                                    type="submit"
                                    disabled={loader}
                                    className="flex items-center justify-center gap-2 bg-[#FF5722] text-white px-6 py-3 rounded-xl 
                                    font-semibold hover:bg-[#FF7043] transition-all duration-300 shadow-md cursor-pointer"
                                >
                                    {
                                        loader ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <Search size={20} /> Search
                                            </>
                                        )
                                    }
                                </button>
                            </form>
                        </Form>
                    </div>

                    {
                        recipes?.length > 0 ? (
                            <div>
                                <h2 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-6 text-center">
                                    Suggested Recipes
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {
                                        recipes.map((recipe) => (
                                            <RecipeCard
                                                key={recipe.spoonacularId}
                                                recipe={recipe}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                        :
                        (
                            hasSearched && (
                                <p className="text-2xl text-center font-bold text-gray-400">
                                    No recipes found for the entered ingredients
                                </p>
                            )
                        )
                    }
                </main>
            </div>

            <footer className="w-full mt-auto">
                <Footer />
            </footer>
        </section>
    )
}
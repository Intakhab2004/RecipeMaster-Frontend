"use client"

import Sidebar from "@/components/common/Sidebar"
import { Bookmark, Mail, User, Phone, Calendar, Heart, Loader2 } from "lucide-react"
import NavBar from "@/components/common/NavBar"
import Footer from "@/components/common/Footer"
import { recipeType } from "../get-recipe/page"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios, { isAxiosError } from "axios"
import { toast } from "sonner"
import { recipe } from "@/services/apiUrl"

export default function Dashboard() {
    const [loader, setLoader] = useState(false);
    const { user, fetchUser } = useAuth();
    const router = useRouter();



    const handleDelete = async(recipeId: number) => {
        setLoader(true);

        try{
            const response = await axios.delete(
                recipe.DELETE_RECIPE_API,
                {
                    data: {recipeId},
                    withCredentials: true
                }
            )
            if(response.data.success){
                fetchUser();
                console.log("Recipe deleted successfully");
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
                console.log("Something went wrong while deleting the recipe: ", error.response?.data);
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

    if(!user){
        return null;
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
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-[#2A2A2A] shadow-lg rounded-3xl 
                        p-8 mb-10 transition-all duration-300"
                    >
                        <img
                            src={user?.avatar?.imageURL ? user.avatar.imageURL : `https://api.dicebear.com/9.x/croodles/svg?seed=${user.username}`}
                            alt={user.name}
                            width={150}
                            height={150}
                            className="rounded-full shadow-md border-4 border-[#FF7043]"
                        />
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-[#FF5722] dark:text-[#FF8A65] mb-2">
                                {
                                    (user?.personalDetails?.firstName || user?.personalDetails?.lastName)
                                        ? `${user?.personalDetails?.firstName ?? ""} ${user?.personalDetails?.lastName ?? ""}`.trim()
                                        : "Full name"
                                }
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                @{user.username}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#2A2A2A] p-8 rounded-3xl shadow-lg mb-10">
                        <h3 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-6">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
                            <div className="flex items-center gap-3">
                                <Mail className="text-[#FF5722]" />
                                <span>Email: {user.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <User className="text-[#FF5722]" />
                                <span>Gender: {user?.personalDetails?.gender || "Not Mentioned"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="text-[#FF5722]" />
                                <span>Phone: {user?.personalDetails?.contactNumber || "Not Mentioned"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="text-[#FF5722]" />
                                <span>
                                    DOB: 
                                    {
                                        user?.personalDetails?.DOB ? new Date(user.personalDetails.DOB).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        :
                                        "Not Mentioned"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#2A2A2A] px-4 py-8 md:p-8 rounded-3xl shadow-lg">
                        <h3 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-6 flex items-center gap-2">
                            <Bookmark className="text-[#FF5722]" /> Saved Recipes
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                user?.favoriteRecipes?.length === 0 && (
                                    <p className="text-center col-span-full text-gray-600 dark:text-gray-300 text-lg">
                                        You haven't saved any recipes yet 🍽️
                                    </p>
                                )
                            }

                            {
                                user?.favoriteRecipes?.length > 0 && 
                                    user?.favoriteRecipes.map((recipe: recipeType) => (
                                        <div
                                            key={recipe.spoonacularId} 
                                            className="bg-white dark:bg-[#2A2A2A] rounded-3xl overflow-hidden shadow-md hover:scale-[1.03] 
                                                transition-transform duration-300 border border-transparent hover:border-[#FF7043]/50"
                                        >
                                            <img
                                                src={recipe.imageURL}
                                                alt={recipe.title}
                                                width={400}
                                                height={250}
                                                className="w-full h-48 object-cover"
                                            />

                                            <div className="p-5">
                                                <h3 className="text-xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-2">
                                                    {recipe.title}
                                                </h3>

                                                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                    Ingredients:
                                                </h4>

                                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF7043]/40">
                                                    {
                                                        recipe.ingredients.map((ing, index) => (
                                                            <li key={index}>
                                                                {ing}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>

                                                <div className="mt-5 flex gap-4">
                                                    <button
                                                        onClick={() => router.push(`/recipe-details/${recipe.spoonacularId}`)}
                                                        className="w-full bg-[#FF5722] border border-[#FF7043] text-white py-2 rounded-xl 
                                                        hover:bg-white hover:dark:bg-[#2A2A2A] hover:text-[#FF5722] 
                                                        cursor-pointer transition-all duration-300 font-medium"
                                                    >
                                                        View Recipe
                                                    </button>

                                                    <button
                                                        disabled={loader}
                                                        onClick={() => handleDelete(recipe.spoonacularId)}
                                                        className="w-full border border-[#FF7043] text-[#FF5722] 
                                                        dark:text-[#FF8A65] py-2 rounded-xl hover:bg-[#FF7043] 
                                                        hover:text-black hover:dark:text-black cursor-pointer 
                                                        transition-all duration-300 font-medium"
                                                    >
                                                        {
                                                            loader ? (
                                                                <div className="flex justify-center items-center">
                                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Wait
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                "Delete"
                                                            )
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </main>
            </div>

            <footer className="w-full mt-auto">
                <Footer />
            </footer>
        </section>
    )
}
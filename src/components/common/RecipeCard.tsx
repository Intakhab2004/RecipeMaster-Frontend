"use client"

import { recipeType } from "@/app/get-recipe/page";
import { useRouter } from "next/navigation";



export default function RecipeCard({recipe}: {recipe: recipeType}){
    const router = useRouter();


    return (
        <div className="bg-white dark:bg-[#2A2A2A] rounded-3xl overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300 
            border border-transparent hover:border-[#FF7043]/50"
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

                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    {
                        recipe.ingredients.map((ing, index) => (
                            <li key={index}>
                                {ing}
                            </li>
                        ))
                    }
                </ul>

                <button
                    onClick={() => router.push(`/recipe-details/${recipe.spoonacularId}`)}
                    className="mt-4 w-full bg-[#FF5722] text-white py-2 rounded-xl hover:bg-[#FF7043] cursor-pointer transition-all duration-300 font-medium"
                >
                    View Recipe
                </button>
            </div>
        </div>
    )
}
"use client"

import Sidebar from "@/components/common/Sidebar"
import { useState } from "react"
import { Bookmark, Mail, User, Phone, Calendar, Heart } from "lucide-react"
import NavBar from "@/components/common/NavBar"
import Footer from "@/components/common/Footer"

export default function Dashboard() {
  const [user] = useState({
    name: "",
    username: "john_doe",
    email: "john.doe@example.com",
    gender: "Male",
    phone: "+91 9876543210",
    dob: "1998-10-12",
    favoriteFood: "Paneer Butter Masala",
    avatar: ""
  })

  const savedRecipes = [
    {
      id: 1,
      title: "Spaghetti Aglio e Olio",
      image: "https://images.unsplash.com/photo-1601050690597-df555f8b43f6?w=600",
      desc: "A simple Italian pasta dish made with garlic, olive oil, and chili flakes.",
    },
    {
      id: 2,
      title: "Grilled Chicken Salad",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600",
      desc: "Healthy and flavorful salad topped with grilled chicken and veggies.",
    },
    {
      id: 3,
      title: "Avocado Toast",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600",
      desc: "Crispy toast layered with mashed avocado, lime, and chili flakes.",
    },
  ]

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
                            src={user.avatar ? user.avatar : `https://api.dicebear.com/9.x/croodles/svg?seed=${user.username}`}
                            alt={user.name}
                            width={150}
                            height={150}
                            className="rounded-full shadow-md border-4 border-[#FF7043]"
                        />
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-[#FF5722] dark:text-[#FF8A65] mb-2">
                                {
                                    user.name ? user.name : "Full Name"
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
                                <span>Gender: {user.gender}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="text-[#FF5722]" />
                                <span>Phone: {user.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="text-[#FF5722]" />
                                <span>DOB: {user.dob}</span>
                            </div>
                            <div className="flex items-center gap-3 md:col-span-2">
                                <Heart className="text-[#FF5722]" />
                                <span>Favorite Food: {user.favoriteFood}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#2A2A2A] px-4 py-8 md:p-8 rounded-3xl shadow-lg">
                        <h3 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-6 flex items-center gap-2">
                            <Bookmark className="text-[#FF5722]" /> Saved Recipes
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                savedRecipes.map((recipe) => (
                                    <div
                                        key={recipe.id}
                                        className="bg-[#FFF8F0] dark:bg-[#1F1F1F] rounded-2xl overflow-hidden shadow-md 
                                            hover:scale-[1.03] transition-transform duration-300"
                                    >
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            width={400}
                                            height={250}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h4 className="text-lg font-semibold text-[#FF5722] dark:text-[#FF8A65]">
                                                {recipe.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                {recipe.desc}
                                            </p>
                                            <button className="mt-3 bg-[#FF5722] text-white px-4 py-2 rounded-xl hover:bg-[#FF7043] transition-all text-sm font-medium">
                                                View Recipe
                                            </button>
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
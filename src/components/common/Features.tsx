"use client";

import Navbar from "@/components/common/NavBar";
import { Utensils, BarChart3, ClipboardList, Save, MessageSquare, Mic } from "lucide-react";

const features = [
    {
        icon: <Utensils className="w-10 h-10 text-[#FF5722]" />,
        title: "AI Recipe Generator",
        desc: "Enter the ingredients you have, and instantly generate delicious recipes tailored to your inputs."
    },

    {
        icon: <BarChart3 className="w-10 h-10 text-[#FF5722]" />,
        title: "Nutrition Tracker",
        desc: "Automatically log nutrition of generated recipes. Track your total intake for 7 or 30 days."
    },

    {
        icon: <ClipboardList className="w-10 h-10 text-[#FF5722]" />,
        title: "Manual Meal Logging",
        desc: "Add meals manually to track your nutrition and maintain complete health data."
    },

    {
        icon: <Save className="w-10 h-10 text-[#FF5722]" />,
        title: "Save Recipes",
        desc: "Save your favorite recipes for quick access and future reference."
    },

    {
        icon: <MessageSquare className="w-10 h-10 text-[#FF5722]" />,
        title: "Smart Chatbot (Coming Soon)",
        desc: "Get instant AI assistance for recipe suggestions and dietary guidance."
    },

    {
        icon: <Mic className="w-10 h-10 text-[#FF5722]" />,
        title: "Voice Instructions (Coming Soon)",
        desc: "Follow step-by-step cooking instructions using voice guidance for a hands-free experience."
    }
]

export default function Features(){
    return (
        <section className="min-h-screen bg-[#FFF8F0] dark:bg-[#1F1F1F] text-gray-900 dark:text-gray-100 scroll-smooth">
            <div className="px-6 md:px-16 py-16 bg-white dark:bg-[#2A2A2A] rounded-t-[3rem] text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#FF5722] dark:text-[#FF7043] mb-12">
                    Explore Our Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-8 bg-[#FFF8F0] dark:bg-[#1F1F1F] rounded-2xl shadow-md hover:shadow-xl hover:scale-105 
                                    transition-transform duration-300 border border-transparent hover:border-[#FF5722]"
                            >
                                <div className="flex justify-center mb-5">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="px-6 md:px-16 py-20 text-center bg-gray-100 dark:bg-[#2A2A2A] rounded-3xl mx-6 md:mx-16 mt-16 mb-10 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF5722] dark:text-[#FF7043]">
                    Future Advancements 🚀
                </h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                    Exciting features like a smart chatbot and voice-guided instructions are coming soon <br/>
                    to make your cooking experience even smarter!
                </p>
            </div>
        </section>
    )
}

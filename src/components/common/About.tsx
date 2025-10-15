"use client";

import Image from "next/image";
import { Heart, Brain, ChefHat } from "lucide-react";
import img1 from "@/assets/food2.jpg";
import img2 from "@/assets/food3.jpeg";
import img3 from "@/assets/food3.jpg";
import img4 from "@/assets/food4.jpg";

export default function About() {
    return (
        <section className="px-4 md:px-16 py-20 bg-[#FFF8F0] dark:bg-[#1F1F1F] text-gray-800 dark:text-gray-100 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 space-y-6 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        About{" "}
                        <span className="bg-gradient-to-r from-[#FF5722] to-[#FF7043] bg-clip-text text-transparent">
                            RecipeMaster
                        </span>{" "}
                        🍴
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        RecipeMaster isn&apos;t just another recipe app, it&apos;s your AI-powered
                        culinary companion. From generating recipes based on ingredients
                        you already have to tracking your nutrition seamlessly, it&apos;s built
                        to help you eat smart, live healthy, and cook with confidence.
                    </p>
                </div>

                <div className="hidden md:flex w-1/2 justify-center">
                    <Image
                        src={img1.src}
                        alt="Cooking image"
                        width={500}
                        height={350}
                        className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-10 text-center">
                <div className="group bg-white dark:bg-[#2A2A2A] rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 
                    transition-all duration-300"
                >
                    <Image
                        src={img2.src}
                        alt="Recipe Generator"
                        width={500}
                        height={300}
                        className="w-full h-52 object-cover"
                    />
                    <div className="p-8">
                        <ChefHat
                            className="mx-auto text-[#FF5722] dark:text-[#FF7043] mb-3 group-hover:scale-110 transition-transform duration-300"
                            size={50}
                        />
                        <h3 className="text-2xl font-semibold mb-2">
                            Recipe Generator
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Enter your available ingredients and let our smart AI craft unique, delicious recipes that fit your taste and lifestyle.
                        </p>
                    </div>
                </div>

                <div className="group bg-white dark:bg-[#2A2A2A] rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300">
                    <Image
                        src={img3.src}
                        alt="Nutrition Tracker"
                        width={500}
                        height={300}
                        className="w-full h-52 object-cover"
                    />
                    <div className="p-8">
                        <Heart
                            className="mx-auto text-[#FF5722] dark:text-[#FF7043] mb-3 group-hover:scale-110 transition-transform duration-300"
                            size={50}
                        />
                        <h3 className="text-2xl font-semibold mb-2">
                            Smart Nutrition Tracker
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Automatically log your meal&apos;s nutrition or add it manually to maintain a precise 7-day or 30-day health report.
                        </p>
                    </div>
                </div>

                <div className="group bg-white dark:bg-[#2A2A2A] rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300">
                    <Image
                        src={img4.src}
                        alt="AI features"
                        width={500}
                        height={300}
                        className="w-full h-52 object-cover"
                    />
                    <div className="p-8">
                        <Brain
                            className="mx-auto text-[#FF5722] dark:text-[#FF7043] mb-3 group-hover:scale-110 transition-transform duration-300"
                            size={50}
                        />
                        <h3 className="text-2xl font-semibold mb-2">
                            Future-Ready Features
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Get ready for upcoming innovations like an AI chatbot and voice-guided cooking for a futuristic kitchen experience.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-20 px-4 md:px-20 py-16 bg-gray-100 dark:bg-[#2A2A2A] rounded-3xl shadow-lg text-center">
                <h3 className="text-3xl font-bold text-[#FF5722] dark:text-[#FF7043] mb-6">
                    Our Vision 🌍
                </h3>
                <p className="max-w-4xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    RecipeMaster&apos;s mission is to make healthy cooking accessible and fun
                    for everyone. By blending artificial intelligence with culinary
                    creativity, we&apos;re building a future where every meal is an experience
                    sustainable, personalized, and delightful.
                </p>
            </div>
        </section>
    )
}

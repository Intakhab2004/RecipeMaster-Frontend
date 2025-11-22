"use client";

import Navbar from "@/components/common/NavBar";
import Image from "next/image";
import { Flame, UtensilsCrossed, Star } from "lucide-react";
import img1 from "@/assets/food1.webp";
import About from "@/components/common/About";
import Footer from "@/components/common/Footer";
import Features from "@/components/common/Features";
import Contact from "@/components/common/Contact";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<section className="min-h-screen bg-[#FFF8F0] dark:bg-[#1F1F1F] text-gray-900 dark:text-gray-100 overflow-x-hidden scroll-smooth">
			<Navbar />

			<div className="relative flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-16 md:py-24">
				<div className="md:w-1/2 text-center md:text-left space-y-4">
					<h1 className="text-4xl md:text-6xl font-extrabold text-[#FF5722] dark:text-[#FF7043] leading-tight">
						Discover & Create <br /> Amazing Recipes 🍝
					</h1>
					<p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl">
						Explore a world of flavors with 
						<span className="font-semibold"> RecipeMaster</span>, your digital cookbook for mouthwatering inspiration!
					</p>
					<button
						onClick={() => router.push("/get-recipe")}
						className="mt-6 px-8 py-3 bg-[#FF5722] dark:bg-[#FF7043] text-white font-bold rounded-xl shadow-lg 
						hover:scale-105 hover:bg-[#FF7043] dark:hover:bg-[#FF8A65] transition-transform duration-300"
					>
						Get Started
					</button>
				</div>

				<div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
					<Image
						src={img1.src}
						alt="Delicious Food"
						width={500}
						height={400}
						className="rounded-2xl shadow-2xl animate-float"
					/>
				</div>
			</div>

			<div className="px-4 md:px-16 py-16 bg-white dark:bg-[#2A2A2A] text-center rounded-t-[3rem] mb-16">
				<h2 className="text-3xl md:text-4xl font-bold text-[#FF5722] dark:text-[#FF7043] mb-10">
					Why Choose RecipeMaster?
				</h2>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="p-8 bg-[#FFF8F0] dark:bg-[#1F1F1F] rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
						<Flame className="mx-auto text-[#FF5722] dark:text-[#FF7043]" size={40} />
						<h3 className="text-xl font-semibold mt-4">
							Hot & Trending Recipes
						</h3>
						<p className="mt-2 text-gray-600 dark:text-gray-300">
							Explore trending dishes from around the world and spice up your cooking journey.
						</p>
					</div>

					<div className="p-8 bg-[#FFF8F0] dark:bg-[#1F1F1F] rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
						<UtensilsCrossed className="mx-auto text-[#FF5722] dark:text-[#FF7043]" size={40} />
						<h3 className="text-xl font-semibold mt-4">
							Cook Like a Pro
						</h3>
						<p className="mt-2 text-gray-600 dark:text-gray-300">
							Easy, step-by-step guides designed to help beginners become kitchen masters.
						</p>
					</div>

					<div className="p-8 bg-[#FFF8F0] dark:bg-[#1F1F1F] rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
						<Star className="mx-auto text-[#FF5722] dark:text-[#FF7043]" size={40} />
						<h3 className="text-xl font-semibold mt-4">
							Community Ratings
						</h3>
						<p className="mt-2 text-gray-600 dark:text-gray-300">
							Join a community of food lovers. Share, rate, and review recipes you adore.
						</p>
					</div>
				</div>
			</div>

			<Features />

			<About />
			
			<Contact />

			<Footer />
		</section>
	)
}

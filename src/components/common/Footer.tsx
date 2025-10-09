"use client";

import { Mail, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#f87148] dark:bg-[#FF7043] text-gray-800 py-10 px-6 md:px-16 mt-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
                <div className="text-center md:text-left space-y-3">
                    <h2 className="text-2xl font-extrabold tracking-wide">
                        RecipeMaster 🍴
                    </h2>
                    <p className="text-sm text-gray-800 max-w-sm">
                        Discover, cook, and track your meals with smart AI-powered assistance. Cook smarter, live better.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                    <div>
                        <h3 className="font-semibold text-lg mb-3">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-800">
                            <li><Link href="/" className="hover:underline hover:text-white transition">Home</Link></li>
                            <li><Link href="/features" className="hover:underline hover:text-white transition">Features</Link></li>
                            <li><Link href="/about" className="hover:underline hover:text-white transition">About</Link></li>
                            <li><Link href="/contact" className="hover:underline hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-3">
                            Resources
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-800">
                            <li><Link href="#" className="hover:underline hover:text-white transition">Blog</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white transition">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white transition">Help Center</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end space-y-4">
                    <h3 className="font-semibold text-lg">
                        Connect with us
                    </h3>
                    <div className="flex space-x-5">
                        <Link
                            href="mailto:ikbalam4648@gmail.com"
                            className="hover:scale-110 transition-all duration-300"
                        >
                            <Mail size={28} className="text-gray-800 hover:text-gray-600" />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            className="hover:scale-110 transition-all duration-300"
                        >
                            <Twitter size={28} className="text-gray-800 hover:text-gray-600" />
                        </Link>
                        <Link
                            href="https://linkedin.com/in/intakhab-alam-996a1b323"
                            target="_blank"
                            className="hover:scale-110 transition-all duration-300"
                        >
                            <Linkedin size={28} className="text-gray-800 hover:text-gray-600" />
                        </Link>
                        <Link
                            href="https://github.com/Intakhab2004"
                            target="_blank"
                            className="hover:scale-110 transition-all duration-300"
                        >
                            <Github size={28} className="text-gray-800 hover:text-gray-600" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-gray-500 my-6" />

            <div className="text-center text-sm text-gray-800">
                © {new Date().getFullYear()} <span className="font-semibold">RecipeMaster</span>. 
                All rights reserved. <br />
                Developed with ❤️ by <span className="font-bold text-gray-800">Intakhab Alam</span>.
            </div>
        </footer>
    )
}

"use client"


import { Mail, User, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"



export default function Contact(){
    
    const form = useForm();

    return (
        <section className="min-h-screen px-4 md:px-20 py-20 bg-[#FFF8F0] dark:bg-[#1F1F1F] transition-colors duration-300">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#FF5722] dark:text-[#FF8A65] mb-4">
                    Get in Touch ✉️
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                    Have any questions, feedback, or collaboration ideas? We&apos;d love to hear from you!  
                    Fill out the form below and we&apos;ll get back to you shortly.
                </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white dark:bg-[#2A2A2A] rounded-3xl shadow-xl p-8 md:p-12 border 
                border-[#FFCCBC]/50 dark:border-[#FF7043]/20 transition-all"
            >
                <Form {...form}>
                    <form className="space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-medium mb-1">
                                        <User size={18} /> Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="Name" 
                                            className="bg-gray-100 dark:bg-[#1F1F1F] border-none focus:ring-2 focus:ring-[#FF5722] text-gray-800 dark:text-gray-100"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-medium mb-1">
                                        <Mail size={18} /> Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="Email" 
                                            className="bg-gray-100 dark:bg-[#1F1F1F] border-none focus:ring-2 focus:ring-[#FF5722] text-gray-800 dark:text-gray-100"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-medium mb-1">
                                        <MessageSquare size={18} /> Message
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            {...field}
                                            placeholder="Write your message..." 
                                            className="bg-gray-100 dark:bg-[#1F1F1F] border-none focus:ring-2 focus:ring-[#FF5722] text-gray-800 dark:text-gray-100"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full md:w-auto px-10 py-3 rounded-full font-semibold text-white bg-gradient-to-r 
                            from-[#FF5722] to-[#FF7043] hover:from-[#E64A19] hover:to-[#FF5722] transition-all duration-300"
                        >
                            Send Message 🚀
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="mt-20 text-center">
                <p className="text-gray-600 dark:text-gray-400 italic">
                    “Cooking made easier, healthier, and smarter, one recipe at a time.”
                </p>
            </div>
        </section>
    )
}

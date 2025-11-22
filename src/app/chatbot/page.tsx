"use client";

import { useState } from "react";
import { Send, MessageCircle, Loader2, User, Bot } from "lucide-react";
import NavBar from "@/components/common/NavBar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { chatbot } from "@/services/apiUrl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface messageType {
    role: string,
    content: string
}

export default function ChatbotPage(){
    const [loader, setLoader] = useState(false);
    const [messages, setMessages] = useState<messageType[]>([]); 


    const form = useForm<{message: string}>({
        defaultValues: {
            message: ""
        }
    })

    const sendMessage = async(data: {message: string}) => {
        if(!data.message.trim()) return ;
        const userMessage = {
            role: "user",
            content: data.message.trim()
        }
        setMessages((prev) => [...prev, userMessage]);

        try{
            setLoader(true);
            const response = await axios.post(chatbot.GET_MESSAGE_RESPONSE_API, data, {withCredentials: true});

            if(response.data.success){
                console.log("Chatbot response fetched successfully");
                const botMessage = {
                    role: "assistant",
                    content: response.data.reply
                }
                setMessages((prev) => [...prev, botMessage]);
            }
        }
        catch(error){
            console.log("Something went wrong on Chatbot response: ", error);
            setMessages((prev) => [...prev, {role: "assistant", content: "Error: Unable to get response."}]);
        }

        form.reset();
        setLoader(false);
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
                    <div className="bg-white dark:bg-[#2A2A2A] shadow-lg rounded-3xl p-8 mb-10">
                        <h2 className="text-3xl font-bold text-[#FF5722] dark:text-[#FF8A65] mb-3">
                            AI Smart Assistant
                        </h2>
                        <p className="max-w-3xl text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            Interact with our intelligent recipe assistant designed to enhance your cooking journey.  
                            Ask questions, generate recipes, discover nutrition details, and get instant guidance, all 
                            powered by fast, reliable AI. This chatbot is integrated seamlessly into your personal 
                            dashboard, offering a smooth and interactive experience tailored to your needs.
                        </p>
                    </div>

                    <div className="flex flex-col px-4 py-6 md:p-6 h-[70vh] bg-white dark:bg-[#2A2A2A] rounded-3xl shadow-lg">
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-[#FF7043]/40">
                            {
                                messages.length === 0 && (
                                    <div className="h-full flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400 px-6">
                                        <MessageCircle size={60} className="text-[#FF5722] dark:text-[#FF8A65] mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">
                                            Start a Conversation
                                        </h3>
                                        <p className="max-w-sm leading-relaxed">
                                            Ask anything related to recipes, nutrition insights, or cooking ideas.
                                            Your AI assistant is here to help you instantly.
                                        </p>
                                    </div>
                                )
                            }

                            {
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {
                                            msg.role === "assistant" && (
                                                <Bot className="text-[#FF5722] w-6 h-6 mt-1" />
                                            )
                                        }

                                        <div 
                                            className={`max-w-[75%] px-4 py-3 rounded-2xl shadow ${msg.role === "user" ? "bg-[#FF5722] text-white"
                                                : "bg-gray-100 dark:bg-[#3A3A3A] text-gray-800 dark:text-gray-100"}`}
                                            
                                        >
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeHighlight]}
                                                components={{
                                                    h1: ({node, ...props}) => <h1 className="text-xl font-extrabold mb-2" {...props} />,
                                                    h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-1" {...props} />,
                                                    h3: ({node, ...props}) => <h3 className="text-md font-bold" {...props} />,
                                                    p: ({node, ...props}) => <p className="mb-3" {...props} />,
                                                    ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                    ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                                    code: ({node, inline, ...props}: any) =>
                                                        inline ? (
                                                            <code className="bg-gray-300 dark:bg-gray-700 px-1 rounded text-sm" {...props} />
                                                        ) 
                                                        : 
                                                        (
                                                            <pre className="p-3 rounded bg-[#1E1E1E] text-white overflow-x-auto mb-2">
                                                                <code {...props} />
                                                            </pre>
                                                        )
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>

                                        {
                                            msg.role === "user" && (
                                                <User className="text-[#FF5722] w-6 h-6 mt-1" />
                                            )
                                        }
                                    </div>
                                ))
                            }
                            
                            {
                                loader && (
                                    <p className="text-gray-500 dark:text-gray-400 italic">
                                        Thinking...
                                    </p>
                                )
                            }
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(sendMessage)} className="flex items-center mt-4 gap-3 w-full">
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <textarea
                                                    {...field}
                                                    placeholder="Type a message..."
                                                    className="w-full h-12 bg-gray-100 dark:bg-[#3A3A3A] px-4 py-3 rounded-xl outline-none 
                                                                text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                                                    onKeyDown={(e) => {
                                                        if(e.key === "Enter" && !e.shiftKey){
                                                            e.preventDefault();
                                                            form.handleSubmit(sendMessage)();
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                
                                <Button
                                    disabled={loader}
                                    type="submit"
                                    className="w-12 bg-[#FF5722] hover:bg-[#E64A19] text-white p-6 rounded-xl transition-all"
                                >
                                    {
                                        loader ? (
                                            <Loader2 size={30} className="animate-spin"/>
                                        )
                                        :
                                        (
                                            <Send size={30} />
                                        )
                                    }
                                </Button>
                            </form>
                        </Form>
                    </div>
                </main>
            </div>

            <footer className="mt-auto">
                <Footer />
            </footer>
        </section>
    )
}

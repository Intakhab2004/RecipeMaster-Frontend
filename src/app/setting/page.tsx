"use client"

import React, { useState } from "react";
import NavBar from "@/components/common/NavBar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { User, Trash2, ImageDown, Loader2, Upload, CalendarDaysIcon, Router } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios, { isAxiosError } from "axios";
import { userProfile } from "@/services/apiUrl";
import { toast } from "sonner";
import z from "zod";
import { personalDetailsSchema } from "@/schemas/personalDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function SettingPage(){
    const [loader, setLoader] = useState(false);
    const [submitImageLoader, setSubmitImageLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const {user, setUser, fetchUser} = useAuth();
    const router = useRouter();

    const imageForm = useForm<{image: FileList}>();

    const detailsForm = useForm<z.infer<typeof personalDetailsSchema>>({
        resolver: zodResolver(personalDetailsSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: "",
            DOB: undefined,
            contactNumber: ""
        }
    })

    const deleteForm = useForm<{text: string}>({
        defaultValues: {
            text: ""
        }
    });


    const handleImageSubmit = async(data: {image: FileList}) => {
        try{
            setSubmitImageLoader(true);

            const file = data.image[0];
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.put(userProfile.UPDATE_PROFILE_IMAGE_API, formData, {withCredentials: true});
            if(response.data.success){
                console.log("Profile image updated successfully");
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
                console.log("Something went wrong while updating the profile image: ", error.response?.data);
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
            setSubmitImageLoader(false);
        }
    }

    const detailsSubmitHandler = async(data: z.infer<typeof personalDetailsSchema>) => {
        try{
            setLoader(true);

            const response = await axios.put(userProfile.UPDATE_PERSONAL_DETAILS_API, data, {withCredentials: true});

            if(response.data.success){
                fetchUser();
                console.log("Profile details updated successfully");
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
                console.log("Something went wrong while updating the profile details: ", error.response?.data);
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

    const handleAccountDelete = async(data: {text: string}) => {
        if(data.text !== "DELETE MY ACCOUNT"){
            console.log("Confirmation text is not matching");
            const toastId = toast(
                "Confirmation text is not matching",
                {
                    description: "Please make sure to write the same confirmation text",
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
            try{
                setDeleteLoader(true);

                const response = await axios.delete(userProfile.DELETE_USER_API, {withCredentials: true});
                if(response.data.success){
                    setUser(null);

                    console.log("Account deleted successfully");
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

                    router.replace("/sign-in");
                    return ;
                }
            }
            catch(error: unknown){
                if(isAxiosError(error)){
                    console.log("Something went wrong while deleting the account: ", error.response?.data);
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
                setDeleteLoader(false);
            }
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
                    <div className="bg-white dark:bg-[#2A2A2A] shadow-lg rounded-3xl px-5 py-6 md:p-8 mb-10 transition-all duration-300">
                        <h2 className="text-3xl font-bold text-[#FF5722] dark:text-[#FF8A65] mb-2">
                            Account Settings
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage your profile information and account preferences.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#2A2A2A] px-5 py-6 md:p-8 rounded-3xl shadow-lg mb-10">
                        <h3 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-6 flex items-center gap-2">
                            <ImageDown className="text-[#FF5722]" /> Update Profile Image
                        </h3>

                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div>
                                <img
                                    src={previewURL || user?.avatar?.imageURL || `https://api.dicebear.com/9.x/croodles/svg?seed=${user.username}`}
                                    alt={user.username}
                                    className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 shadow-md border-[#FF7043]"
                                />   
                            </div>

                            <div className="flex-1">
                                <Form {...imageForm}>
                                    <form onSubmit={imageForm.handleSubmit(handleImageSubmit)}>
                                        <FormField
                                            control={imageForm.control}
                                            name="image"
                                            render={({field: {onChange}}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if(file){
                                                                    onChange(e.target.files);
                                                                    const previewURL = URL.createObjectURL(file);
                                                                    setPreviewURL(previewURL)
                                                                }
                                                            }}
                                                            className="hidden"
                                                            id="image-upload"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex items-center">
                                            <label
                                                htmlFor="image-upload"
                                                className="bg-[#FF5722] text-white font-medium px-4 py-2 mr-3 rounded-xl hover:bg-white 
                                                    hover:text-[#FF5722] border border-[#FF7043] cursor-pointer transition-all duration-300"
                                            >
                                                Select Image
                                            </label>

                                            <button
                                                type="submit"
                                                className="bg-white text-[#FF5722] font-medium px-4 py-[7px] rounded-xl hover:bg-[#FF5722]
                                                    hover:text-white border border-[#FF7043] cursor-pointer transition-all duration-300"
                                            >
                                                {
                                                    submitImageLoader ? (
                                                        <div className="flex justify-center items-center">
                                                            <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Uploading
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className="flex justify-center items-center gap-2">
                                                            <Upload className="w-5 h-5"/> Upload
                                                        </div>
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#2A2A2A] px-5 py-6 md:p-8 rounded-3xl shadow-lg mb-10">
                        <h3 className="text-2xl font-semibold text-[#FF5722] dark:text-[#FF8A65] mb-6 flex items-center gap-2">
                            <User className="text-[#FF5722]" /> Edit Personal Information
                        </h3>

                        <Form {...detailsForm}>
                            <form 
                                onSubmit={detailsForm.handleSubmit(detailsSubmitHandler)}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200"
                            >
                                <FormField
                                    control={detailsForm.control}
                                    name="firstName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-base">First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your First name"
                                                    className="w-full px-3 py-6 font-medium text-base rounded-xl bg-[#FFF5EB] dark:bg-[#1F1F1F] border border-[#FF7043]/40 focus-visible:ring-0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={detailsForm.control}
                                    name="lastName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-base">Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your Last name"
                                                    className="w-full px-3 py-6 font-medium rounded-xl bg-[#FFF5EB] dark:bg-[#1F1F1F] border border-[#FF7043]/40 focus-visible:ring-0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={detailsForm.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-base">Gender</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full font-medium rounded-xl bg-[#FFF5EB] dark:bg-[#1F1F1F] border-[#FF7043]/40 px-3 py-6 focus-visible:ring-0">
                                                        <SelectValue placeholder="Select Gender" />
                                                    </SelectTrigger>

                                                    <SelectContent className="bg-white dark:bg-[#2A2A2A] rounded-xl shadow-xl border border-[#FF7043]/40">
                                                        <SelectItem value="Male" className="hover:bg-[#FF7043]/20">Male</SelectItem>
                                                        <SelectItem value="Female" className="hover:bg-[#FF7043]/20">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={detailsForm.control}
                                    name="DOB"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-base">Date of birth</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full px-3 py-6 font-medium rounded-xl bg-[#FFF5EB] dark:bg-[#1F1F1F] border border-[#FF7043]/40 focus-visible:ring-0",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {
                                                            field.value ? (
                                                                format(field.value, "PPP")
                                                            ) 
                                                            : 
                                                            ( <span>Pick a date</span> )
                                                        }
                                                        <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ?? undefined}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={detailsForm.control}
                                    name="contactNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-base">Contact Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your number"
                                                    className="w-full px-3 py-6 font-medium rounded-xl bg-[#FFF5EB] dark:bg-[#1F1F1F] border border-[#FF7043]/40 focus-visible:ring-0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button 
                                    type="submit"
                                    className="w-40 mt-2 md:col-span-2 bg-[#FF5722] text-white text-base font-medium px-6 py-5 rounded-xl 
                                    hover:bg-white hover:text-[#FF5722] border border-[#FF7043] cursor-pointer transition-all duration-300"
                                >
                                    {
                                        loader ? (
                                            <div className="flex justify-center items-center">
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </div>
                                        )
                                        :
                                        (
                                            "Save"
                                        )
                                    }
                                </Button>
                            </form>
                        </Form>
                    </div>

                    <div className="bg-white dark:bg-[#2A2A2A] px-5 py-6 md:p-8 rounded-3xl shadow-lg mb-10 border border-red-500/40">
                        <h3 className="text-2xl font-semibold text-red-600 flex items-center gap-2 mb-4">
                            <Trash2 /> Delete Account
                        </h3>

                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            Deleting your account is a <span className="font-semibold text-red-500">permanent action</span>.
                            All your data will be removed from our system, including:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
                            <li>Profile information</li>
                            <li>Saved recipes and preferences</li>
                            <li>Uploaded profile images</li>
                            <li>All activity history</li>
                        </ul>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Once deleted, your account <span className="text-red-500 font-semibold">cannot be recovered</span>.  
                            If you are sure you want to proceed, type the confirmation phrase below.
                        </p>

                        <p className="font-medium mb-3">
                            Type <span className="text-red-500 font-semibold">"DELETE MY ACCOUNT"</span> to confirm:
                        </p>

                        <Form {...deleteForm}>
                            <form onSubmit={deleteForm.handleSubmit(handleAccountDelete)}>
                                <FormField
                                    control={deleteForm.control}
                                    name="text"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter confirmation text"
                                                    className="w-full px-4 py-6 text-base font-medium rounded-xl bg-[#FFF5EB] 
                                                        dark:bg-[#1F1F1F] border border-red-400/40 focus-visible:ring-0 transition"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="mt-6 w-full bg-red-600 text-white font-semibold px-6 py-6 rounded-xl hover:bg-white 
                                    hover:text-red-600 hover:border-red-500 border border-red-500 cursor-pointer transition-all duration-300"
                                >
                                    {
                                        deleteLoader ? (
                                            <div className="flex justify-center items-center">
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please wait
                                            </div>
                                        )
                                        :
                                        (
                                            "Permanently Delete Account"
                                        )
                                    }
                                </Button>
                            </form>
                        </Form>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                            If you need help or want to take a break instead, you can also temporarily disable your account
                            in the <span className="text-red-500 font-medium">Settings</span>.
                        </p>
                    </div>
                </main>
            </div>

            <footer className="w-full mt-auto">
                <Footer />
            </footer>
        </section>
    );
}

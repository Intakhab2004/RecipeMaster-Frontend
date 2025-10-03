"use client";

import React from "react";

export default function CoffeeLoader(){
    return (
        <div className="relative flex items-center justify-center w-[100px] h-[80px]">
            {/* Cup */}
            <div className="absolute w-[25px] h-[18px] bg-white border border-gray-800 rounded-b-lg rounded-t-sm animate-cupExpansion">
                {/* Cup Rim */}
                <div className="absolute top-[-2px] w-[calc(100%-2px)] h-[2px] bg-[#fed59fca] border border-gray-700/75 rounded-full"></div>
                {/* Cup Base Shadow */}
                <div className="absolute top-[15px] w-[calc(100%-2px)] h-[4px] border border-gray-800 border-t-0 rounded-full -z-10"></div>

                {/* Handle */}
                <div className="absolute right-[-5px] top-[2px] w-[5px] h-[10px] bg-white border border-gray-800 rounded-[2px_10px_20px_2px]"></div>

                {/* Smoke */}
                <div className="absolute bottom-full left-1/2 w-[15px] h-[25px] bg-gray-500/40 rounded-full -translate-x-1/2 blur-md animate-smokeRise delay-0"></div>
                <div className="absolute bottom-full left-1/2 w-[15px] h-[25px] bg-gray-500/40 rounded-full -translate-x-1/2 blur-md animate-smokeRise delay-1000"></div>
                <div className="absolute bottom-full left-1/2 w-[15px] h-[25px] bg-gray-500/40 rounded-full -translate-x-1/2 blur-md animate-smokeRise delay-2000"></div>
            </div>

            {/* Loading text */}
            <div className="absolute text-orange-600 text-2xl font-bold opacity-70 top-[70%] left-1/2 -translate-x-1/2 z-10">
                Loading...
            </div>
        </div>
    )
}


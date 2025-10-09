import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest){
    const token = req.cookies.get("token")?.value;  // It is accessible here as it is server component in nextjs

    const path = req.nextUrl.pathname;
    const isPublicPath = (path === "/sign-up") || (path === "/sign-in") || path.startsWith("/verify");

    if(token && isPublicPath){
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if(!token && !isPublicPath){
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    NextResponse.next();
}

export const config = {
    matcher: [
        "/sign-up",
        "/sign-in",
        "/verify/:path*",
        "/dashboard",
    ]
}
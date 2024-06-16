import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g., /Download, /dOwnloads, etc.)
    const { pathname } = request.nextUrl;

    // Convert the pathname to lowercase
    const lowercasePathname = pathname.toLowerCase();

    // If the original pathname is not in lowercase, redirect to the lowercase version
    if (pathname !== lowercasePathname) {
        // Create a new URL with the lowercase pathname
        const url = request.nextUrl.clone();
        url.pathname = lowercasePathname;

        // Redirect to the new URL
        return NextResponse.redirect(url);
    }

    // Allow the request to proceed if the pathname is already in lowercase
    return NextResponse.next();
}

// Define the paths where this middleware should be applied
export const config = {
    matcher: '/:path*',
};
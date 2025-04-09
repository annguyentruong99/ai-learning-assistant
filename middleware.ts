import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database.type";

export async function middleware(request: NextRequest) {
	// Create a Supabase client configured to use cookies
	let response = NextResponse.next({ request });
	const supabase = createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value),
					);
					response = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// Refresh session if expired - required for Server Components
	// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Define protected routes that require authentication
	const protectedRoutes = [
		"/dashboard",
		"/documents",
		"/review",
		"/analytics",
		"/settings",
	];

	// Check if the current path matches any protected route
	const isProtectedRoute = protectedRoutes.some(
		(route) =>
			request.nextUrl.pathname === route ||
			request.nextUrl.pathname.startsWith(`${route}/`),
	);

	// Auth routes should redirect to dashboard if already authenticated
	const isAuthRoute =
		request.nextUrl.pathname === "/login" ||
		request.nextUrl.pathname === "/signup";

	// If accessing protected route and not authenticated, redirect to login
	if (isProtectedRoute && !user) {
		const redirectUrl = new URL("/login", request.url);
		redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
		return NextResponse.redirect(redirectUrl);
	}

	// If accessing auth route while authenticated, redirect to dashboard
	if (isAuthRoute && user) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return response;
}

// Configure the middleware to run only on specific paths
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 * - api routes
		 */
		"/((?!_next/static|_next/image|favicon.ico|public|api).*)",
	],
};

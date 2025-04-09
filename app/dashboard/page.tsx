"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { LogoutButton } from "@/components/auth/auth-buttons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isLoading && !user) {
			router.push("/login");
		}
	}, [user, isLoading, router]);

	// Show loading state
	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='animate-pulse'>Loading...</div>
			</div>
		);
	}

	// Show dashboard only if user is authenticated
	if (!user) {
		return null;
	}

	return (
		<div className='container mx-auto px-4 py-10'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<LogoutButton />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Welcome, {user.user_metadata.name || "User"}!</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Your AI Learning Assistant dashboard is ready.</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Quick Stats</CardTitle>
					</CardHeader>
					<CardContent>
						<p>You currently have no learning sessions scheduled.</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

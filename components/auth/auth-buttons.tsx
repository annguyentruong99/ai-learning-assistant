"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";

export function LogoutButton({ className }: { className?: string }) {
	const { signOut, isLoading } = useAuth();

	const handleLogout = async () => {
		try {
			await signOut();
		} catch (error) {
			// Error is handled in auth context
		}
	};

	return (
		<Button
			variant='outline'
			onClick={handleLogout}
			disabled={isLoading}
			className={className}>
			{isLoading ? "Signing out..." : "Sign out"}
		</Button>
	);
}

export function LoginButton({ className }: { className?: string }) {
	const router = useRouter();

	return (
		<Button
			variant='default'
			onClick={() => router.push("/login")}
			className={className}>
			Sign in
		</Button>
	);
}

export function SignUpButton({ className }: { className?: string }) {
	const router = useRouter();

	return (
		<Button
			variant='outline'
			onClick={() => router.push("/signup")}
			className={className}>
			Create account
		</Button>
	);
}

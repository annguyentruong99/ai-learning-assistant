import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In | AI Learning Assistant",
	description: "Sign in to your AI Learning Assistant account",
};

export default function LoginPage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='flex flex-col items-center space-y-6 w-full max-w-md'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold'>AI Learning Assistant</h1>
					<p className='mt-2 text-sm text-muted-foreground'>
						Sign in to continue learning with AI-powered spaced repetition
					</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}

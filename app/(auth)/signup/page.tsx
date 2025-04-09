import { SignUpForm } from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Account | AI Learning Assistant",
	description:
		"Create an AI Learning Assistant account to start learning with spaced repetition",
};

export default function SignUpPage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='flex flex-col items-center space-y-6 w-full max-w-md'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold'>AI Learning Assistant</h1>
					<p className='mt-2 text-sm text-muted-foreground'>
						Create an account to start learning with AI-powered spaced
						repetition
					</p>
				</div>
				<SignUpForm />
			</div>
		</div>
	);
}

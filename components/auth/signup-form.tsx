"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { signUpSchema } from "@/lib/validations/auth.validation";
import Link from "next/link";
import { useAuth } from "../providers/auth-provider";
import { z } from "zod";

export function SignUpForm() {
	const { signUp, isLoading } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<{
		name?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
	}>({});

	const validateForm = () => {
		try {
			signUpSchema.parse({ name, email, password, confirmPassword });
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: {
					name?: string;
					email?: string;
					password?: string;
					confirmPassword?: string;
				} = {};

				error.errors.forEach((err) => {
					if (err.path[0] === "name") {
						newErrors.name = err.message;
					}
					if (err.path[0] === "email") {
						newErrors.email = err.message;
					}
					if (err.path[0] === "password") {
						newErrors.password = err.message;
					}
					if (err.path[0] === "confirmPassword") {
						newErrors.confirmPassword = err.message;
					}
				});

				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			await signUp(email, password, name);
		} catch (error) {
			// Error is handled in the auth context
		}
	};

	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold'>Create an Account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							placeholder='John Doe'
							value={name}
							onChange={(e) => setName(e.target.value)}
							disabled={isLoading}
							required
						/>
						{errors.name && (
							<p className='text-sm text-red-500'>{errors.name}</p>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='your@email.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={isLoading}
							required
						/>
						{errors.email && (
							<p className='text-sm text-red-500'>{errors.email}</p>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							placeholder='••••••••'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={isLoading}
							required
						/>
						{errors.password && (
							<p className='text-sm text-red-500'>{errors.password}</p>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='confirmPassword'>Confirm Password</Label>
						<Input
							id='confirmPassword'
							type='password'
							placeholder='••••••••'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							disabled={isLoading}
							required
						/>
						{errors.confirmPassword && (
							<p className='text-sm text-red-500'>{errors.confirmPassword}</p>
						)}
					</div>
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? "Creating Account..." : "Create Account"}
					</Button>
					<p className='text-sm text-center text-muted-foreground'>
						Already have an account?{" "}
						<Link href='/login' className='text-primary hover:underline'>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</form>
		</Card>
	);
}

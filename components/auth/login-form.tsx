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
import { loginSchema } from "@/lib/validations/auth.validation";
import Link from "next/link";
import { useAuth } from "../providers/auth-provider";
import { z } from "zod";

export function LoginForm() {
	const { signIn, isLoading } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);

	const validateForm = () => {
		try {
			loginSchema.parse({ email, password });
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: { email?: string; password?: string } = {};
				error.errors.forEach((err) => {
					if (err.path[0] === "email") {
						newErrors.email = err.message;
					}
					if (err.path[0] === "password") {
						newErrors.password = err.message;
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
			await signIn(email, password);
		} catch (error) {
			// Error is handled in the auth context
		}
	};

	return (
		<Card className='w-full max-w-md'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold'>Sign In</CardTitle>
				<CardDescription>
					Enter your email below to sign into your account
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className='space-y-4'>
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
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? "Signing in..." : "Sign In"}
					</Button>
					<p className='text-sm text-center text-muted-foreground'>
						Don&apos;t have an account?{" "}
						<Link href='/signup' className='text-primary hover:underline'>
							Sign up
						</Link>
					</p>
				</CardFooter>
			</form>
		</Card>
	);
}

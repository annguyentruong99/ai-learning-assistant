import { supabaseClient } from "../supabase/client";
import {
	SignUpFormData,
	LoginFormData,
	signUpSchema,
	loginSchema,
} from "../validations/auth.validation";
import { userService } from "./db";

export class AuthService {
	/**
	 * Sign up a new user and create their profile
	 */
	static async signUp({ email, password, name }: SignUpFormData) {
		try {
			// Validate the input data
			signUpSchema.parse({ email, password, name });

			// Sign up the user with Supabase Auth
			const { data: authData, error: authError } =
				await supabaseClient.auth.signUp({
					email,
					password,
					options: {
						data: {
							name,
						},
					},
				});

			if (authError) {
				throw authError;
			}

			if (!authData.user) {
				throw new Error("Failed to create user account");
			}

			return { success: true, data: authData };
		} catch (error) {
			console.error("Sign up error:", error);
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			};
		}
	}

	/**
	 * Log in an existing user
	 */
	static async login({ email, password }: LoginFormData) {
		try {
			// Validate the input data
			loginSchema.parse({ email, password });

			const { data, error } = await supabaseClient.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				throw error;
			}

      const { data: existingUser } = await userService.getUserByEmail(email);

			if (!existingUser) {
				const { error: insertError } = await userService.createUser({
					id: data.user.id,
					email,
					preferences: {},
				});

				if (insertError) {
					throw new Error(insertError || "Failed to create user profile");
				}
			}

			return { success: true, data };
		} catch (error) {
			console.error("Login error:", error);
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			};
		}
	}

	/**
	 * Log out the current user
	 */
	static async logout() {
		try {
			const { error } = await supabaseClient.auth.signOut();

			if (error) {
				throw error;
			}

			return { success: true };
		} catch (error) {
			console.error("Logout error:", error);
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			};
		}
	}

	/**
	 * Get the current authenticated user
	 */
	static async getCurrentUser() {
		try {
			const { data } = await supabaseClient.auth.getUser();
			return data.user;
		} catch (error) {
			console.error("Get current user error:", error);
			return null;
		}
	}
}

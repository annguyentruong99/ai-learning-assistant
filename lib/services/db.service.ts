import { supabaseClient } from "../supabase/client";
import { createServerSupabaseClient } from "../supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Base Database Service class for common CRUD operations
 * Provides a foundation for table-specific services
 */
export class DbService {
	/**
	 * Get a client-side Supabase instance
	 */
	protected getClient() {
		return supabaseClient;
	}

	/**
	 * Get a server-side Supabase instance (for server components and API routes)
	 */
	protected getServerClient() {
		return createServerSupabaseClient();
	}

	/**
	 * Standardized error handler for database operations
	 */
	protected handleError(error: PostgrestError | Error | unknown): never {
		console.error("Database operation failed:", error);

		if (error instanceof Error) {
			throw new Error(`Database operation failed: ${error.message}`);
		}

		throw new Error("Database operation failed with an unknown error");
	}

	/**
	 * Wraps database operations with standardized error handling and response format
	 */
	protected async executeOperation<T>(
		operation: () => Promise<{ data: T | null; error: PostgrestError | null }>,
	): Promise<{ success: boolean; data?: T; error?: string }> {
		try {
			const { data, error } = await operation();

			if (error) {
				console.error("Database operation error:", error);
				return {
					success: false,
					error: error.message,
				};
			}

			return {
				success: true,
				data: data || undefined,
			};
		} catch (err) {
			console.error("Unexpected database error:", err);
			return {
				success: false,
				error:
					err instanceof Error ? err.message : "An unexpected error occurred",
			};
		}
	}
}

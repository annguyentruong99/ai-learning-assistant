import { createBrowserClient } from "@supabase/ssr";

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Supabase URL and anonymous key must be provided");
}

export const supabaseClient = createBrowserClient(
	supabaseUrl,
	supabaseAnonKey,
	{
		auth: {
			persistSession: true,
			autoRefreshToken: true,
		},
	},
);

// Export typed version of supabase client
export type SupabaseClient = typeof supabaseClient;

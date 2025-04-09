import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function Home() {
	// Get the server-side Supabase client
	const supabase = await createServerSupabaseClient();

	// Check if the user is authenticated
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// Redirect based on authentication status
	if (session) {
		redirect("/dashboard");
	} else {
		redirect("/login");
	}
}

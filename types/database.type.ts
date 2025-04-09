export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			users: {
				Row: {
					id: string;
					email: string;
					name: string;
					created_at: string;
					updated_at: string;
					preferences: Json | null;
				};
				Insert: {
					id: string;
					email: string;
					created_at?: string;
					updated_at?: string;
					preferences?: Json | null;
				};
				Update: {
					id?: string;
					email?: string;
					name?: string;
					created_at?: string;
					updated_at?: string;
					preferences?: Json | null;
				};
			};
			// Add other tables based on the system design (documents, questions, etc.)
		};
	};
}

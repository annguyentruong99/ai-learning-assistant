import { DbService } from "../db.service";
import { Database } from "@/types/database.type";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

/**
 * Service for managing user-related database operations
 */
export class UserService extends DbService {
	private readonly tableName = "users";

	/**
	 * Fetch a user by ID
	 */
	async getUserById(
		id: string,
	): Promise<{ success: boolean; data?: User; error?: string }> {
		return this.executeOperation(async () => {
			return await this.getClient()
				.from(this.tableName)
				.select("*")
				.eq("id", id)
				.single();
		});
	}

	/**
	 * Fetch a user by email
	 */
	async getUserByEmail(
		email: string,
	): Promise<{ success: boolean; data?: User; error?: string }> {
		return this.executeOperation(async () => {
			return await this.getClient()
				.from(this.tableName)
				.select("*")
				.eq("email", email)
				.single();
		});
	}

	/**
	 * Create a new user
	 */
	async createUser(
		user: UserInsert,
	): Promise<{ success: boolean; data?: User; error?: string }> {
		return this.executeOperation(async () => {
			return await this.getClient()
				.from(this.tableName)
				.insert(user)
				.select("*")
				.single();
		});
	}

	/**
	 * Update a user
	 */
	async updateUser(
		id: string,
		user: UserUpdate,
	): Promise<{ success: boolean; data?: User; error?: string }> {
		return this.executeOperation(async () => {
			return await this.getClient()
				.from(this.tableName)
				.update(user)
				.eq("id", id)
				.select("*")
				.single();
		});
	}

	/**
	 * Delete a user
	 */
	async deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
		return this.executeOperation(async () => {
			return await this.getClient().from(this.tableName).delete().eq("id", id);
		});
	}

	/**
	 * Get user preferences
	 */
	async getUserPreferences(
		id: string,
	): Promise<{ success: boolean; data?: any; error?: string }> {
		return this.executeOperation(async () => {
			return await this.getClient()
				.from(this.tableName)
				.select("preferences")
				.eq("id", id)
				.single();
		});
	}

	/**
	 * Update user preferences
	 */
	async updateUserPreferences(
		id: string,
		preferences: any,
	): Promise<{ success: boolean; error?: string }> {
		return this.executeOperation(async () => {
			return await this.getClient()
				.from(this.tableName)
				.update({ preferences })
				.eq("id", id);
		});
	}
}

// Create a singleton instance
export const userService = new UserService();

import { adminClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { config } from "@/config/config";

export const authClient = createAuthClient({
	baseURL: config.backend.baseUrl,
	plugins: [adminClient()],
});

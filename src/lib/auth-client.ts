import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"
import { adminClient } from "better-auth/client/plugins"
import { config } from "@/config/config"

export const authClient = createAuthClient({
    baseURL: config.betterauth.baseUrl,
    plugins: [
        usernameClient(),
        adminClient()
    ]
})
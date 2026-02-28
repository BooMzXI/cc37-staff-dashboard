export const config = {
	backend: {
		baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
	},
	isProd: process.env.NEXT_PUBLIC_ENV === "PROD",
	enabledTab: (process.env.NEXT_PUBLIC_ENABLED_TAB || "").split(","),
};

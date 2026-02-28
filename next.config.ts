import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			new URL("https://storage.comcamp.io/**"),
			{
				protocol: "https",
				hostname: "dev-api.comcamp.io",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api.comcamp.io",
				port: "",
				pathname: "/**",
			},
		],
	},
	// Make environment variables available at runtime for server-side rendering
	// Note: NEXT_PUBLIC_* vars are still embedded at build time for client-side JS
	serverExternalPackages: [],
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: "/api/auth/:path*",
	// 			destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
	// 		},
	// 	];
	// },
};

export default nextConfig;

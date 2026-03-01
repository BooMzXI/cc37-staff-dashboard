import { Sarabun } from "next/font/google";
import { headers } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React, { Suspense } from "react";
import DashboardNavbar, { AuthSession } from "@/components/DashboardNavbar";
import { Toaster } from "@/components/ui/sonner";
import { authClient } from "@/lib/auth-client";

async function DashboardShell({ children }: { children: React.ReactNode }) {
	const headersList = await headers();
	const { data } = await authClient.getSession({
		fetchOptions: { headers: headersList },
	});
	return (
		<>
			<DashboardNavbar role={data?.user?.role} />
			{children}
		</>
	);
}

const sarabun = Sarabun({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-sarabun",
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<div className="h-screen w-screen" />}>
			<NuqsAdapter>
				<DashboardShell>
					<div className={`${sarabun.className} mx-auto max-w-7xl px-4 py-8 lg:px-6 container`}>
						<div className="mt-5">
							{children}
							<Toaster position="top-right" richColors />
						</div>
					</div>
				</DashboardShell>
			</NuqsAdapter>
		</Suspense>
	);
}

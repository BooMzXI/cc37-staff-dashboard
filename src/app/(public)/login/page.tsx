import React from "react";
import { LoginForm } from "@/components/features/auth/login-form";

type LoginPageProps = {
	searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
	const { redirect } = await searchParams;

	return (
		<div className="flex min-h-screen items-center justify-center bg-black p-4">
			<LoginForm redirect={redirect} />
		</div>
	);
}

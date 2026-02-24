"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
	username: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้" }),
	password: z.string().min(1, { message: "กรุณากรอกรหัสผ่าน" }),
});

export function LoginForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		setError(null);

		const { data, error: authError } = await authClient.signIn.username(
			{
				username: values.username,
				password: values.password,
			},
			{
				onSuccess: () => {
					router.push("/");
					router.refresh();
				},
				onError: (ctx: { error: { message: unknown } }) => {
					setError((ctx.error.message as string) || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
					setIsLoading(false);
				},
			},
		);
	}

	return (
		<Card className="w-full max-w-md mx-auto shadow-lg">
			<CardHeader className="space-y-1">
				<div className="w-full">
					<img alt="logo" className="w-36 mx-auto" src={"https://storage.comcamp.io/web-assets/Comcamp-Logo.png"} />
				</div>
				<CardTitle className="text-2xl font-bold text-center flex flex-col">
					<div className="">Staff Back Office</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertTitle>เข้าสู่ระบบไม่สำเร็จ</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="กรอกชื่อผู้ใช้" {...field} disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Checking...
								</>
							) : (
								"เข้าสู่ระบบ"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

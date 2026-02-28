"use client";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/config/config";
import { authClient } from "@/lib/auth-client";
import { columns, StaffUser } from "./column";
import { CreateStaffDialog } from "./components/CreateStaffDialog";

type User = {
	role?: string;
};

export default function AdminPage() {
	const { data: session } = authClient.useSession();
	const router = useRouter();

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [staffData, setStaffData] = useState<StaffUser[]>([]);
	const [loading, setLoading] = useState(true);

	const handleGetStaffData = useCallback(async () => {
		try {
			const res = await fetch(`${config.backend.baseUrl}/api/staff/account`, {
				credentials: "include",
			});
			if (!res.ok) throw new Error("Failed to fetch staff data");
			const jsonData = await res.json();
			setStaffData(jsonData);
		} catch (error) {
			console.error("Failed to fetch staff data:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		handleGetStaffData();
	}, [handleGetStaffData]);

	useEffect(() => {
		if (session && (session.user as User)?.role !== "admin") {
			router.push("/");
		}
	}, [session, router]);

	if (session?.user && (session.user as User)?.role !== "admin") return null;

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="min-h-screen bg-background">
			<main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
				<PageTitle title="Admin Dashboard" description="Welcome Administrator! Here you can manage the system settings and user accounts." />

				<div className="mt-8">
					<Card className="border-2 border-muted/50 shadow-sm">
						<CardHeader className="flex flex-row items-center justify-between pb-4">
							<CardTitle className="text-xl">Staff Management</CardTitle>

							<Button className="flex items-center gap-2" onClick={() => setIsCreateDialogOpen(true)}>
								<PlusCircle className="h-4 w-4" />
								เพิ่ม Staff ใหม่
							</Button>
						</CardHeader>
						<CardContent>
							<DataTable columns={columns} data={staffData} />
						</CardContent>
					</Card>
				</div>

				<CreateStaffDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} onSuccess={handleGetStaffData} />
			</main>
		</div>
	);
}

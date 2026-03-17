"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { config } from "@/config/config";
import { columns, StudentConfirmation } from "./column";

type LeaderboardState = {
	passMaleM4: StudentConfirmation[];
	passMaleM5: StudentConfirmation[];
	passFemaleM4: StudentConfirmation[];
	passFemaleM5: StudentConfirmation[];
	reserveMaleM4: StudentConfirmation[];
	reserveMaleM5: StudentConfirmation[];
	reserveFemaleM4: StudentConfirmation[];
	reserveFemaleM5: StudentConfirmation[];
};

export default function PersonalConfirmation() {
	const [loading, setLoading] = useState(true); // อย่าลืมเปลี่ยนเป็น true หลังเทส
	const [data, setData] = useState<StudentConfirmation[]>([]);
	const [lists, setLists] = useState<LeaderboardState>({
		passMaleM4: [],
		passMaleM5: [],
		passFemaleM4: [],
		passFemaleM5: [],
		reserveMaleM4: [],
		reserveMaleM5: [],
		reserveFemaleM4: [],
		reserveFemaleM5: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchAPI = async (path: string) => {
					const res = await fetch(`${config.backend.baseUrl}${path}`, {
						method: "GET",
						credentials: "include",
					});
					if (!res.ok) throw new Error(`Failed to fetch ${path}`);
					return res.json();
				};
				const [pm4, pm5, pfm4, pfm5, rm4, rm5, rfm4, rfm5] = await Promise.all([
					fetchAPI("/api/staff/leaderboard/pass/male/m4"),
					fetchAPI("/api/staff/leaderboard/pass/male/m5"),
					fetchAPI("/api/staff/leaderboard/pass/female/m4"),
					fetchAPI("/api/staff/leaderboard/pass/female/m5"),
					fetchAPI("/api/staff/leaderboard/reserve/male/m4"),
					fetchAPI("/api/staff/leaderboard/reserve/male/m5"),
					fetchAPI("/api/staff/leaderboard/reserve/female/m4"),
					fetchAPI("/api/staff/leaderboard/reserve/female/m5"),
				]);

				setLists({
					passMaleM4: pm4,
					passMaleM5: pm5,
					passFemaleM4: pfm4,
					passFemaleM5: pfm5,
					reserveMaleM4: rm4,
					reserveMaleM5: rm5,
					reserveFemaleM4: rfm4,
					reserveFemaleM5: rfm5,
				});
			} catch (error) {
				console.error("Failed to fetch leaderboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <Loading />;

	return (
		<>
			<PageTitle title="Personal Confirmation" description={`การประกาศผลและยืนยันสิทธิ์ของนักเรียน`} />

			<div className="mt-6">
				<Tabs defaultValue="pass-male-m4" className="w-full">
					<TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 mb-6 gap-1">
						<TabsTrigger className="py-2" value="pass-male-m4">
							ตัวจริง ชาย ม.4
						</TabsTrigger>
						<TabsTrigger className="py-2" value="pass-male-m5">
							ตัวจริง ชาย ม.5
						</TabsTrigger>
						<TabsTrigger className="py-2" value="pass-female-m4">
							ตัวจริง หญิง ม.4
						</TabsTrigger>
						<TabsTrigger className="py-2" value="pass-female-m5">
							ตัวจริง หญิง ม.5
						</TabsTrigger>

						<TabsTrigger className="py-2 text-muted-foreground" value="reserve-male-m4">
							สำรอง ชาย ม.4
						</TabsTrigger>
						<TabsTrigger className="py-2 text-muted-foreground" value="reserve-male-m5">
							สำรอง ชาย ม.5
						</TabsTrigger>
						<TabsTrigger className="py-2 text-muted-foreground" value="reserve-female-m4">
							สำรอง หญิง ม.4
						</TabsTrigger>
						<TabsTrigger className="py-2 text-muted-foreground" value="reserve-female-m5">
							สำรอง หญิง ม.5
						</TabsTrigger>
					</TabsList>

					<div className="rounded-lg shadow-sm bg-card">
						<TabsContent value="pass-male-m4" className="mt-0">
							<DataTable columns={columns} data={lists.passMaleM4} />
						</TabsContent>

						<TabsContent value="pass-male-m5" className="mt-0">
							<DataTable columns={columns} data={lists.passMaleM5} />
						</TabsContent>

						<TabsContent value="pass-female-m4" className="mt-0">
							<DataTable columns={columns} data={lists.passFemaleM4} />
						</TabsContent>

						<TabsContent value="pass-female-m5" className="mt-0">
							<DataTable columns={columns} data={lists.passFemaleM5} />
						</TabsContent>

						<TabsContent value="reserve-male-m4" className="mt-0">
							<DataTable columns={columns} data={lists.reserveMaleM4} />
						</TabsContent>

						<TabsContent value="reserve-male-m5" className="mt-0">
							<DataTable columns={columns} data={lists.reserveMaleM5} />
						</TabsContent>

						<TabsContent value="reserve-female-m4" className="mt-0">
							<DataTable columns={columns} data={lists.reserveFemaleM4} />
						</TabsContent>

						<TabsContent value="reserve-female-m5" className="mt-0">
							<DataTable columns={columns} data={lists.reserveFemaleM5} />
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</>
	);
}

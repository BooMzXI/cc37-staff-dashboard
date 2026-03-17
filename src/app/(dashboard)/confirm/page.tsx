"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { config } from "@/config/config";
import { columns, StudentConfirmation } from "./column";

type LeaderboardApiItem = {
	std_application_id: string;
	std_application_submit: boolean;
	std_application_confirm: boolean;
	std_application_result: string;
	std_total_score?: {
		std_total_score: number | null;
		std_regis_score: number | null;
		std_academic_score: number | null;
		std_academic_chaos_score: number | null;
	};
	std_info?: {
		std_info_prefix?: string;
		std_info_first_name?: string;
		std_info_last_name?: string;
		std_info_phone_number?: string;
		std_info_education_institute?: string;
	};
	std_user?: {
		email?: string;
	};
	email?: string;
};

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

type ConfirmationTab = "pass-male-m4" | "pass-male-m5" | "pass-female-m4" | "pass-female-m5" | "reserve-male-m4" | "reserve-male-m5" | "reserve-female-m4" | "reserve-female-m5";

const tabConfig: Record<ConfirmationTab, { path: string; key: keyof LeaderboardState }> = {
	"pass-male-m4": { path: "/api/staff/leaderboard/pass/male/m4", key: "passMaleM4" },
	"pass-male-m5": { path: "/api/staff/leaderboard/pass/male/m5", key: "passMaleM5" },
	"pass-female-m4": { path: "/api/staff/leaderboard/pass/female/m4", key: "passFemaleM4" },
	"pass-female-m5": { path: "/api/staff/leaderboard/pass/female/m5", key: "passFemaleM5" },
	"reserve-male-m4": { path: "/api/staff/leaderboard/reserve/male/m4", key: "reserveMaleM4" },
	"reserve-male-m5": { path: "/api/staff/leaderboard/reserve/male/m5", key: "reserveMaleM5" },
	"reserve-female-m4": { path: "/api/staff/leaderboard/reserve/female/m4", key: "reserveFemaleM4" },
	"reserve-female-m5": { path: "/api/staff/leaderboard/reserve/female/m5", key: "reserveFemaleM5" },
};

const categoryControls: { label: string; pass: ConfirmationTab; reserve: ConfirmationTab }[] = [
	{ label: "ชาย ม.4", pass: "pass-male-m4", reserve: "reserve-male-m4" },
	{ label: "ชาย ม.5", pass: "pass-male-m5", reserve: "reserve-male-m5" },
	{ label: "หญิง ม.4", pass: "pass-female-m4", reserve: "reserve-female-m4" },
	{ label: "หญิง ม.5", pass: "pass-female-m5", reserve: "reserve-female-m5" },
];

export default function PersonalConfirmation() {
	const [loading, setLoading] = useState(true); // อย่าลืมเปลี่ยนเป็น true หลังเทส
	const [activeTab, setActiveTab] = useState<ConfirmationTab>("pass-male-m4");
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

	const formatStatus = (value: boolean, trueText: string, falseText: string) => {
		return value ? trueText : falseText;
	};

	const mapLeaderboardItems = (items: LeaderboardApiItem[]): StudentConfirmation[] => {
		return items.map((item, index) => ({
			rank: index + 1,
			std_application_id: item.std_application_id,
			prefix: item.std_info?.std_info_prefix || "-",
			firstName: item.std_info?.std_info_first_name || "-",
			lastName: item.std_info?.std_info_last_name || "-",
			school: item.std_info?.std_info_education_institute || "-",
			email: item.std_user?.email || item.email || "-",
			phoneNumber: item.std_info?.std_info_phone_number || "-",
			submitStatus: formatStatus(item.std_application_submit, "submitted", "not_submitted"),
			applicationResult: item.std_application_result || "-",
			confirmStatus: formatStatus(item.std_application_confirm, "confirmed", "not_confirmed"),
			regisScore: item.std_total_score?.std_regis_score ?? null,
			academicScore: item.std_total_score?.std_academic_score ?? null,
			academicChaosScore: item.std_total_score?.std_academic_chaos_score ?? null,
			totalScore: item.std_total_score?.std_total_score ?? null,
		}));
	};

	const renderTableContent = (tab: ConfirmationTab, data: StudentConfirmation[]) => {
		if (loading && activeTab === tab) {
			return (
				<div className="flex h-[260px] w-full flex-col items-center justify-center gap-2 border rounded-md">
					<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
					<p className="text-sm text-muted-foreground">กำลังโหลดข้อมูล...</p>
				</div>
			);
		}

		return <DataTable columns={columns} data={data} enablePagination={false} />;
	};

	useEffect(() => {
		let cancelled = false;

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
				const currentTab = tabConfig[activeTab];
				const responseData = await fetchAPI(currentTab.path);
				const mappedData = mapLeaderboardItems(responseData);

				if (!cancelled) {
					setLists((prev) => ({
						...prev,
						[currentTab.key]: mappedData,
					}));
				}
			} catch (error) {
				console.error("Failed to fetch leaderboard data:", error);
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		setLoading(true);
		fetchData();

		return () => {
			cancelled = true;
		};
	}, [activeTab]);

	return (
		<>
			<PageTitle title="Personal Confirmation" description={`การประกาศผลและยืนยันสิทธิ์ของนักเรียน`} />

			<div className="mt-6">
				<div className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
					{categoryControls.map((category) => {
						const isPassActive = activeTab === category.pass;
						const isReserveActive = activeTab === category.reserve;

						return (
							<div key={category.pass} className="flex items-center gap-1">
								<Button className="flex-1" variant={isPassActive ? "default" : "outline"} onClick={() => setActiveTab(category.pass)}>
									ตัวจริง {category.label}
								</Button>
								<Button variant={isReserveActive ? "default" : "outline"} onClick={() => setActiveTab(category.reserve)}>
									สำรอง
								</Button>
							</div>
						);
					})}
				</div>

				<Tabs value={activeTab} className="w-full">
					<div className="rounded-lg shadow-sm bg-card">
						<TabsContent value="pass-male-m4" className="mt-0">
							{renderTableContent("pass-male-m4", lists.passMaleM4)}
						</TabsContent>

						<TabsContent value="pass-male-m5" className="mt-0">
							{renderTableContent("pass-male-m5", lists.passMaleM5)}
						</TabsContent>

						<TabsContent value="pass-female-m4" className="mt-0">
							{renderTableContent("pass-female-m4", lists.passFemaleM4)}
						</TabsContent>

						<TabsContent value="pass-female-m5" className="mt-0">
							{renderTableContent("pass-female-m5", lists.passFemaleM5)}
						</TabsContent>

						<TabsContent value="reserve-male-m4" className="mt-0">
							{renderTableContent("reserve-male-m4", lists.reserveMaleM4)}
						</TabsContent>

						<TabsContent value="reserve-male-m5" className="mt-0">
							{renderTableContent("reserve-male-m5", lists.reserveMaleM5)}
						</TabsContent>

						<TabsContent value="reserve-female-m4" className="mt-0">
							{renderTableContent("reserve-female-m4", lists.reserveFemaleM4)}
						</TabsContent>

						<TabsContent value="reserve-female-m5" className="mt-0">
							{renderTableContent("reserve-female-m5", lists.reserveFemaleM5)}
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</>
	);
}

"use client";

import { Loader2 } from "lucide-react";
import { useQueryState } from "nuqs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { config } from "@/config/config";
import { createColumns, StudentConfirmation } from "./column";

type LeaderboardApiItem = {
	std_application_id: string;
	std_application_submit: boolean;
	std_application_confirm: boolean;
	std_application_result: string;
	stf_application_allow_confirm?: boolean;
	stf_info_checked?: boolean;
	std_status?: {
		stf_info_checked?: boolean;
		stf_info_check?: {
			std_info_status?: "info_approve" | "info_reject" | "info_waiting" | string;
		};
	};
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
		std_info_nick_name?: string;
		std_info_education_level?: string;
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

const tabQueryToTabMap: Record<string, ConfirmationTab> = {
	pass_m4: "pass-male-m4",
	pass_m5: "pass-male-m5",
	reserve_m4: "reserve-male-m4",
	reserve_m5: "reserve-male-m5",
	pass_male_m4: "pass-male-m4",
	pass_male_m5: "pass-male-m5",
	pass_female_m4: "pass-female-m4",
	pass_female_m5: "pass-female-m5",
	reserve_male_m4: "reserve-male-m4",
	reserve_male_m5: "reserve-male-m5",
	reserve_female_m4: "reserve-female-m4",
	reserve_female_m5: "reserve-female-m5",
};

const tabToQueryMap: Record<ConfirmationTab, string> = {
	"pass-male-m4": "pass_male_m4",
	"pass-male-m5": "pass_male_m5",
	"pass-female-m4": "pass_female_m4",
	"pass-female-m5": "pass_female_m5",
	"reserve-male-m4": "reserve_male_m4",
	"reserve-male-m5": "reserve_male_m5",
	"reserve-female-m4": "reserve_female_m4",
	"reserve-female-m5": "reserve_female_m5",
};

const categoryControls: { label: string; pass: ConfirmationTab; reserve: ConfirmationTab }[] = [
	{ label: "ชาย ม.4", pass: "pass-male-m4", reserve: "reserve-male-m4" },
	{ label: "ชาย ม.5", pass: "pass-male-m5", reserve: "reserve-male-m5" },
	{ label: "หญิง ม.4", pass: "pass-female-m4", reserve: "reserve-female-m4" },
	{ label: "หญิง ม.5", pass: "pass-female-m5", reserve: "reserve-female-m5" },
];

export default function PersonalConfirmation() {
	const [loading, setLoading] = useState(true); // อย่าลืมเปลี่ยนเป็น true หลังเทส
	const [tabQuery, setTabQuery] = useQueryState("tab", {
		defaultValue: "pass_male_m4",
	});
	const activeTab = tabQueryToTabMap[tabQuery] ?? "pass-male-m4";
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
		return items.map((item, index) => {
			const infoCheckStatus = item.std_status?.stf_info_check?.std_info_status;
			const derivedInfoStatus: "info_approve" | "info_reject" | "info_waiting" =
				infoCheckStatus === "info_approve" || infoCheckStatus === "info_reject" || infoCheckStatus === "info_waiting"
					? infoCheckStatus
					: typeof item.stf_info_checked === "boolean"
						? item.stf_info_checked
							? "info_approve"
							: "info_waiting"
						: typeof item.std_status?.stf_info_checked === "boolean"
							? item.std_status.stf_info_checked
								? "info_approve"
								: "info_waiting"
							: "info_waiting";

			return {
				rank: index + 1,
				std_application_id: item.std_application_id,
				prefix: item.std_info?.std_info_prefix || "-",
				firstName: item.std_info?.std_info_first_name || "-",
				lastName: item.std_info?.std_info_last_name || "-",
				nickName: item.std_info?.std_info_nick_name || "-",
				educationLevel: item.std_info?.std_info_education_level || "-",
				school: item.std_info?.std_info_education_institute || "-",
				email: item.std_user?.email || item.email || "-",
				phoneNumber: item.std_info?.std_info_phone_number || "-",
				submitStatus: formatStatus(item.std_application_submit, "submitted", "not_submitted"),
				applicationResult: item.std_application_result || "-",
				confirmStatus: formatStatus(item.std_application_confirm, "confirmed", "not_confirmed"),
				infoStatus: derivedInfoStatus,
				allowConfirmStatus: item.stf_application_allow_confirm ?? false,
				regisScore: item.std_total_score?.std_regis_score ?? null,
				academicScore: item.std_total_score?.std_academic_score ?? null,
				academicChaosScore: item.std_total_score?.std_academic_chaos_score ?? null,
				totalScore: item.std_total_score?.std_total_score ?? null,
			};
		});
	};

	const handleAllowConfirmUpdated = useCallback((applicationId: string, allow: boolean) => {
		const updateList = (list: StudentConfirmation[]) => list.map((student) => (student.std_application_id === applicationId ? { ...student, allowConfirmStatus: allow } : student));

		setLists((prev) => ({
			passMaleM4: updateList(prev.passMaleM4),
			passMaleM5: updateList(prev.passMaleM5),
			passFemaleM4: updateList(prev.passFemaleM4),
			passFemaleM5: updateList(prev.passFemaleM5),
			reserveMaleM4: updateList(prev.reserveMaleM4),
			reserveMaleM5: updateList(prev.reserveMaleM5),
			reserveFemaleM4: updateList(prev.reserveFemaleM4),
			reserveFemaleM5: updateList(prev.reserveFemaleM5),
		}));
	}, []);

	const handleApplicationResultUpdated = useCallback((applicationId: string, result: string) => {
		const updateList = (list: StudentConfirmation[]) => list.map((student) => (student.std_application_id === applicationId ? { ...student, applicationResult: result } : student));

		setLists((prev) => ({
			passMaleM4: updateList(prev.passMaleM4),
			passMaleM5: updateList(prev.passMaleM5),
			passFemaleM4: updateList(prev.passFemaleM4),
			passFemaleM5: updateList(prev.passFemaleM5),
			reserveMaleM4: updateList(prev.reserveMaleM4),
			reserveMaleM5: updateList(prev.reserveMaleM5),
			reserveFemaleM4: updateList(prev.reserveFemaleM4),
			reserveFemaleM5: updateList(prev.reserveFemaleM5),
		}));
	}, []);

	const columns = useMemo(
		() =>
			createColumns({
				onAllowConfirmUpdated: handleAllowConfirmUpdated,
				onApplicationResultUpdated: handleApplicationResultUpdated,
			}),
		[handleAllowConfirmUpdated, handleApplicationResultUpdated],
	);

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

	const changeTab = (tab: ConfirmationTab) => {
		setTabQuery(tabToQueryMap[tab]);
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
			<PageTitle title="Result & Confirmation" description={`ประกาศผลและยืนยันสิทธิ์`} />

			<div className="mt-6">
				<div className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
					{categoryControls.map((category) => {
						const isPassActive = activeTab === category.pass;
						const isReserveActive = activeTab === category.reserve;

						return (
							<div key={category.pass} className="flex items-center gap-1">
								<Button className="flex-1" variant={isPassActive ? "default" : "outline"} onClick={() => changeTab(category.pass)}>
									ตัวจริง {category.label}
								</Button>
								<Button variant={isReserveActive ? "default" : "outline"} onClick={() => changeTab(category.reserve)}>
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

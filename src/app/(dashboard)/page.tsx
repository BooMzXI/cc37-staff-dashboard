"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { config } from "@/config/config";
import { STATS_CONFIG, type StatisticData } from "@/config/dashboard-stats";
import { authClient } from "@/lib/auth-client";

interface TimeLeftResponse {
	current: string;
	start_at: string;
	end_at: string;
	time_left: {
		day: number;
		hour: number;
		minute: number;
		second: number;
		milisecond: number;
	};
}

function RegistrationStatus({ timeLeft }: { timeLeft: TimeLeftResponse | null }) {
	if (!timeLeft) return null;

	const current = new Date(timeLeft.current);
	const startAt = new Date(timeLeft.start_at);
	const endAt = new Date(timeLeft.end_at);

	if (current > endAt) {
		return <span className="text-2xl font-semibold text-red-400">ปิดรับสมัครแล้ว 🥳</span>;
	}

	const { day, hour, minute, second } = timeLeft.time_left;
	const parts: string[] = [];
	if (day > 0) parts.push(`${day} วัน`);
	if (hour > 0) parts.push(`${hour} ชม.`);
	if (minute > 0) parts.push(`${minute} นาที`);
	if (second > 0) parts.push(`${second} วินาที`);

	return (
		<span className="text-2xl font-semibold text-green-400">
			เปิดรับสมัครอยู่ 🙏 <span className="text-lg text-muted-foreground">เหลือ {parts.join(" ")}</span>
		</span>
	);
}

export default function Dashboard() {
	const [data, setData] = useState<StatisticData | null>(null);
	const [timeLeft, setTimeLeft] = useState<TimeLeftResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = authClient.useSession();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [statsRes, timeRes] = await Promise.all([fetch(`${config.backend.baseUrl}/api/staff/statistic`, { credentials: "include" }), fetch(`${config.backend.baseUrl}/timeleft`, { credentials: "include" })]);
				if (statsRes.ok) setData(await statsRes.json());
				if (timeRes.ok) setTimeLeft(await timeRes.json());
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<div className="mb-8 flex md:items-center md:flex-row justify-between flex-col-reverse">
				<div className="mt-5 md:mt-0">
					<h1 className="text-3xl font-bold text-foreground">Overview</h1>
					<p className="text-lg text-muted-foreground">Welcome Back! : {session?.user.name}</p>
				</div>
				<RegistrationStatus timeLeft={timeLeft} />
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{data &&
					STATS_CONFIG.map((stat) => {
						const value = data[stat.key as keyof StatisticData];
						const Icon = stat.icon;
						return (
							<div key={stat.key} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
								<div className="flex items-center justify-between">
									<span className={`text-sm font-medium text-muted-foreground ${stat.color || ""}`}>{stat.label}</span>
									<Icon className="h-4 w-4 text-muted-foreground" />
								</div>
								<div className="mt-2 text-2xl font-bold text-card-foreground">{value}</div>
								<p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
							</div>
						);
					})}
			</div>
		</>
	);
}

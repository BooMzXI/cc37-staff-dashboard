"use client";

import PageTitle from "@/components/PageTitle";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { columns, StudentConfirmation } from "./column";

export default function PersonalInformation() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<StudentConfirmation[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`/api/personal-information`, {
					method: "GET",
					credentials: "include",
				});
				if (!res.ok) throw new Error("Failed to fetch data");
				const jsonData = await res.json();
				setData(jsonData);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex h-96 w-full items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<>
			<PageTitle title="Personal Confirmation" description={`การยืนยันใบสมัครของนักเรียน`} />
			<div className="mt-6 rounded-lg shadow-sm">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}

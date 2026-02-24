"use client";

import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { columns, StudentRegisQuestion } from "./column";
import { config } from "@/config/config";

export default function RegisQuestionPage() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<StudentRegisQuestion[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${config.backend.baseUrl}/api/staff/regis/answer`, {
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

	// Calculate stats
	const totalApplications = data.length;
	const submittedCount = data.filter((d) => d.std_application_submit).length;
	const checkedCount = data.filter((d) => d.std_status?.stf_regis_question_checked).length;
	const withQuestionsCount = data.filter((d) => d.std_regis_question.length > 0).length;

	return (
		<>
			<PageTitle title="ตรวจคำตอบ คำถามทะเบียน" description={`ทั้งหมด ${totalApplications} ใบสมัคร | ส่งแล้ว ${submittedCount} | มีคำตอบ ${withQuestionsCount} | ตรวจแล้ว ${checkedCount}`} />
			<div className="mt-6 rounded-lg shadow-sm">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}

"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { config } from "@/config/config";
import { columns, StudentAcademicQuestion } from "./column";

export default function AcademicQuestionPage() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<StudentAcademicQuestion[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${config.backend.baseUrl}/api/staff/academic/answer`, {
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
		return <Loading />;
	}

	// Calculate stats
	const totalApplications = data.length;
	const submittedCount = data.filter((d) => d.std_application_submit).length;
	const checkedCount = data.filter((d) => d.std_status?.stf_academic_question_checked).length;
	const withQuestionsCount = data.filter((d) => d.std_academic_question.length > 0).length;

	return (
		<>
			<PageTitle title="ตรวจคำตอบ คำถามวิชาการ" description={`ทั้งหมด ${totalApplications} ใบสมัคร | ส่งแล้ว ${submittedCount} | มีคำตอบ ${withQuestionsCount} | ตรวจแล้ว ${checkedCount}`} />
			<div className="mt-6 rounded-lg shadow-sm">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}

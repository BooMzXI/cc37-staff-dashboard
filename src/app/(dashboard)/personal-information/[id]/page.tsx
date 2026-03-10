"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { config } from "@/config/config";
import { formatThaiDate, formatThaiDateTime } from "@/lib/utils";
import { StaffInfoCheck, StudentDetail } from "@/types/student";
import ActionFooterCard from "../components/ActionFooterCard";
import ApplicationStatusCard from "../components/ApplicationStatusCard";
import NoteCard from "../components/NoteCard";
import ProfileCard from "../components/ProfileCard";
import StudentInfoSection from "../components/StudentInfoSection";

export default function PersonalDetail() {
	const params = useParams();
	const id = params?.id as string;
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<StudentDetail | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchStudentDetail = async () => {
			try {
				const res = await fetch(`${config.backend.baseUrl}/api/staff/application/${id}`, {
					method: "GET",
					credentials: "include",
					cache: "no-store",
				});
				if (!res.ok) throw new Error("Failed to fetch detail");

				const data = await res.json();
				setData(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchStudentDetail();
	}, [id]);

	const handleNoteUpdated = (newNote: string | null) => {
		setData((prevData) => {
			if (!prevData) return null;
			return {
				...prevData,
				std_status: {
					...prevData.std_status,
					std_info_note: newNote,
				},
			};
		});
	};

	const handleStatusUpdated = (newInfoCheckData: StaffInfoCheck) => {
		setData((prevData) => {
			if (!prevData) return null;
			const oldInfoCheck = prevData.std_status.stf_info_check;

			return {
				...prevData,
				std_status: {
					...prevData.std_status,
					stf_info_check: {
						...(oldInfoCheck || {}),
						...newInfoCheckData,
					} as StaffInfoCheck,
				},
			};
		});
	};

	if (loading) {
		return <Loading />;
	}

	if (!data) {
		return (
			<div className="min-h-screen bg-background">
				<main className="mx-auto max-w-4xl px-4 py-16 text-center">
					<h1 className="text-xl font-bold text-foreground mb-2">ไม่พบข้อมูลผู้สมัคร</h1>
					<p className="text-muted-foreground mb-6">รหัสอ้างอิง: {id}</p>
					<Button variant="outline" onClick={() => router.push("/personal-information")}>
						กลับไปหน้ารายชื่อ
					</Button>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
				<Card className="mb-6 p-6 overflow-hidden">
					{/* Header */}
					<div className="mb-6 flex items-center gap-3">
						<Button variant="ghost" size="icon" onClick={() => router.push("/personal-information")} className="shrink-0 hover:bg-muted">
							<ArrowLeft className="h-5 w-5" />
						</Button>
						<h2 className="text-lg font-semibold text-foreground">ข้อมูลส่วนตัว</h2>
					</div>

					<div className=" gap-6 lg:grid-cols-[1fr_1.5fr] w-full items-start animate-slideLeftIn">
						{/* Left column */}
						<div className="space-y-6 min-w-0 lg:sticky top-6">
							{/* Photo placeholder */}
							<ProfileCard data={data} profileFileKey={data.std_file.filter((file) => file.std_file_type === "file_face")[0]?.std_file_key} />
							{/* Application status */}
							<ApplicationStatusCard statusData={data.std_status} files={data.std_file} updatedAt={data.std_status?.updated_at} formatThaiDateTime={formatThaiDateTime} />

							{/* Note */}
							<NoteCard applicationId={data.std_application_id} note={data.std_status?.std_info_note ?? undefined} onNoteUpdated={handleNoteUpdated} />
						</div>

						{/* Right column */}
						<div className="space-y-6">
							{/* Personal info */}
							<StudentInfoSection data={data} formatThaiDate={formatThaiDate} />
						</div>
					</div>
					<div className="mt-6">
						<ActionFooterCard
							applicationId={data.std_application_id}
							infoCheckData={data.std_status?.stf_info_check}
							updatedAt={data.std_status.stf_info_check?.updated_at}
							formatThaiDateTime={formatThaiDateTime}
							onStatusUpdated={handleStatusUpdated}
						/>
					</div>
				</Card>
			</main>
		</div>
	);
}

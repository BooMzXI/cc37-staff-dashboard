import axios from "axios";
import { ExternalLink, Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { config } from "@/config/config";
import { StudentFile, StudentStatus } from "@/types/student";
import { StatusBadge } from "./StatusBadge";

interface ApplicationStatusCardProps {
	statusData?: StudentStatus | null;
	files?: StudentFile[];
	updatedAt?: string;
	formatThaiDateTime: (date?: string) => string;
}

const fileTypeLabelMap: Record<string, string> = {
	file_national_id: "บัตรประชาชน",
	file_parent_permission: "ใบอนุญาตผู้ปกครอง",
	file_pp_1: "ปพ.1",
	file_pp_7: "ปพ.7",
	file_slip: "สลิปโอนเงิน",
};

interface StudentFileUrl extends StudentFile {
	url: string;
}

export default function ApplicationStatusCard({ statusData, files, updatedAt, formatThaiDateTime }: ApplicationStatusCardProps) {
	const [studentFile, setStudentFile] = useState<StudentFileUrl | null>();

	async function fetchFile(key: string) {
		setStudentFile(null);
		try {
			axios.defaults.withCredentials = true;
			const fileRes = await axios.get(`${config.backend.baseUrl}/api/staff/file/${key}`);
			setStudentFile(fileRes.data);
		} catch (e) {
			console.log(e);
			setStudentFile(null);
		}
	}

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">สถานะการสมัคร</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap">
					<StatusBadge checked={statusData?.std_status_info_done || false} label="ข้อมูลส่วนตัว" />
					<StatusBadge checked={statusData?.std_status_file_done || false} label="ไฟล์เอกสาร" />
					<StatusBadge checked={statusData?.std_status_regis_question_done || false} label="คำถามฝ่ายทะเบียน" />
					<StatusBadge checked={statusData?.std_status_acdemic_question_done || false} label="คำถามวิชาการ" />
					<StatusBadge checked={statusData?.std_status_academic_chaos_question_done || false} label="คำถามเชาว์" />
					<StatusBadge checked={statusData?.std_status_payment_done || false} label="การชำระเงิน" />
					<StatusBadge checked={statusData?.stf_regis_question_checked || false} label="ตรวจคำถามฝ่ายทะเบียน" />
					<StatusBadge checked={statusData?.stf_academic_question_checked || false} label="ตรวจคำถามวิชาการ" />
				</div>

				{files && files.length > 0 && (
					<div className="bg-muted/30 p-4 rounded-lg border border-border mt-4 mb-4">
						<div className="flex flex-wrap gap-2">
							{files
								.filter((f) => f.std_file_type !== "file_face" && !f.std_file_disabled)
								.map((file, i) => {
									const label = fileTypeLabelMap[file.std_file_type] || file.std_file_originalname;
									return (
										<Dialog key={i}>
											<DialogTrigger asChild>
												<Button key={file.std_file_key} variant="outline" size="sm" className="h-8 text-xs hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors" onClick={() => fetchFile(file.std_file_key)}>
													{label}
													<ExternalLink className="ml-1.5 h-3 w-3" />
												</Button>
											</DialogTrigger>
											<DialogContent className="max-w-sm md:max-w-2xl">
												<DialogHeader>
													<DialogTitle>{label}</DialogTitle>
												</DialogHeader>
												<div className="flex flex-col">
													<div className="flex items-center gap-2 rounded-md w-full">
														{studentFile?.url ? (
															studentFile.std_file_mimetype === "application/pdf" ? (
																<iframe src={studentFile.url} className="w-full h-[500px] rounded-md border" title={label} />
															) : (
																<img className="mx-auto rounded-md max-h-[500px] object-contain" src={studentFile.url} alt={label} />
															)
														) : (
															<div className="flex flex-col items-center justify-center w-full h-32 text-muted-foreground">
																<Loader2 className="animate-spin" size={35} />
																<div className="text-xs mt-3">กำลังโหลดตัวอย่าง</div>
															</div>
														)}
													</div>
												</div>

												<div className="flex flex-row w-full justify-between">
													<div className="flex flex-col">
														<div className="text-sm text-white/60">อัพโหลดเมื่อ : {studentFile ? new Date(studentFile.created_at).toLocaleString() : "-"}</div>
														<div className="text-sm mt-2 text-white/60">ประเภทไฟล์ : {studentFile ? studentFile.std_file_mimetype : "-"}</div>
														<div className="text-sm mt-2 text-white/60">ขนาด : {studentFile ? (studentFile.std_file_size / 1024).toFixed(3) : "-"} KB</div>
													</div>
													<div className="flex flex-col justify-end">
														<a href={studentFile?.url} hidden={!studentFile} target="_blank" className="px-5 hover:bg-white/20 active:bg-white/40 py-2 rounded-md duration-300 bg-white/10">
															เปิดอีกเเท็ป
														</a>
													</div>
												</div>
											</DialogContent>
										</Dialog>
									);
								})}
						</div>
					</div>
				)}

				{updatedAt && <p className="text-xs text-muted-foreground mt-3 bg-muted/50 p-2 rounded-md">ตรวจสอบเมื่อ: {formatThaiDateTime(updatedAt)}</p>}
			</CardContent>
		</Card>
	);
}

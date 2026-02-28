"use client";

import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { config } from "@/config/config";
import { StaffInfoCheck } from "@/types/student";
import { StatusApplication, statusMap } from "./StatusApplication";

interface ActionFooterProps {
	applicationId: string;
	infoCheckData?: StaffInfoCheck | null;
	updatedAt?: string;
	formatThaiDateTime: (date?: string) => string;
	onStatusUpdated: (newStatusData: StaffInfoCheck) => void;
}

export default function ActionFooterCard({ applicationId, infoCheckData, updatedAt, formatThaiDateTime, onStatusUpdated }: ActionFooterProps) {
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [pendingStatus, setPendingStatus] = useState<"info_approve" | "info_reject" | "info_waiting" | null>(null);
	const triggerUpdate = (status: "info_approve" | "info_reject" | "info_waiting") => {
		setPendingStatus(status);
		setIsDialogOpen(true);
	};

	const handleConfirmUpdate = async () => {
		if (!pendingStatus || !applicationId) return;

		setIsUpdating(true);
		setIsDialogOpen(false);

		try {
			const res = await fetch(`${config.backend.baseUrl}/api/staff/status/info/check`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					application_id: applicationId,
					status: pendingStatus,
				}),
				credentials: "include",
			});

			if (!res.ok) throw new Error("Failed to update status");

			const data = await res.json();

			if (data) {
				onStatusUpdated(data);
				toast.success(`อัปเดตสถานะเป็น "${statusMap[pendingStatus].label}" สำเร็จ!`);
			}
		} catch (error) {
			console.error(error);
			toast.error("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
		} finally {
			setIsUpdating(false);
			setPendingStatus(null);
		}
	};

	const currentStatus = infoCheckData?.std_info_status || "info_waiting";

	return (
		<Card className="border-2 border-muted/50 relative overflow-hidden">
			{isUpdating && (
				<div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
					<Loader2 className="h-8 w-8 animate-spin text-primary" />
				</div>
			)}

			<CardContent className="p-6 text-center flex flex-col items-center">
				<StatusApplication statusInfo={infoCheckData} />

				<div className="mt-2 mb-6 text-sm text-muted-foreground bg-muted/30 py-2 px-4 rounded-full inline-block">
					อัปเดตล่าสุดเมื่อ: <span className="font-medium text-foreground">{formatThaiDateTime(updatedAt)}</span>
				</div>

				<Separator className="w-1/2 mb-6" />
				<h3 className="text-sm font-semibold text-foreground mb-4">จัดการสถานะการตรวจสอบข้อมูล</h3>

				<div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl mx-auto">
					<Button
						className={`flex-1 min-w-[180px] min-h-[50px] ${currentStatus === "info_approve" ? "opacity-50" : "bg-green-600 hover:bg-green-700 text-white"}`}
						variant={currentStatus === "info_approve" ? "outline" : "default"}
						disabled={currentStatus === "info_approve" || isUpdating}
						onClick={() => triggerUpdate("info_approve")}
					>
						<CheckCircle2 className="mr-2 h-5 w-5" /> ข้อมูลถูกต้อง
					</Button>

					<Button
						className={`flex-1 min-w-[180px] min-h-[50px] ${currentStatus === "info_reject" ? "opacity-50" : "bg-red-600 hover:bg-red-700 text-white"}`}
						variant={currentStatus === "info_reject" ? "outline" : "default"}
						disabled={currentStatus === "info_reject" || isUpdating}
						onClick={() => triggerUpdate("info_reject")}
					>
						<XCircle className="mr-2 h-5 w-5" /> ข้อมูลไม่ถูกต้อง
					</Button>

					<Button
						className={`flex-1 min-w-[180px] min-h-[50px] ${currentStatus === "info_waiting" ? "opacity-50" : "text-amber-600 border-amber-500 hover:bg-amber-50"}`}
						variant="outline"
						disabled={currentStatus === "info_waiting" || isUpdating}
						onClick={() => triggerUpdate("info_waiting")}
					>
						<Clock className="mr-2 h-5 w-5" /> รอส่งเอกสารเพิ่ม
					</Button>
				</div>
			</CardContent>

			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>ยืนยันการเปลี่ยนสถานะ?</AlertDialogTitle>
						<AlertDialogDescription>
							คุณกำลังจะเปลี่ยนสถานะการตรวจสอบข้อมูลของน้องเป็น <strong className="text-foreground">{pendingStatus ? statusMap[pendingStatus].label : ""}</strong>
							<br />
							ระบบจะบันทึกชื่อของคุณเป็นผู้ตรวจสอบล่าสุด
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isUpdating}>ยกเลิก</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmUpdate} disabled={isUpdating}>
							ยืนยันการอัปเดต
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Card>
	);
}

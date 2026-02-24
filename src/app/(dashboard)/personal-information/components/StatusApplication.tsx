import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { StaffInfoCheck } from "@/types/student";

export const statusMap: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
	info_approve: { label: "ข้อมูลถูกต้อง", icon: <CheckCircle2 className="h-7 w-7" />, color: "text-green-600" },
	info_reject: { label: "ข้อมูลไม่ถูกต้อง", icon: <XCircle className="h-7 w-7" />, color: "text-red-600" },
	info_waiting: { label: "รอตรวจสอบ", icon: <Clock className="h-7 w-7" />, color: "text-amber-500" },
};

export const StatusApplication = ({ statusInfo }: { statusInfo?: StaffInfoCheck | null }) => {
	const currentStatus = statusInfo?.std_info_status || "info_waiting";
	const display = statusMap[currentStatus] || statusMap["info_waiting"];

	return (
		<div className="flex flex-col items-center justify-center space-y-3 py-6">
			<div className={`flex items-center gap-3 text-2xl font-bold ${display.color}`}>
				<span>{display.label}</span>
				{display.icon}
			</div>

			{statusInfo?.stf_user?.name && <p className="text-sm text-muted-foreground mt-2">ตรวจสอบล่าสุดโดย: {statusInfo.stf_user.name}</p>}
		</div>
	);
};

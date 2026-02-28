import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex flex-col justify-center items-center h-[50vh]">
			<Loader2 size={70} className="animate-spin text-primary" />
			<div className="text-xl mt-5">กำลังโหลดข้อมูลล่าสุด</div>
		</div>
	);
}

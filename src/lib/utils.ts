import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatThaiDate = (dateString?: string) => {
	if (!dateString) return "-";

	const [year, month, day] = dateString.split("-");
	if (!year || !month || !day) return dateString;

	const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

	const thaiYear = parseInt(year, 10) + 543;
	const thaiMonth = thaiMonths[parseInt(month, 10) - 1];
	const thaiDay = parseInt(day, 10);

	return `${thaiDay} ${thaiMonth} ${thaiYear}`;
};

export const formatThaiDateTime = (dateString?: string) => {
	if (!dateString) return "ยังไม่มีการตรวจสอบ";

	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return "รูปแบบเวลาไม่ถูกต้อง";

	const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

	const day = date.getDate();
	const month = thaiMonths[date.getMonth()];
	const year = date.getFullYear() + 543;
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${day} ${month} ${year} เวลา ${hours}:${minutes} น.`;
};

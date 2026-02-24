import { Users, FileText, CheckCircle, CreditCard, FileCheck, type LucideIcon } from "lucide-react";

export interface StatisticData {
	user: number;
	app: number;
	app_submit: number;
	app_info_done: number;
	app_file_done: number;
	app_regis_question_done: number;
	app_payment_done: number;
	student_male: number;
	student_female: number;
}

export type StatConfig = {
	key: keyof StatisticData;
	label: string;
	icon: LucideIcon;
	color?: string;
	description?: string;
};

export const STATS_CONFIG: StatConfig[] = [
	{
		key: "user",
		label: "ผู้ลงทะเบียนทั้งหมด",
		icon: Users,
		description: "จำนวนผู้ใช้ที่ลงทะเบียนในระบบ",
	},
	{
		key: "app_submit",
		label: "ส่งใบสมัครแล้ว",
		icon: CheckCircle,
		color: "text-green-500",
		description: "ผู้สมัครที่ส่งใบสมัครเรียบร้อยแล้ว",
	},
	{
		key: "app_payment_done",
		label: "ชำระเงินแล้ว",
		icon: CreditCard,
		description: "ผู้สมัครที่ชำระเงินเรียบร้อยแล้ว",
	},
	{
		key: "app_file_done",
		label: "อัปโหลดเอกสารครบ",
		icon: FileCheck,
		description: "ผู้สมัครที่อัปโหลดเอกสารครบถ้วน",
	},
	{
		key: "app",
		label: "จำนวนใบสมัครทั้งหมด",
		icon: FileText,
		description: "จำนวนผู้สมัครที่ลงทะเบียนในระบบ",
	},
	{
		key: "app_info_done",
		label: "กรอกข้อมูลครบ",
		icon: FileCheck,
		description: "ผู้สมัครที่กรอกข้อมูลส่วนบุคคลครบถ้วน",
	},
	{
		key: "app_regis_question_done",
		label: "ตอบคำถามสมัครครบ",
		icon: FileCheck,
		description: "ผู้สมัครที่ตอบคำถามจากฝ่ายทะเบียนครบถ้วน",
	},
	{
		key: "student_male",
		label: "นักเรียนชาย",
		icon: Users,
		description: "นับเฉพาะคนที่ข้อมูลส่วนตัวครบ",
	},
	{
		key: "student_female",
		label: "นักเรียนหญิง",
		icon: Users,
		description: "นับเฉพาะคนที่ข้อมูลส่วนตัวครบ",
	},
];

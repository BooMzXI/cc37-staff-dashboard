import { ROLES } from "@/constants/roles";
import { Home, Users, BookOpen, Settings, ShieldCheck, FileQuestionMark } from "lucide-react";

export type MenuItem = {
	title: string;
	url: string;
	icon: unknown;
	roles: string[];
};

export const MENU_ITEMS: MenuItem[] = [
	{
		title: "หน้าหลัก",
		url: "/",
		icon: Home,
		roles: [ROLES.ADMIN, ROLES.ACADEMIC, ROLES.REGISTRATION],
	},
	{
		title: "ข้อมูลส่วนตัว",
		url: "/personal-information",
		icon: Users,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
	},
	{
		title: "คำถามทะเบียน",
		url: "/regis-question",
		icon: FileQuestionMark,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
	},
	{
		title: "ยืนยันสิทธิ์",
		url: "/confirm",
		icon: ShieldCheck,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
	},
	{
		title: "คำถามวิชาการ",
		url: "/academic-questions",
		icon: BookOpen,
		roles: [ROLES.ADMIN, ROLES.ACADEMIC],
	},
	{
		title: "เปลี่ยนรหัสผ่าน",
		url: "/change-password",
		icon: Settings,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION, ROLES.ACADEMIC],
	},
	{
		title: "ผู้ดูแลระบบ (Admin)",
		url: "/admin",
		icon: ShieldCheck,
		roles: [ROLES.ADMIN],
	},
];

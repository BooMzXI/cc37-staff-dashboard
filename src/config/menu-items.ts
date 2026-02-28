import { BookOpen, FileQuestionMark, Home, Mail, Settings, ShieldCheck, Users } from "lucide-react";
import { ROLES } from "@/constants/roles";
import { config } from "./config";

export type MenuItem = {
	title: string;
	url: string;
	icon: unknown;
	roles: string[];
	isEnable: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
	{
		title: "หน้าหลัก",
		url: "/",
		icon: Home,
		roles: [ROLES.ADMIN, ROLES.ACADEMIC, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("MAIN"),
	},
	{
		title: "ข้อมูลส่วนตัว",
		url: "/personal-information",
		icon: Users,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("PROFILE"),
	},
	{
		title: "ส่งอีเมล",
		url: "/send-email",
		icon: Mail,
		roles: [ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("SEND_EMAIL"),
	},
	{
		title: "คำถามทะเบียน",
		url: "/regis-question",
		icon: FileQuestionMark,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("REGIS_QUESTION"),
	},
	{
		title: "ยืนยันสิทธิ์",
		url: "/confirm",
		icon: ShieldCheck,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("CONFIRMATION"),
	},
	{
		title: "คำถามวิชาการ",
		url: "/academic-questions",
		icon: BookOpen,
		roles: [ROLES.ADMIN, ROLES.ACADEMIC],
		isEnable: config.enabledTab.includes("ACADEMIC_QUESTION"),
	},
	{
		title: "เปลี่ยนรหัสผ่าน",
		url: "/change-password",
		icon: Settings,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION, ROLES.ACADEMIC],
		isEnable: config.enabledTab.includes("CHANGE_PASS"),
	},
	{
		title: "ผู้ดูแลระบบ (Admin)",
		url: "/admin",
		icon: ShieldCheck,
		roles: [ROLES.ADMIN],
		isEnable: config.enabledTab.includes("ADMIN"),
	},
];

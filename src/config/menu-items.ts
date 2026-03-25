import { BookOpen, FileQuestionMark, Home, Mail, Settings, ShieldCheck, Ticket, Upload, Users } from "lucide-react";
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
		title: "หน้าหลัก (S)",
		url: "/",
		icon: Home,
		roles: [ROLES.ADMIN, ROLES.ACADEMIC, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("MAIN"),
	},
	{
		title: "ข้อมูลส่วนตัว (R)",
		url: "/personal-information",
		icon: Users,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("PROFILE"),
	},
	{
		title: "ส่งอีเมล (R)",
		url: "/send-email",
		icon: Mail,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("SEND_EMAIL"),
	},
	{
		title: "คำถามทะเบียน (R)",
		url: "/regis-question",
		icon: FileQuestionMark,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("REGIS_QUESTION"),
	},
	{
		title: "ยืนยันสิทธิ์ (R)",
		url: "/confirm",
		icon: ShieldCheck,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION],
		isEnable: config.enabledTab.includes("CONFIRMATION"),
	},
	{
		title: "Export (S)",
		url: "/export",
		icon: Upload,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION, ROLES.ACADEMIC],
		isEnable: config.enabledTab.includes("EXPORT"),
	},
	{
		title: "คำถามวิชาการ (Ac)",
		url: "/academic-question",
		icon: BookOpen,
		roles: [ROLES.ADMIN, ROLES.ACADEMIC],
		isEnable: config.enabledTab.includes("ACADEMIC_QUESTION"),
	},
	{
		title: "คำถามวิชาการ (เชาว์) (Ac)",
		url: "/academic-chaos-question",
		icon: BookOpen,
		roles: [ROLES.ADMIN, ROLES.ACADEMIC],
		isEnable: config.enabledTab.includes("ACADEMIC_CHAOS_QUESTION"),
	},
	{
		title: "เปลี่ยนรหัสผ่าน (S)",
		url: "/change-password",
		icon: Settings,
		roles: [ROLES.ADMIN, ROLES.REGISTRATION, ROLES.ACADEMIC, ROLES.STAFF],
		isEnable: config.enabledTab.includes("CHANGE_PASS"),
	},
	{
		title: "เเจ้งปัญหา (Ad)",
		url: "/ticket",
		icon: Ticket,
		roles: [ROLES.ADMIN],
		isEnable: config.enabledTab.includes("TICKET"),
	},
	{
		title: "บัญชีผู้ใช้ (Ad)",
		url: "/admin",
		icon: ShieldCheck,
		roles: [ROLES.ADMIN],
		isEnable: config.enabledTab.includes("ADMIN"),
	},
];

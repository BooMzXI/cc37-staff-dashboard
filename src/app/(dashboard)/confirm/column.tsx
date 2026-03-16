"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pin, Search, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface StudentConfirmation {
	std_application_id: string;
	std_user: {
		name: string;
		email: string;
	};
	std_info: {
		std_info_gender: string;
		std_info_phone_number: string;
		std_info_nick_name: string;
		std_info_first_name: string;
		std_info_last_name: string;
		std_info_education_level: string;
	};
}

export const columns: ColumnDef<StudentConfirmation>[] = [
	{
		accessorKey: "std_info",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ชื่อ-นามสกุล <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const fname = row.original.std_info.std_info_first_name || "-";
			const lname = row.original.std_info.std_info_last_name || "-";

			return (
				<div className="w-[100px] md:w-[10px] lg:w-[200px] truncate" title={fname}>
					{decodeURI(fname)} {decodeURI(lname)}
				</div>
			);
		},
	},
	{
		accessorKey: "std_info.std_info_nick_name",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ชื่อเล่น <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const name = row.original.std_info.std_info_nick_name;
			return decodeURI(name);
		},
	},
	{
		accessorKey: "std_info.std_info_gender",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					เพศ <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (row.original.std_info?.std_info_gender === "male" ? "ชาย" : "หญิง"),
	},
	{
		accessorKey: "std_info.std_info_education_level",
		header: "ระดับชั้น",
		cell: ({ row }) => {
			const level = row.original.std_info?.std_info_education_level || "-";
			const flevel = decodeURI(level);
			if (flevel.includes("4")) return "ม.4";
			if (flevel.includes("5")) return "ม.5";
			return flevel;
		},
	},
	{
		accessorKey: "std_user.email",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Email <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const email = row.original.std_user?.email || "-";
			return (
				<div className="w-[180px] md:w-[200px] lg:w-[250px] truncate" title={email}>
					{email}
				</div>
			);
		},
	},
	{
		accessorKey: "std_info.std_info_phone_number",
		header: "เบอร์โทรศัพท์",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const application = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<Send className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>{`ตรวจสอบ ${application.std_user.name}`}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									toast.success("ยืนยันสิทธิ์สำเร็จ");
								}}
								className="flex items-center cursor-pointer"
							>
								<Pin className="mr-2" />
								<p>ยืนยันสิทธิ์</p>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href={`/personal-information/${application.std_application_id}`} className="flex items-center">
									<Search className="mr-2" />
									<p>ข้อมูลส่วนตัว</p>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

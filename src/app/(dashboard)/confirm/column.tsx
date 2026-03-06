"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pin, Search } from "lucide-react";
import Link from "next/link";
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
	};
}

export const columns: ColumnDef<StudentConfirmation>[] = [
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
		id: "actions",
		cell: ({ row }) => {
			const application = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<Search className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>{`ตรวจสอบ ${application.std_user.name}`}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href={`/confirm/${application.std_application_id}`} className="flex items-center">
									<Pin className="mr-2" />
									<p>ยืนยันสิทธิ์</p>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href={`/personal-information/${application.std_application_id}`}>ข้อมูลส่วนตัว</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

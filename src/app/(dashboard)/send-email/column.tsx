"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheckBig, CircleX, Clock, Eye, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface StudentApplication {
	std_application_id: string;
	std_application_submit: boolean;
	//std_application_confirmed: boolean;
	std_user: {
		name: string;
		email: string;
	};
	std_info: {
		std_info_gender: string;
		std_info_phone_number: string;
	};
	std_status: {
		stf_info_check?: {
			std_info_status: "info_approve" | "info_reject" | "info_waiting" | string;
		} | null;
	};
}

export const columns: ColumnDef<StudentApplication>[] = [
	{
		accessorKey: "std_user.name",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ชื่อ-นามสกุล <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const name = row.original.std_user?.name || "-";
			return (
				<div className="w-[100px] md:w-[10px] lg:w-[200px] truncate" title={name}>
					{name}
				</div>
			);
		},
	},
	{
		accessorKey: "std_info.std_info_phone_number",
		header: "เบอร์โทรศัพท์",
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
		id: "actions",
		cell: ({ row }) => {
			const application = row.original;
			return (
				<Link href={`/personal-information/${application.std_application_id}`}>
					<Button variant="ghost" size="icon" className="hover:bg-primary/10 cursor-pointer">
						<Search className="h-4 w-4" />
					</Button>
				</Link>
			);
		},
	},
];

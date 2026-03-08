"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SentEmail {
	email_id: string;
	email_subject: string;
	email_content: string;
	email_to_email: string;
	email_to_name: string;
	email_has_sent: boolean;
	stf_user_id: string;
	created_at: string;
	updated_at: string;
	stf_user: {
		id: string;
		name: string;
		email: string;
		username: string;
		displayUsername: string;
		role: string;
	};
}

export function getColumns(onViewDetail: (item: SentEmail) => void): ColumnDef<SentEmail>[] {
	return [
		{
			accessorKey: "email_to_name",
			header: ({ column }) => (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ผู้รับ <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
		},
		{
			accessorKey: "email_to_email",
			header: ({ column }) => (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					อีเมล <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: ({ row }) => {
				const email = row.original.email_to_email;
				return (
					<div className="max-w-[200px] truncate" title={email}>
						{email}
					</div>
				);
			},
		},
		{
			accessorKey: "email_subject",
			header: ({ column }) => (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					หัวข้อ <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: ({ row }) => (
				<div className="max-w-[150px] truncate" title={row.original.email_subject}>
					{row.original.email_subject}
				</div>
			),
		},
		{
			accessorKey: "email_content",
			header: "เนื้อหา",
			cell: ({ row }) => (
				<div className="max-w-[200px] truncate" title={row.original.email_content}>
					{row.original.email_content}
				</div>
			),
		},
		{
			accessorKey: "stf_user.name",
			id: "sender",
			header: ({ column }) => (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ผู้ส่ง <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: ({ row }) => row.original.stf_user?.name ?? row.original.stf_user_id,
		},
		{
			accessorKey: "email_has_sent",
			header: "สถานะ",
			cell: ({ row }) =>
				row.original.email_has_sent ? (
					<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">ส่งแล้ว</span>
				) : (
					<span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">รอส่ง</span>
				),
		},
		{
			accessorKey: "created_at",
			header: ({ column }) => (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					วันที่ส่ง <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: ({ row }) =>
				new Date(row.original.created_at).toLocaleString("th-TH", {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				}),
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<Button variant="ghost" size="sm" onClick={() => onViewDetail(row.original)} className="flex items-center gap-1">
					<Search />
				</Button>
			),
		},
	];
}

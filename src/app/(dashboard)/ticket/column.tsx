"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface StaffUser {
	id: string;
	name: string;
	email: string;
	emailVerified?: boolean;
	image?: string | null;
	createdAt?: string;
	updatedAt?: string;
	role: string;
	banned?: boolean;
	banReason?: string | null;
	banExpires?: string | null;
	username: string;
	displayUsername: string;
}

export interface Ticket {
	std_user_id: string;
	ticket_id: string;
	ticket_system_message: string;
	ticket_user_message: string | null;
	ticket_solved: boolean;
	stf_solve_message: string | null;
	stf_user_id: string | null;
	created_at: string;
	updated_at: string;
	std_user: StaffUser;
	stf_user: StaffUser | null;
}

export const columns: ColumnDef<Ticket>[] = [
	{
		accessorKey: "ticket_id",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					รหัส Ticket <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const id = row.original.ticket_id;
			return (
				<div className="w-[120px] truncate font-mono text-xs" title={id}>
					{id.substring(0, 8)}...
				</div>
			);
		},
	},
	{
		accessorKey: "std_user.displayUsername",
		id: "student_name",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ผู้ส่ง <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="text-sm">{row.original.std_user?.displayUsername || row.original.std_user?.name || "-"}</div>;
		},
	},
	{
		accessorKey: "ticket_user_message",
		header: () => {
			return <Button variant="ghost">ข้อความจากผู้ใช้</Button>;
		},
		cell: ({ row }) => {
			const msg = row.original.ticket_user_message;
			return (
				<div className="max-w-[200px] truncate text-sm" title={msg || ""}>
					{msg || "-"}
				</div>
			);
		},
	},
	{
		accessorKey: "ticket_solved",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					สถานะ <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const solved = row.original.ticket_solved;
			return solved ? (
				<div className="flex items-center gap-1 text-green-600 text-sm">
					<Check size={16} /> แก้ไขแล้ว
				</div>
			) : (
				<div className="flex items-center gap-1 text-red-600 text-sm">
					<X size={16} /> รอดำเนินการ
				</div>
			);
		},
	},
	{
		accessorKey: "created_at",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					วันที่สร้าง <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="text-xs">{new Date(row.original.created_at).toLocaleString()}</div>;
		},
	},
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pin, Search, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface StudentConfirmation {
	std_application_id: string;
	std_total_score: {
		std_total_score: number | null;
		std_regis_score: number | null;
		std_academic_score: number | null;
		std_academic_chaos_score: number | null;
	};
	std_user: {
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
		accessorKey: "std_info.std_total_score.std_total_score",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					คะแนนรวม <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const score = row.original.std_total_score.std_total_score;
			return <div className="text-center">{score !== null ? score : "-"}</div>;
		},
	},
	{
		accessorKey: "std_info.std_total_score.std_regis_score",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ฝ่ายทะเบียน <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const score = row.original.std_total_score.std_regis_score;
			return <div className="text-center">{score !== null ? score : "-"}</div>;
		},
	},
	{
		accessorKey: "std_info.std_total_score.std_academic_score",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ฝ่ายวิชาการ <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const score = row.original.std_total_score.std_academic_score;
			return <div className="text-center">{score !== null ? score : "-"}</div>;
		},
	},
	{
		accessorKey: "std_info.std_total_score.std_academic_chaos_score",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ปัญหาเชาว์ <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const score = row.original.std_total_score.std_academic_chaos_score;
			return <div className="text-center">{score !== null ? score : "-"}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const application = row.original;
			const fname = application.std_info.std_info_first_name || "-";
			const decodeFname = decodeURI(fname);
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<Send className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>{`ตรวจสอบ ${decodeFname}`}</DropdownMenuLabel>
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

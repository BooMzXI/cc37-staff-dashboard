"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheckBig, ClipboardCheck, FileText, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface StaffUser {
	id: string;
	name: string;
	email: string;
	role: string;
	username: string;
	displayUsername: string;
}

export interface RegisQuestionScore {
	id: number;
	std_regis_answer_id: number;
	stf_count: number;
	stf_score: number;
	stf_comment: string | null;
	stf_user_id: string;
	created_at: string;
	updated_at: string;
	stf_user: StaffUser;
}

export interface RegisQuestion {
	std_application_id: string;
	std_regis_answer_id: number;
	std_regis_answer_section: string;
	std_regis_answer: string;
	created_at: string;
	updated_at: string;
	stf_regis_question_score: RegisQuestionScore[];
}

export interface StudentStatus {
	std_application_id: string;
	std_status_info_done: boolean;
	std_status_file_done: boolean;
	std_status_regis_question_done: boolean;
	std_status_acdemic_question_done: boolean;
	std_status_academic_chaos_question_done: boolean;
	std_status_payment_done: boolean;
	stf_regis_question_checked: boolean;
	stf_academic_question_checked: boolean;
	std_info_note: string | null;
	stf_question_result: number | null;
	stf_question_result_detail: string | null;
	created_at: string;
	updated_at: string;
}

export interface StudentRegisQuestion {
	std_application_id: string;
	std_application_submit: boolean;
	std_application_confirm: boolean;
	std_application_abort_reason: string | null;
	std_application_pass: boolean;
	std_application_result: string;
	stf_application_allow_confirm: boolean;
	std_user_id: string;
	created_at: string;
	updated_at: string;
	std_status: StudentStatus | null;
	std_regis_question: RegisQuestion[];
}

export const columns: ColumnDef<StudentRegisQuestion>[] = [
	{
		accessorKey: "std_application_id",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					รหัสใบสมัคร <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const id = row.original.std_application_id;
			return (
				<div className="w-[120px] truncate font-mono text-xs" title={id}>
					{id.substring(0, 8)}...
				</div>
			);
		},
	},
	{
		accessorKey: "std_regis_question",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ตรวจข้อ 1 <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const result = row.original.std_regis_question.filter((sec) => sec.std_regis_answer_section === "regis_1");

			return StaffPopOver(result);
		},
	},
	{
		accessorKey: "std_regis_question",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ตรวจข้อ 2 <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const result = row.original.std_regis_question.filter((sec) => sec.std_regis_answer_section === "regis_2");

			return StaffPopOver(result);
		},
	},
	{
		accessorKey: "std_regis_question",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ตรวจข้อ 3 <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const result = row.original.std_regis_question.filter((sec) => sec.std_regis_answer_section === "regis_3");

			return StaffPopOver(result);
		},
	},
	{
		accessorKey: "std_regis_question",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ตรวจข้อ 4 <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const result = row.original.std_regis_question.filter((sec) => sec.std_regis_answer_section === "regis_4");

			return StaffPopOver(result);
		},
	},
	{
		accessorKey: "std_regis_question",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ตรวจข้อ 5 <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const result = row.original.std_regis_question.filter((sec) => sec.std_regis_answer_section === "regis_5");

			return StaffPopOver(result);
		},
	},
	{
		accessorKey: "std_regis_question",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ตรวจข้อ 6 <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const result = row.original.std_regis_question.filter((sec) => sec.std_regis_answer_section === "regis_6");

			return StaffPopOver(result);
		},
	},
	{
		accessorKey: "std_application_id",
		header: ({ column }) => {
			return <Button variant="ghost">ยืนยันส่งใบสมัคร</Button>;
		},
		cell: ({ row }) => {
			const submit = row.original.std_application_submit;
			return <CircleCheckBig className="mx-auto text-green-600" />;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const application = row.original;

			return (
				<Link href={`/regis-question/${application.std_application_id}`} className="flex items-center cursor-pointer">
					<Button variant="outline" size="sm">
						<Search className="h-4 w-4" />
					</Button>
				</Link>
			);
		},
	},
];

function StaffPopOver(result: RegisQuestion[]): React.JSX.Element {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="text-center py-2 w-fit px-4 mx-auto hover:bg-white/10 rounded-md duration-300 cursor-pointer">{result[0]?.stf_regis_question_score.length} / 2</div>
			</PopoverTrigger>
			<PopoverContent align="center" side="top">
				<div className="grid grid-cols-3 items-center">
					<div className="text-center text-sm">ผู้ตรวจ</div>
					<div className="text-center text-sm">คะแนน</div>
					<div className="text-center text-sm">วันที่ตรวจ</div>
				</div>
				<div className="h-[2px] rounded-xl my-5 w-full bg-white"></div>
				{result.length !== 0
					? result[0].stf_regis_question_score.map((sc, i) => (
							<div className="grid grid-cols-3 mt-3 items-center" key={i}>
								<div className="text-center text-sm">{sc.stf_user.name}</div>
								<div className="text-center text-sm">{sc.stf_score}</div>
								<div className="text-center text-xs">{new Date(sc.created_at).toLocaleString()}</div>
							</div>
						))
					: ""}
			</PopoverContent>
		</Popover>
	);
}

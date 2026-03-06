"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, CircleCheckBig, Search, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

export interface AcademicQuestionScore {
	id: number;
	std_academic_answer_id: number;
	stf_count: number;
	stf_score: number;
	stf_user_id: string;
	created_at: string;
	updated_at: string;
	stf_user: StaffUser;
}

export interface AcademicQuestion {
	std_application_id: string;
	std_academic_answer_id: number;
	std_academic_answer_section: string;
	std_academic_answer: string;
	created_at: string;
	updated_at: string;
	stf_academic_question_score: AcademicQuestionScore[];
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
	stf_academic_chaos_question_checked: boolean;
	std_info_note: string | null;
	stf_question_result: number | null;
	stf_question_result_detail: string | null;
	created_at: string;
	updated_at: string;
}

export interface StudentAcademicQuestion {
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
	std_academic_question: AcademicQuestion[];
}

export const ACADEMIC_SECTIONS = ["academic_1", "academic_201", "academic_202", "academic_203", "academic_3", "academic_4", "academic_5", "academic_6", "academic_7", "academic_8", "academic_9", "academic_10"] as const;

export function getSectionDisplayName(section: string): string {
	const map: Record<string, string> = {
		academic_1: "1",
		academic_201: "2.1",
		academic_202: "2.2",
		academic_203: "2.3",
		academic_3: "3",
		academic_4: "4",
		academic_5: "5",
		academic_6: "6",
		academic_7: "7",
		academic_8: "8",
		academic_9: "9",
		academic_10: "10",
	};
	return map[section] || section;
}

export function sectionSortIndex(section: string): number {
	const idx = ACADEMIC_SECTIONS.indexOf(section as (typeof ACADEMIC_SECTIONS)[number]);
	return idx === -1 ? 999 : idx;
}

const sectionColumns: ColumnDef<StudentAcademicQuestion>[] = ACADEMIC_SECTIONS.map((section) => ({
	id: `section_${section}`,
	header: ({ column }) => {
		return (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				ข้อ {getSectionDisplayName(section)} <ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		);
	},
	cell: ({ row }) => {
		const result = row.original.std_academic_question.filter((q) => q.std_academic_answer_section === section);
		return StaffPopOver(result);
	},
}));

export const columns: ColumnDef<StudentAcademicQuestion>[] = [
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
	...sectionColumns,
	{
		id: "total_score",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					รวมคะเเนน <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const sorted = [...row.original.std_academic_question].sort((a, b) => sectionSortIndex(a.std_academic_answer_section) - sectionSortIndex(b.std_academic_answer_section));
			return ScorePopOver(sorted);
		},
	},
	{
		id: "submit_status",
		header: () => {
			return <Button variant="ghost">ยืนยันส่งใบสมัคร</Button>;
		},
		cell: () => {
			return <CircleCheckBig className="mx-auto text-green-600" />;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const application = row.original;
			return (
				<Link href={`/academic-question/${application.std_application_id}`} className="flex items-center cursor-pointer">
					<Button variant="outline" size="sm">
						<Search className="h-4 w-4" />
					</Button>
				</Link>
			);
		},
	},
];

function StaffPopOver(result: AcademicQuestion[]): React.JSX.Element {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="text-center py-2 w-fit px-4 mx-auto hover:bg-white/10 rounded-md duration-300 cursor-pointer flex flex-col">
					<div className="flex flex-row items-center gap-3 justify-between">{result[0]?.stf_academic_question_score.length > 0 ? <Check size={20} className="text-green-600" /> : <X size={20} className="text-red-600" />}</div>
				</div>
			</PopoverTrigger>
			<PopoverContent align="center" side="top">
				<div className="grid grid-cols-3 items-center">
					<div className="text-center text-sm">ผู้ตรวจ</div>
					<div className="text-center text-sm">คะแนน</div>
					<div className="text-center text-sm">วันที่ตรวจ</div>
				</div>
				<div className="h-[2px] rounded-xl my-5 w-full bg-white"></div>
				{result.length !== 0
					? result[0].stf_academic_question_score.map((sc, i) => (
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

function ScorePopOver(result: AcademicQuestion[]): React.JSX.Element {
	const calScoreEachSection = result.map((ans) => {
		const score = ans.stf_academic_question_score[0]?.stf_score;
		return {
			section: ans.std_academic_answer_section,
			score: score,
		};
	});

	let sumTotal = 0;
	let hasAnyScore = false;
	for (const { score } of calScoreEachSection) {
		if (score !== undefined && score !== null) {
			sumTotal += score;
			hasAnyScore = true;
		}
	}

	return (
		<div className="w-full">
			<Popover>
				<PopoverTrigger asChild className="flex flex-row">
					<button type="button" disabled={!hasAnyScore} className="text-center py-2 w-fit px-4 mx-auto hover:bg-white/10 rounded-md duration-300 cursor-pointer">
						{hasAnyScore ? sumTotal.toFixed(2) : "-"}
					</button>
				</PopoverTrigger>
				<PopoverContent align="center" side="top">
					<div className="grid grid-cols-2 items-center">
						<div className="text-center text-sm">ข้อที่</div>
						<div className="text-center text-sm">คะแนน</div>
					</div>
					<div className="h-[2px] rounded-xl my-5 w-full bg-white"></div>
					{calScoreEachSection.length !== 0
						? calScoreEachSection.map((sc, i) => (
								<div className="grid grid-cols-2 mt-3 items-center" key={i}>
									<div className="text-center text-sm">{getSectionDisplayName(sc.section)}</div>
									<div className="text-center text-sm">{sc.score !== undefined && sc.score !== null ? sc.score : "-"}</div>
								</div>
							))
						: ""}

					<div className="h-[2px] rounded-xl mt-5 w-full bg-white"></div>
					<div className="text-center mt-3 font-bold text-sm">รวมคะเเนน : {hasAnyScore ? sumTotal.toFixed(2) : "-"}</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}

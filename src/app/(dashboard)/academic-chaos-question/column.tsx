"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, CircleAlert, CircleCheckBig, CircleMinus, Search, X } from "lucide-react";
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

export interface AcademicChaosQuestionScore {
	id: number;
	std_academic_chaos_answer_id: number;
	stf_count: number;
	stf_score: number;
	stf_user_id: string;
	created_at: string;
	updated_at: string;
	stf_user: StaffUser;
}

export interface AcademicChaosQuestion {
	std_application_id: string;
	std_academic_chaos_answer_id: number;
	std_academic_chaos_answer_section: string;
	std_academic_chaos_answer: string;
	created_at: string;
	updated_at: string;
	stf_academic_chaos_question_score: AcademicChaosQuestionScore[];
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

export interface StudentAcademicChaosQuestion {
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
	std_academic_chaos_question: AcademicChaosQuestion[];
}

export const APTITUDE_SECTIONS = ["aptitude_101", "aptitude_102", "aptitude_201", "aptitude_202", "aptitude_203", "aptitude_301", "aptitude_302"] as const;

export function getSectionDisplayName(section: string): string {
	const map: Record<string, string> = {
		aptitude_101: "1.1",
		aptitude_102: "1.2 (Deprecate)",
		aptitude_201: "2.1 (ด้าน 1)",
		aptitude_202: "2.2 (ด้าน 2)",
		aptitude_203: "2.3 (ด้าน 3)",
		aptitude_301: "3.1 (ด้าน 1,2,3,4)",
		aptitude_302: "3.2 (Deprecate)",
	};
	return map[section] || section;
}

export function sectionSortIndex(section: string): number {
	const idx = APTITUDE_SECTIONS.indexOf(section as (typeof APTITUDE_SECTIONS)[number]);
	return idx === -1 ? 999 : idx;
}

const sectionColumns: ColumnDef<StudentAcademicChaosQuestion>[] = APTITUDE_SECTIONS.map((section) => ({
	id: `section_${section}`,
	header: ({ column }) => {
		return (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				ข้อ {getSectionDisplayName(section)} <ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		);
	},
	cell: ({ row }) => {
		const result = row.original.std_academic_chaos_question.filter((q) => q.std_academic_chaos_answer_section === section);
		return StaffPopOver(result);
	},
}));

export const columns: ColumnDef<StudentAcademicChaosQuestion>[] = [
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
			const sorted = [...row.original.std_academic_chaos_question].sort((a, b) => sectionSortIndex(a.std_academic_chaos_answer_section) - sectionSortIndex(b.std_academic_chaos_answer_section));
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
				<Link href={`/academic-chaos-question/${application.std_application_id}`} className="flex items-center cursor-pointer">
					<Button variant="outline" size="sm">
						<Search className="h-4 w-4" />
					</Button>
				</Link>
			);
		},
	},
];

function StaffPopOver(result: AcademicChaosQuestion[]): React.JSX.Element {
	const section = result[0]?.std_academic_chaos_answer_section;
	const isDeprecated = section === "aptitude_102" || section === "aptitude_302";

	const staffCountLabelMap: Record<number, string> = {
		11: "1.1",
		21: "2.1 (ด้าน 1)",
		22: "2.2 (ด้าน 2)",
		23: "2.3 (ด้าน 3)",
		31: "3 ด้าน 1",
		32: "3 ด้าน 2",
		33: "3 ด้าน 3",
		34: "3 ด้าน 4",
	};

	// Build sorted score rows with labels
	let scores: AcademicChaosQuestionScore[];
	if (result[0]?.std_academic_chaos_answer_section === "aptitude_101") {
		scores = result[0]?.stf_academic_chaos_question_score.filter((sc) => sc.stf_count === 11);
	} else if (result[0]?.std_academic_chaos_answer_section === "aptitude_201") {
		scores = result[0]?.stf_academic_chaos_question_score.filter((sc) => sc.stf_count === 21);
	} else if (result[0]?.std_academic_chaos_answer_section === "aptitude_202") {
		scores = result[0]?.stf_academic_chaos_question_score.filter((sc) => sc.stf_count === 22);
	} else if (result[0]?.std_academic_chaos_answer_section === "aptitude_203") {
		scores = result[0]?.stf_academic_chaos_question_score.filter((sc) => sc.stf_count === 23);
	} else if (result[0]?.std_academic_chaos_answer_section === "aptitude_301") {
		scores = result[0]?.stf_academic_chaos_question_score.filter((sc) => sc.stf_count === 31 || sc.stf_count === 32 || sc.stf_count === 33 || sc.stf_count === 34);
	} else {
		scores = result[0]?.stf_academic_chaos_question_score ?? [];
	}
	const sortedScores = [...scores].sort((a, b) => a.stf_count - b.stf_count);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="text-center py-2 w-fit px-4 mx-auto hover:bg-white/10 rounded-md duration-300 cursor-pointer flex flex-col">
					{isDeprecated ? (
						<CircleMinus size={20} className="text-[#ffa109]" />
					) : (
						<div className="flex flex-row items-center gap-3 justify-between">
							{scores.length > 0 ? (
								scores
									.filter((sc) => sc.stf_count)
									.map((sc) => sc.stf_score)
									.reduce((prev, cur) => prev + cur, 0)
							) : (
								<X size={20} className="text-red-600" />
							)}
						</div>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent align="center" side="top">
				<div className="grid grid-cols-4 items-center">
					<div className="text-center text-sm">ข้อ</div>
					<div className="text-center text-sm">ผู้ตรวจ</div>
					<div className="text-center text-sm">คะแนน</div>
					<div className="text-center text-sm">วันที่ตรวจ</div>
				</div>
				<div className="h-[2px] rounded-xl my-5 w-full bg-white"></div>
				{sortedScores.length !== 0
					? sortedScores.map((sc, i) => (
							<div className="grid grid-cols-4 mt-3 items-center" key={i}>
								<div className="text-center text-sm">{staffCountLabelMap[sc.stf_count] ?? sc.stf_count}</div>
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

function ScorePopOver(result: AcademicChaosQuestion[]): React.JSX.Element {
	const staffCountLabelMap: Record<number, string> = {
		11: "1.1",
		21: "2.1 (ด้าน 1)",
		22: "2.2 (ด้าน 2)",
		23: "2.3 (ด้าน 3)",
		31: "3 ด้าน 1",
		32: "3 ด้าน 2",
		33: "3 ด้าน 3",
		34: "3 ด้าน 4",
	};

	interface ScoreRow {
		label: string;
		sortKey: number;
		score: number | undefined;
	}

	const rows: ScoreRow[] = [];

	for (const ans of result) {
		const section = ans.std_academic_chaos_answer_section;
		// skip deprecated sections
		if (section === "aptitude_102" || section === "aptitude_302") continue;

		if (section === "aptitude_301") {
			// expand into 4 rows by staff_count
			for (const stfCount of [31, 32, 33, 34]) {
				const sc = ans.stf_academic_chaos_question_score.find((s) => s.stf_count === stfCount);
				rows.push({
					label: staffCountLabelMap[stfCount] || `ด้าน ${stfCount}`,
					sortKey: stfCount,
					score: sc?.stf_score,
				});
			}
		} else {
			// single score per section — find the matching staff_count
			const stfCountMap: Record<string, number> = {
				aptitude_101: 11,
				aptitude_201: 21,
				aptitude_202: 22,
				aptitude_203: 23,
			};
			const expectedCount = stfCountMap[section];
			const sc = expectedCount ? ans.stf_academic_chaos_question_score.find((s) => s.stf_count === expectedCount) : ans.stf_academic_chaos_question_score[0];
			rows.push({
				label: staffCountLabelMap[expectedCount ?? 0] || getSectionDisplayName(section),
				sortKey: expectedCount ?? 0,
				score: sc?.stf_score,
			});
		}
	}

	// sort by sortKey (small to large)
	rows.sort((a, b) => a.sortKey - b.sortKey);

	let sumTotal = 0;
	let hasAnyScore = false;
	for (const { score } of rows) {
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
					{rows.length !== 0
						? rows.map((r, i) => (
								<div className="grid grid-cols-2 mt-3 items-center" key={i}>
									<div className="text-center text-sm">{r.label}</div>
									<div className="text-center text-sm">{r.score !== undefined && r.score !== null ? r.score : "-"}</div>
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

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2, Clock3, Search, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface StudentConfirmation {
	rank: number;
	std_application_id: string;
	prefix: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	submitStatus: string;
	applicationResult: string;
	confirmStatus: string;
	regisScore: number | null;
	academicScore: number | null;
	academicChaosScore: number | null;
	totalScore: number | null;
}

const statusIconMap: Record<string, { icon: typeof CheckCircle2; className: string; label: string }> = {
	submitted: { icon: CheckCircle2, className: "text-green-600", label: "submitted" },
	not_submitted: { icon: XCircle, className: "text-destructive", label: "not submitted" },
	confirmed: { icon: CheckCircle2, className: "text-green-600", label: "confirmed" },
	not_confirmed: { icon: XCircle, className: "text-destructive", label: "not confirmed" },
	waiting_for_announcement: { icon: Clock3, className: "text-muted-foreground", label: "waiting for announcement" },
	pass: { icon: CheckCircle2, className: "text-green-600", label: "pass" },
	reserve: { icon: Clock3, className: "text-amber-500", label: "reserve" },
	fail: { icon: XCircle, className: "text-destructive", label: "fail" },
};

const StatusIndicator = ({ status }: { status: string }) => {
	const mapped = statusIconMap[status];
	if (!mapped) {
		return <div className="whitespace-nowrap">{status || "-"}</div>;
	}

	const Icon = mapped.icon;
	return (
		<div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border bg-muted/30 px-2 py-1 text-sm" title={mapped.label}>
			<Icon className={`h-4 w-4 ${mapped.className}`} />
			<span className={mapped.className}>{mapped.label}</span>
		</div>
	);
};

export const columns: ColumnDef<StudentConfirmation>[] = [
	{
		accessorKey: "rank",
		header: ({ column }) => {
			return (
				<Button className="whitespace-nowrap" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					อันดับ <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.rank}</div>,
	},
	{
		accessorKey: "std_application_id",
		header: () => <div className="whitespace-nowrap">Application ID</div>,
		cell: ({ row }) => (
			<div className="max-w-[220px] truncate whitespace-nowrap" title={row.original.std_application_id}>
				{row.original.std_application_id}
			</div>
		),
	},
	{
		accessorKey: "prefix",
		header: () => <div className="whitespace-nowrap">คำนำหน้า</div>,
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.prefix}</div>,
	},
	{
		accessorKey: "firstName",
		header: ({ column }) => {
			return (
				<Button className="whitespace-nowrap" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ชื่อ <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.firstName}</div>,
	},
	{
		accessorKey: "lastName",
		header: () => <div className="whitespace-nowrap">นามสกุล</div>,
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.lastName}</div>,
	},
	{
		accessorKey: "email",
		header: () => <div className="whitespace-nowrap">Email</div>,
		cell: ({ row }) => <div className="whitespace-normal break-all">{row.original.email}</div>,
	},
	{
		accessorKey: "phoneNumber",
		header: () => <div className="whitespace-nowrap">Phone</div>,
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.phoneNumber}</div>,
	},
	{
		accessorKey: "submitStatus",
		header: () => <div className="whitespace-nowrap">Submit Status</div>,
		cell: ({ row }) => <StatusIndicator status={row.original.submitStatus} />,
	},
	{
		accessorKey: "applicationResult",
		header: () => <div className="whitespace-nowrap">Application Result</div>,
		cell: ({ row }) => <StatusIndicator status={row.original.applicationResult} />,
	},
	{
		accessorKey: "confirmStatus",
		header: () => <div className="whitespace-nowrap">Confirm Status</div>,
		cell: ({ row }) => <StatusIndicator status={row.original.confirmStatus} />,
	},
	{
		accessorKey: "regisScore",
		header: ({ column }) => {
			return (
				<Button className="whitespace-nowrap" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Regis Score <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.regisScore ?? "-"}</div>,
	},
	{
		accessorKey: "academicScore",
		header: ({ column }) => {
			return (
				<Button className="whitespace-nowrap" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Academic Score <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.academicScore ?? "-"}</div>,
	},
	{
		accessorKey: "academicChaosScore",
		header: ({ column }) => {
			return (
				<Button className="whitespace-nowrap" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Academic Chaos Score <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.academicChaosScore ?? "-"}</div>,
	},
	{
		accessorKey: "totalScore",
		header: ({ column }) => {
			return (
				<Button className="whitespace-nowrap" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Total Score <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.totalScore ?? "-"}</div>,
	},
	{
		id: "profile",
		header: () => <div className="whitespace-nowrap">Profile</div>,
		cell: ({ row }) => (
			<Link href={`/personal-information/${row.original.std_application_id}`}>
				<Button variant="ghost" size="icon" className="hover:bg-primary/10 cursor-pointer">
					<Search className="h-4 w-4" />
				</Button>
			</Link>
		),
	},
];

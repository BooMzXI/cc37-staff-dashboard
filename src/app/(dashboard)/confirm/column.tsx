"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2, Clock3, Search, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { config } from "@/config/config";

export interface StudentConfirmation {
	rank: number;
	std_application_id: string;
	prefix: string;
	firstName: string;
	lastName: string;
	nickName: string;
	educationLevel: string;
	school: string;
	email: string;
	phoneNumber: string;
	submitStatus: string;
	applicationResult: string;
	confirmStatus: string;
	infoStatus: "info_approve" | "info_reject" | "info_waiting";
	allowConfirmStatus: boolean;
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
	waiting_for_announcement: { icon: Clock3, className: "text-white", label: "waiting for announcement" },
	pass: { icon: CheckCircle2, className: "text-green-600", label: "pass" },
	reserve: { icon: Clock3, className: "text-amber-500", label: "reserve" },
	fail: { icon: XCircle, className: "text-destructive", label: "fail" },
};

const applicationResultOptions = ["waiting_for_announcement", "pass", "reserve", "fail"] as const;
type ApplicationResultValue = (typeof applicationResultOptions)[number];

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

const AllowConfirmStatusIndicator = ({ allowed }: { allowed: boolean }) => {
	return (
		<div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border bg-muted/30 px-2 py-1 text-sm">
			{allowed ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-destructive" />}
			<span className={allowed ? "text-green-600" : "text-destructive"}>{allowed ? "allowed" : "not allowed"}</span>
		</div>
	);
};

const infoStatusMap: Record<StudentConfirmation["infoStatus"], { icon: typeof CheckCircle2; className: string; label: string }> = {
	info_approve: { icon: CheckCircle2, className: "text-green-600", label: "info_approve" },
	info_reject: { icon: XCircle, className: "text-destructive", label: "info_reject" },
	info_waiting: { icon: Clock3, className: "text-white", label: "info_waiting" },
};

const InfoStatusIndicator = ({ status }: { status: StudentConfirmation["infoStatus"] }) => {
	const mapped = infoStatusMap[status];
	const Icon = mapped.icon;

	return (
		<div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border bg-muted/30 px-2 py-1 text-sm">
			<Icon className={`h-4 w-4 ${mapped.className}`} />
			<span className={mapped.className}>{mapped.label}</span>
		</div>
	);
};

const AllowConfirmActionCell = ({ applicationId, initialStatus, onStatusUpdated }: { applicationId: string; initialStatus: boolean; onStatusUpdated?: (applicationId: string, allow: boolean) => void }) => {
	const [allowed, setAllowed] = useState(initialStatus);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		setAllowed(initialStatus);
	}, [initialStatus]);

	const handleUpdate = async () => {
		if (isUpdating) return;

		const nextAllowed = !allowed;
		setIsUpdating(true);

		try {
			const res = await fetch(`${config.backend.baseUrl}/api/staff/status/allow-to-confirm`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					application_id: applicationId,
					allow: nextAllowed,
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to update allow confirm status");
			}

			setAllowed(nextAllowed);
			onStatusUpdated?.(applicationId, nextAllowed);
			toast.success(nextAllowed ? "Allow confirm enabled" : "Allow confirm disabled");
		} catch (error) {
			toast.error("Unable to update allow confirm status");
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<Button size="sm" variant={allowed ? "default" : "outline"} onClick={handleUpdate} disabled={isUpdating}>
			{isUpdating ? "Updating..." : allowed ? "Disable" : "Enable"}
		</Button>
	);
};

const ApplicationResultActionCell = ({ applicationId, initialResult, onResultUpdated }: { applicationId: string; initialResult: string; onResultUpdated?: (applicationId: string, result: string) => void }) => {
	const [result, setResult] = useState(initialResult);
	const [isUpdating, setIsUpdating] = useState(false);

	useEffect(() => {
		setResult(initialResult);
	}, [initialResult]);

	const handleChangeResult = async (nextResult: string) => {
		if (isUpdating || nextResult === result) return;

		setIsUpdating(true);
		try {
			const res = await fetch(`${config.backend.baseUrl}/api/staff/status/change-result`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					application_id: applicationId,
					result: nextResult,
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to update application result");
			}

			setResult(nextResult);
			onResultUpdated?.(applicationId, nextResult);
			toast.success("Application result updated");
		} catch (error) {
			toast.error("Unable to update application result");
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<Select value={result} onValueChange={handleChangeResult} disabled={isUpdating}>
			<SelectTrigger className="h-8 w-[210px]">
				<SelectValue placeholder="Select result" />
			</SelectTrigger>
			<SelectContent>
				{applicationResultOptions.map((option) => (
					<SelectItem key={option} value={option}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export const createColumns = ({
	onAllowConfirmUpdated,
	onApplicationResultUpdated,
}: {
	onAllowConfirmUpdated?: (applicationId: string, allow: boolean) => void;
	onApplicationResultUpdated?: (applicationId: string, result: string) => void;
} = {}): ColumnDef<StudentConfirmation>[] => [
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
		accessorKey: "nickName",
		header: () => <div className="whitespace-nowrap">ชื่อเล่น</div>,
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.nickName}</div>,
	},
	{
		accessorKey: "educationLevel",
		header: () => <div className="whitespace-nowrap">ระดับชั้น</div>,
		cell: ({ row }) => <div className="whitespace-nowrap">{row.original.educationLevel}</div>,
	},
	{
		accessorKey: "school",
		header: () => <div className="whitespace-nowrap">School</div>,
		cell: ({ row }) => <div className="whitespace-normal break-words">{row.original.school}</div>,
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
		accessorKey: "submitStatus",
		header: () => <div className="whitespace-nowrap">Submit Status</div>,
		cell: ({ row }) => <StatusIndicator status={row.original.submitStatus} />,
	},
	{
		accessorKey: "infoStatus",
		header: () => <div className="whitespace-nowrap">Info Status</div>,
		cell: ({ row }) => <InfoStatusIndicator status={row.original.infoStatus} />,
	},
	{
		accessorKey: "applicationResult",
		header: () => <div className="whitespace-nowrap">Application Result</div>,
		cell: ({ row }) => <StatusIndicator status={row.original.applicationResult} />,
	},
	{
		accessorKey: "allowConfirmStatus",
		header: () => <div className="whitespace-nowrap">Staff Allow Confirm</div>,
		cell: ({ row }) => <AllowConfirmStatusIndicator allowed={row.original.allowConfirmStatus} />,
	},
	{
		accessorKey: "confirmStatus",
		header: () => <div className="whitespace-nowrap">Confirm Status</div>,
		cell: ({ row }) => <StatusIndicator status={row.original.confirmStatus} />,
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
	{
		id: "applicationResultAction",
		header: () => <div className="whitespace-nowrap">Application Result Update</div>,
		cell: ({ row }) => <ApplicationResultActionCell applicationId={row.original.std_application_id} initialResult={row.original.applicationResult} onResultUpdated={onApplicationResultUpdated} />,
	},
	{
		id: "allowConfirmAction",
		header: () => <div className="whitespace-nowrap">Allow Confirm Action</div>,
		cell: ({ row }) => <AllowConfirmActionCell applicationId={row.original.std_application_id} initialStatus={row.original.allowConfirmStatus} onStatusUpdated={onAllowConfirmUpdated} />,
	},
];

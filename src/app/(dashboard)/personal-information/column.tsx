"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, CircleX, CircleCheckBig, Clock } from "lucide-react";
import Link from "next/link";

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
		accessorKey: "std_application_submit",
		header: "การส่งใบสมัคร",
		cell: ({ row }) => {
			const isChecked = row.original.std_application_submit;
			return isChecked ? <span className="text-green-600">ส่งแล้ว</span> : <span className="text-muted-foreground">ยังไม่ได้ส่ง</span>;
		},
	},
	/*{
    accessorKey: "std_application_confirmed",
    accessorFn: (row) => row.std_application_confirmed,
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ยืนยันใบสมัคร <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isChecked = row.original.std_application_confirmed;
      return (
        <div className="flex justify-center">
          {isChecked ? (
            <span className="text-green-600">
              <CircleCheckBig className="h-6 w-6 inline-block text-green-600" />
            </span>
          ) : (
            <span className="text-muted-foreground">
              <CircleX className="text-red-600 h-6 w-6 inline-block" />
            </span>
          )}
        </div>
      );
    },
  },*/
	{
		id: "stf_info_check",
		accessorFn: (row) => row.std_status?.stf_info_check?.std_info_status || "info_waiting",
		header: ({ column }) => {
			return (
				<div className="flex justify-center">
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						ตรวจใบสมัคร <ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			const status = row.original.std_status?.stf_info_check?.std_info_status || "info_waiting";
			return (
				<div className="flex justify-center items-center">
					{status === "info_approve" && (
						<span className="text-green-600">
							<CircleCheckBig className="h-6 w-6" />
						</span>
					)}
					{status === "info_reject" && (
						<span className="text-red-600">
							<CircleX className="h-6 w-6" />
						</span>
					)}
					{status === "info_waiting" && (
						<span className="text-amber-500">
							<Clock className="h-6 w-6" />
						</span>
					)}
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
						<Eye className="h-4 w-4" />
					</Button>
				</Link>
			);
		},
	},
];

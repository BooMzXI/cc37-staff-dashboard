"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"
import Link from "next/link"

/*export type information = {
  id: string
  std_name: string
  std_gender: string
  std_phone: string
  email: string
  status: "pending" | "success"
  isCorrect: boolean
  timeChecked: string
  CheckedBy?: string
}*/

export interface StudentApplication {
  std_application_id: string;
  std_application_submit: boolean;
  std_user: {
    name: string;
    email: string;
  };
  std_info: {
    std_info_gender: string;
    std_info_phone_number: string;
  };
  std_status: {
    stf_regis_question_checked: boolean;
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
      )
    },
  },
  {
    accessorKey: "std_info.std_info_gender",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          เพศ <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => row.original.std_info?.std_info_gender === "male" ? "ชาย" : "หญิง"
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
      )
    },
  },
  {
    accessorKey: "std_application_submit",
    header: "สถานะการส่งใบสมัคร",
    cell: ({ row }) => {
      const isChecked = row.original.std_application_submit;
      return isChecked ? <span className="text-green-600">ส่งแล้ว</span> : <span className="text-muted-foreground">ยังไม่ได้ส่ง</span>;
    }
  },
  {
    accessorKey: "std_status.stf_regis_question_checked",
    header: "สถานะการตรวจ",
    cell: ({ row }) => {
      const isChecked = row.original.std_status?.stf_regis_question_checked;
      return isChecked ? <span className="text-green-600">ตรวจแล้ว</span> : <span className="text-muted-foreground">รอตรวจ</span>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original
      return (
        <Link href={`/personal-information/${application.std_application_id}`}> 
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 cursor-pointer">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      )
    },
  },
]
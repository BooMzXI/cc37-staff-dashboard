"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"
import Link from "next/link"

export type information = {
  id: string
  std_name: string
  std_gender: string
  std_phone: string
  email: string
  status: "pending" | "success"
  isCorrect: boolean
  timeChecked: string
}

export const columns: ColumnDef<information>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "std_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ชื่อ-นามสกุล
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "std_gender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          เพศ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "std_phone",
    header: "เบอร์โทรศัพท์",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "isCorrect",
    header: "ความถูกต้อง",
  },
  {
    accessorKey: "timeChecked",
    header: "เวลาที่ตรวจสอบ",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original
      return (
        <Link href={`/personal-information/${student.id}`}>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 cursor-pointer">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      )
    },
  },
]
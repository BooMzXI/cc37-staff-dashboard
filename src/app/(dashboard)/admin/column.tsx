"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type StaffUser = {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "user" | "admin" | "staff" | "academic" | "regis";
};

export const columns: ColumnDef<StaffUser>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      const roleColors: Record<string, string> = {
        admin: "text-red-600 font-bold",
        staff: "text-blue-600 font-semibold",
        academic: "text-purple-600 font-semibold",
        regis: "text-orange-600 font-semibold",
        user: "text-muted-foreground",
      };
      return <span className={roleColors[role] || ""}>{role}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">เปิดเมนู</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>@{staff.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("แก้ไข", staff.id)}>
              <Edit className="mr-2 h-4 w-4" />
              แก้ไขข้อมูล
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={() => {
                if(confirm(`ยืนยันการลบผู้ใช้ ${staff.username}?`)) {
                  console.log("ลบ", staff.id);
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              ลบผู้ใช้งาน
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
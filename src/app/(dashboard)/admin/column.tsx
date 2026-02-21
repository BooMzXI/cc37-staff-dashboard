"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StaffActionCell } from "./components/StaffActionCell";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Username <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Role <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const role = row.original.role;
      const roleColors: Record<string, string> = {
        admin: "text-red-600 font-bold",
        staff: "text-blue-600 font-semibold",
        academic: "text-purple-600 font-semibold",
        regis: "text-orange-600 font-semibold",
        user: "text-muted-foreground",
      };
      return <span className={`uppercase text-xs ${roleColors[role] || ""}`}>{role}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <StaffActionCell row={row} />,
  },
];
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StaffActionCell } from "./components/StaffActionCell";

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
      return <span className={`uppercase text-xs ${roleColors[role] || ""}`}>{role}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <StaffActionCell row={row} />,
  },
];
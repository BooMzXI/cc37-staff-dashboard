"use client";

import { useState } from "react";
import { Row } from "@tanstack/react-table";
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
import { UpdateDialog } from "./UpdateDialog";

import { StaffUser } from "../column"; 

interface StaffActionCellProps {
  row: Row<StaffUser>;
}

export function StaffActionCell({ row }: StaffActionCellProps) {
  const staff = row.original;
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [role, setRole] = useState(staff.role);

  return (
    <>
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
          
          <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            แก้ไขข้อมูล
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive"
            onClick={() => {
              if (confirm(`ยืนยันการลบผู้ใช้ ${staff.username}?`)) {
                console.log("ลบ", staff.id);
                // TODO: ยิง API DELETE ตรงนี้
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            ลบผู้ใช้งาน
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog แก้ไขข้อมูล */}
      <UpdateDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        role={role}
        setRole={setRole}
        staff={staff}
      />
      
    </>
  );
}
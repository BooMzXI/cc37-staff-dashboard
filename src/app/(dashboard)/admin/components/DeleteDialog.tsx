"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { StaffUser } from "../column";

interface DeleteDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	staff: StaffUser;
}

export function DeleteDialog({ isOpen, setIsOpen, staff }: DeleteDialogProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);

		try {
			const res = await fetch("/api/admin/delete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: staff.id,
					is_confirm: true,
				}),
			});

			if (!res.ok) throw new Error("Failed to delete account");

			alert(`ลบบัญชีของ @${staff.username} สำเร็จ!`);
			setIsOpen(false);

			window.location.reload();
		} catch (error) {
			console.error(error);
			alert("เกิดข้อผิดพลาดในการลบผู้ใช้งาน");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>ยืนยันการลบผู้ใช้งาน?</AlertDialogTitle>
					<AlertDialogDescription>
						การกระทำนี้ไม่สามารถย้อนกลับได้ บัญชีของ <strong>@{staff.username}</strong> จะถูกลบออกจากระบบฐานข้อมูลอย่างถาวร
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>ยกเลิก</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							handleDelete();
						}}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						disabled={isDeleting}
					>
						{isDeleting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" /> กำลังลบ...
							</>
						) : (
							"ยืนยันการลบ"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

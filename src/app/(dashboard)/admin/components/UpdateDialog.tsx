"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { config } from "@/config/config";
import { StaffUser } from "../column";

type Role = "user" | "admin" | "staff" | "academic" | "regis";
interface UpdatePayload {
	id: string;
	password?: string;
	role: Role;
}

export function UpdateDialog({ isOpen, setIsOpen, role, setRole, staff }: { isOpen: boolean; setIsOpen: (open: boolean) => void; role: Role; setRole: (role: Role) => void; staff: StaffUser }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [password, setPassword] = useState("");

	const handleEditSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const res = await fetch(`${config.backend.baseUrl}/api/staff/account/update`, {
				credentials: "include",
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: staff.id,
					role: role,
				}),
			});
			if (password.length !== 0) {
				const res = await fetch(`${config.backend.baseUrl}/admin/set-user-password`, {
					credentials: "include",
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						newPassword: password,
						userId: staff.id,
					}),
				});
			}

			if (!res.ok) throw new Error("Failed to update account");

			toast.success("อัปเดตข้อมูลสำเร็จ!");
			setIsOpen(false);
			setPassword("");

			window.location.reload();
		} catch (error) {
			console.error(error);
			toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open);
				if (!open) {
					setPassword("");
					setRole(staff.role);
				}
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>แก้ไขข้อมูลผู้ใช้งาน</DialogTitle>
					<DialogDescription>
						อัปเดตสิทธิ์การใช้งานหรือรหัสผ่านสำหรับ <strong>@{staff.username}</strong>
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleEditSubmit} className="space-y-4 mt-2">
					<div className="space-y-2">
						<div className="text-sm font-medium">Role</div>
						<Select value={role} onValueChange={(value: Role) => setRole(value)}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="user">user</SelectItem>
								<SelectItem value="admin">admin</SelectItem>
								<SelectItem value="staff">staff</SelectItem>
								<SelectItem value="academic">academic</SelectItem>
								<SelectItem value="regis">regis</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<div className="text-sm font-medium">รหัสผ่านใหม่</div>
						<Input type="password" placeholder="กรอกเพื่อเปลี่ยนรหัสผ่านใหม่" value={password} onChange={(e) => setPassword(e.target.value)} />
						<p className="text-xs text-muted-foreground">* หากไม่ต้องการเปลี่ยนรหัสผ่าน ให้ปล่อยช่องนี้เว้นว่างไว้</p>
					</div>

					<div className="pt-4 flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
							ยกเลิก
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							บันทึกการเปลี่ยนแปลง
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

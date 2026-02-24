"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { config } from "@/config/config";

interface CreateStaffDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
}

export function CreateStaffDialog({ open, onOpenChange, onSuccess }: CreateStaffDialogProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		name: "",
		username: "",
		password: "",
		role: "staff",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const res = await fetch(`${config.backend.baseUrl}/api/staff/account/create`, {
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error("Failed to create staff");
			}
			onOpenChange(false);
			if (onSuccess) onSuccess();

			setFormData({ email: "", name: "", username: "", password: "", role: "staff" });
			toast.success(`ผู้ใช้งาน ${formData.username} สำเร็จ`);
		} catch (error) {
			console.error(error);
			toast.error("เกิดข้อผิดพลาดในการสร้างผู้ใช้งาน");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>เพิ่มบัญชีใหม่</DialogTitle>
					<DialogDescription className="text-sm !mt-3">กรอกข้อมูลเพื่อสร้างบัญชีสำหรับทีมงาน กรุณากำหนดสิทธิ์ (Role) ให้ถูกต้อง</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4 mt-2">
					<div className="space-y-2">
						<div className="text-sm font-medium">Email</div>
						<Input type="email" required value={formData.email} placeholder="email@gmail.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
					</div>
					<div className="space-y-2">
						<div className="text-sm font-medium">Name</div>
						<Input required value={formData.name} placeholder="กรอกชื่อ-นามสกุลที่ต้องการสมัคร" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
					</div>
					<div className="space-y-2">
						<div className="text-sm font-medium">Username</div>
						<Input required value={formData.username} placeholder="กรอก Username ที่ต้องการสมัคร" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
					</div>
					<div className="space-y-2">
						<div className="text-sm font-medium">Password</div>
						<Input type="password" required value={formData.password} placeholder="*******" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
					</div>

					<div className="space-y-2">
						<div className="text-sm font-medium">Role</div>
						<Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="staff">Staff</SelectItem>
								<SelectItem value="academic">Academic</SelectItem>
								<SelectItem value="regis">Regis</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="pt-4 flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
							ยกเลิก
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							บันทึกข้อมูล
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

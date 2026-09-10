"use client";

import axios from "axios";
import { Check, Eye, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config/config";
import { columns, Ticket } from "./column";

export default function TicketPage() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Ticket[]>([]);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);
	const [solveOpen, setSolveOpen] = useState(false);
	const [solveMessage, setSolveMessage] = useState("");
	const [solveLoading, setSolveLoading] = useState(false);
	const [updateTrigger, setUpdateTrigger] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${config.backend.baseUrl}/api/ticket/staff/all`, {
					method: "GET",
					credentials: "include",
				});
				if (!res.ok) throw new Error("Failed to fetch data");
				const jsonData = await res.json();
				setData(jsonData);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [updateTrigger]);

	function openDetail(ticket: Ticket) {
		setSelectedTicket(ticket);
		setDetailOpen(true);
	}

	function openSolve(ticket: Ticket) {
		setSelectedTicket(ticket);
		setSolveMessage("");
		setSolveOpen(true);
	}

	async function handleSolve() {
		if (!selectedTicket) return;

		setSolveLoading(true);
		try {
			axios.defaults.withCredentials = true;
			await axios.post(`${config.backend.baseUrl}/api/ticket/staff/solve`, {
				ticket_id: selectedTicket.ticket_id,
				ticket_solved: true,
				solve_message: solveMessage,
			});
			toast.success("แก้ไข Ticket สำเร็จ");
			setSolveOpen(false);
			setUpdateTrigger(Math.random());
		} catch (e) {
			console.error(e);
			toast.error("เกิดข้อผิดพลาดในการแก้ไข Ticket");
		} finally {
			setSolveLoading(false);
		}
	}

	if (loading) {
		return <Loading />;
	}

	const totalTickets = data.length;
	const solvedCount = data.filter((d) => d.ticket_solved).length;
	const pendingCount = data.filter((d) => !d.ticket_solved).length;

	// Build augmented columns with action buttons
	const allColumns = [
		...columns,
		{
			id: "actions",
			header: () => <Button variant="ghost">จัดการ</Button>,
			cell: ({ row }: { row: { original: Ticket } }) => {
				const ticket = row.original;
				return (
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" onClick={() => openDetail(ticket)}>
							<Eye size={14} className="mr-1" /> ดู
						</Button>
						{!ticket.ticket_solved && (
							<Button variant="outline" size="sm" onClick={() => openSolve(ticket)}>
								<Check size={14} className="mr-1" /> แก้ไข
							</Button>
						)}
					</div>
				);
			},
		},
	];

	return (
		<>
			<PageTitle title="เเจ้งปัญหา" description={`ทั้งหมด ${totalTickets} ticket | แก้ไขแล้ว ${solvedCount} | รอดำเนินการ ${pendingCount}`} />
			<div className="mt-6 rounded-lg shadow-sm">
				<DataTable columns={allColumns} data={data} />
			</div>

			{/* Detail Modal */}
			<Dialog open={detailOpen} onOpenChange={setDetailOpen}>
				<DialogContent className="max-w-lg">
					<DialogHeader>
						<DialogTitle>รายละเอียด Ticket</DialogTitle>
						<DialogDescription>ข้อมูล Ticket ID: {selectedTicket?.ticket_id}</DialogDescription>
					</DialogHeader>
					{selectedTicket && (
						<div className="space-y-4 text-sm">
							<div className="grid grid-cols-2 gap-2">
								<div className="font-medium text-muted-foreground">ผู้ส่ง</div>
								<div>{selectedTicket.std_user?.displayUsername || selectedTicket.std_user?.name || "-"}</div>

								<div className="font-medium text-muted-foreground">อีเมล</div>
								<div>{selectedTicket.std_user?.email || "-"}</div>

								<div className="font-medium text-muted-foreground">สถานะ</div>
								<div>
									{selectedTicket.ticket_solved ? (
										<span className="flex items-center gap-1 text-green-600">
											<Check size={14} /> แก้ไขแล้ว
										</span>
									) : (
										<span className="flex items-center gap-1 text-red-600">
											<X size={14} /> รอดำเนินการ
										</span>
									)}
								</div>

								<div className="font-medium text-muted-foreground">วันที่สร้าง</div>
								<div>{new Date(selectedTicket.created_at).toLocaleString()}</div>

								<div className="font-medium text-muted-foreground">วันที่อัปเดต</div>
								<div>{new Date(selectedTicket.updated_at).toLocaleString()}</div>

								{selectedTicket.stf_user && (
									<>
										<div className="font-medium text-muted-foreground">ผู้แก้ไข</div>
										<div>{selectedTicket.stf_user.displayUsername || selectedTicket.stf_user.name}</div>
									</>
								)}
							</div>

							<div className="space-y-2">
								<div className="font-medium text-muted-foreground">ข้อความระบบ</div>
								<div className="rounded-md bg-muted p-3">{selectedTicket.ticket_system_message || "-"}</div>
							</div>

							<div className="space-y-2">
								<div className="font-medium text-muted-foreground">ข้อความจากผู้ใช้</div>
								<div className="rounded-md bg-muted p-3">{selectedTicket.ticket_user_message || "-"}</div>
							</div>

							{selectedTicket.ticket_solved && selectedTicket.stf_solve_message && (
								<div className="space-y-2">
									<div className="font-medium text-muted-foreground">ข้อความแก้ไข</div>
									<div className="rounded-md bg-muted p-3">{selectedTicket.stf_solve_message}</div>
								</div>
							)}
						</div>
					)}
					<DialogFooter>
						<Button variant="outline" onClick={() => setDetailOpen(false)}>
							ปิด
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Solve Modal */}
			<Dialog open={solveOpen} onOpenChange={setSolveOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>แก้ไข Ticket</DialogTitle>
						<DialogDescription>ยืนยันการแก้ไข Ticket ID: {selectedTicket?.ticket_id}</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="solve-message" className="text-sm font-medium">
								ข้อความแก้ไข (ถ้ามี)
							</label>
							<Textarea id="solve-message" placeholder="ระบุข้อความแก้ไข..." value={solveMessage} onChange={(e) => setSolveMessage(e.target.value)} rows={3} />
						</div>
					</div>
					<DialogFooter className="gap-2">
						<Button variant="outline" onClick={() => setSolveOpen(false)} disabled={solveLoading}>
							ยกเลิก
						</Button>
						<Button variant="outline" onClick={handleSolve} disabled={solveLoading}>
							{solveLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> กำลังบันทึก...
								</>
							) : (
								<>
									<Check className="mr-2 h-4 w-4" /> ยืนยันแก้ไข
								</>
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

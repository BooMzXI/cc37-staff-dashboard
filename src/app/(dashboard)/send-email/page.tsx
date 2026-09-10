"use client";

import { Check, ChevronsUpDown, Loader2, Mail, RefreshCw, Send } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config/config";
import { getColumns, SentEmail } from "./column";

interface EmailUser {
	email: string;
	name: string;
}

export default function SendEmailPage() {
	const [users, setUsers] = useState<EmailUser[]>([]);
	const [history, setHistory] = useState<SentEmail[]>([]);
	const [loadingUsers, setLoadingUsers] = useState(true);
	const [loadingHistory, setLoadingHistory] = useState(true);
	const [sending, setSending] = useState(false);

	const [selectedEmail, setSelectedEmail] = useState("");
	const [recipientName, setRecipientName] = useState("");
	const [subject, setSubject] = useState("");
	const [content, setContent] = useState("");
	const [selectedItem, setSelectedItem] = useState<SentEmail | null>(null);
	const [emailSearch, setEmailSearch] = useState("");
	const [emailPopoverOpen, setEmailPopoverOpen] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const filteredUsers = useMemo(() => {
		if (!emailSearch.trim()) return users;
		const q = emailSearch.toLowerCase();
		return users.filter((u) => u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q));
	}, [users, emailSearch]);

	const handleSelectEmail = (user: EmailUser) => {
		setSelectedEmail(user.email);
		setRecipientName(user.name);
		setEmailPopoverOpen(false);
		setEmailSearch("");
	};

	const fetchUsers = useCallback(async () => {
		try {
			setLoadingUsers(true);
			const res = await fetch(`${config.backend.baseUrl}/api/staff/email/user`, {
				method: "GET",
				credentials: "include",
			});
			if (!res.ok) throw new Error("Failed to fetch users");
			const data = await res.json();
			setUsers(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Failed to fetch email users:", error);
			toast.error("ไม่สามารถโหลดรายชื่อผู้ใช้ได้");
		} finally {
			setLoadingUsers(false);
		}
	}, []);

	const fetchHistory = useCallback(async () => {
		try {
			setLoadingHistory(true);
			const res = await fetch(`${config.backend.baseUrl}/api/staff/email/all`, {
				method: "GET",
				credentials: "include",
			});
			if (!res.ok) throw new Error("Failed to fetch email history");
			const data = await res.json();
			setHistory(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Failed to fetch email history:", error);
			toast.error("ไม่สามารถโหลดประวัติอีเมลได้");
		} finally {
			setLoadingHistory(false);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
		fetchHistory();
	}, [fetchUsers, fetchHistory]);

	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedEmail || !subject.trim() || !content.trim()) {
			toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
			return;
		}

		setSending(true);
		try {
			const res = await fetch(`${config.backend.baseUrl}/api/staff/email/send`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email_subject: subject,
					email_content: content,
					email_to_email: selectedEmail,
					email_to_name: recipientName,
				}),
			});

			if (!res.ok) throw new Error("Failed to send email");

			toast.success("ส่งอีเมลสำเร็จ");
			setSubject("");
			setContent("");
			setSelectedEmail("");
			setRecipientName("");
			fetchHistory();
		} catch (error) {
			console.error("Failed to send email:", error);
			toast.error("ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
		} finally {
			setSending(false);
		}
	};

	if (loadingUsers && loadingHistory) {
		return <Loading />;
	}

	return (
		<>
			<PageTitle title="ส่งอีเมล" description="" />

			<Tabs defaultValue="compose" className="mt-6">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="compose" className="flex items-center gap-2">
						<Send className="h-4 w-4" />
						เขียนอีเมล
					</TabsTrigger>
					<TabsTrigger value="history" className="flex items-center gap-2">
						<Mail className="h-4 w-4" />
						ประวัติการส่ง
					</TabsTrigger>
				</TabsList>

				<TabsContent value="compose">
					<Card className="mt-4 border-2 border-muted/50 shadow-sm">
						<CardHeader>
							<CardTitle className="text-xl">เขียนอีเมล</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSend} className="space-y-6">
								<div className="space-y-2">
									<Label>ผู้รับ</Label>
									{loadingUsers ? (
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Loader2 className="h-4 w-4 animate-spin" />
											กำลังโหลดรายชื่อ...
										</div>
									) : (
										<Popover open={emailPopoverOpen} onOpenChange={setEmailPopoverOpen}>
											<PopoverTrigger asChild>
												<Button variant="outline" role="combobox" aria-expanded={emailPopoverOpen} className="w-full justify-between font-normal">
													{selectedEmail ? (
														<span className="truncate">{users.find((u) => u.email === selectedEmail)?.name ? `${users.find((u) => u.email === selectedEmail)?.name} (${selectedEmail})` : selectedEmail}</span>
													) : (
														<span className="text-muted-foreground">เลือกผู้รับอีเมล</span>
													)}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
												<div className="p-2">
													<Input ref={searchInputRef} placeholder="ค้นหาอีเมลหรือชื่อ..." value={emailSearch} onChange={(e) => setEmailSearch(e.target.value)} className="h-9" />
												</div>
												<div className="max-h-[200px] overflow-y-auto">
													{filteredUsers.length === 0 ? (
														<div className="py-4 text-center text-sm text-muted-foreground">ไม่พบผู้ใช้</div>
													) : (
														filteredUsers.map((user) => (
															<button key={user.email} type="button" className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground" onClick={() => handleSelectEmail(user)}>
																<Check className={`h-4 w-4 shrink-0 ${selectedEmail === user.email ? "opacity-100" : "opacity-0"}`} />
																<div className="flex flex-col items-start">
																	<span>{user.email}</span>
																	{user.name && <span className="text-xs text-muted-foreground">{user.name}</span>}
																</div>
															</button>
														))
													)}
												</div>
											</PopoverContent>
										</Popover>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="email-to-name">ชื่อผู้รับ</Label>
									<Input id="email-to-name" placeholder="ชื่อผู้รับอีเมล" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} disabled={sending} />
								</div>

								<div className="space-y-2">
									<Label htmlFor="email-subject">หัวข้อ</Label>
									<Input id="email-subject" placeholder="หัวข้ออีเมล" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={sending} />
								</div>

								<div className="space-y-2">
									<Label htmlFor="email-content">เนื้อหา</Label>
									<Textarea id="email-content" placeholder="เนื้อหาอีเมล" value={content} onChange={(e) => setContent(e.target.value)} disabled={sending} rows={8} />
								</div>

								<div className="flex justify-end">
									<Button type="submit" disabled={sending || !selectedEmail || !recipientName.trim() || !subject.trim() || !content.trim()} className="flex items-center gap-2">
										{sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
										{sending ? "กำลังส่ง..." : "ส่งอีเมล"}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="history">
					<Card className="mt-4 border-2 border-muted/50 shadow-sm">
						<CardHeader className="flex flex-row items-center justify-between pb-4">
							<CardTitle className="text-xl">ประวัติการส่งอีเมล</CardTitle>
							<Button variant="outline" size="sm" onClick={fetchHistory} disabled={loadingHistory} className="flex items-center gap-2">
								<RefreshCw className={`h-4 w-4 ${loadingHistory ? "animate-spin" : ""}`} />
								รีเฟรช
							</Button>
						</CardHeader>
						<CardContent>
							{loadingHistory ? (
								<div className="flex items-center justify-center py-8">
									<Loader2 className="h-6 w-6 animate-spin text-primary" />
								</div>
							) : (
								<DataTable columns={getColumns(setSelectedItem)} data={history} />
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
			<Dialog
				open={!!selectedItem}
				onOpenChange={(open) => {
					if (!open) setSelectedItem(null);
				}}
			>
				<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>รายละเอียดอีเมล</DialogTitle>
					</DialogHeader>
					{selectedItem && (
						<div className="space-y-4">
							<div className="grid grid-cols-[100px_1fr] gap-y-3 gap-x-4 text-sm">
								<span className="font-medium text-muted-foreground">ชื่อผู้รับ</span>
								<span>{selectedItem.email_to_name}</span>
								<span className="font-medium text-muted-foreground">อีเมลผู้รับ</span>
								<span>{selectedItem.email_to_email}</span>
								<span className="font-medium text-muted-foreground">ผู้ส่ง</span>
								<span>{selectedItem.stf_user?.name ?? selectedItem.stf_user_id}</span>
								<span className="font-medium text-muted-foreground">สถานะ</span>
								<span>
									{selectedItem.email_has_sent ? (
										<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">ส่งแล้ว</span>
									) : (
										<span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">รอส่ง</span>
									)}
								</span>
								<span className="font-medium text-muted-foreground">วันที่ส่ง</span>
								<span>{new Date(selectedItem.created_at).toLocaleString("th-TH", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
							</div>
							<div className="border-t pt-4">
								<h4 className="mb-2 font-semibold">หัวข้อ</h4>
								<p className="text-sm">{selectedItem.email_subject}</p>
							</div>
							<div className="border-t pt-4">
								<h4 className="mb-2 font-semibold">เนื้อหา</h4>
								<p className="whitespace-pre-wrap text-sm">{selectedItem.email_content}</p>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}

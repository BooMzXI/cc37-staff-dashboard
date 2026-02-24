"use client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import PageTitle from "@/components/PageTitle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bolt, List, PenLine, Settings2, Trash } from "lucide-react";
import axios from "axios";
import { config } from "@/config/config";

type User = {
	role?: string;
};

export default function AdminPage() {
	const { data: session } = authClient.useSession();
	const router = useRouter();
	const [staffAccouts, setStaffAccount] = useState([]);

	if (session?.user && (session.user as User)?.role !== "admin") return null;

	useEffect(() => {
		if (session && (session.user as User)?.role !== "admin") {
			router.push("/"); // ถ้าไม่ใช่ admin ดีดกลับหน้าแรก
		}
	}, [session, router]);

	useEffect(() => {
		(async () => {
			axios.defaults.withCredentials = true;
			const staffAccount = await axios.get(`${config.backend.baseUrl}/api/staff/account`);
			setStaffAccount(staffAccount.data);
		})();
	}, []);

	return (
		<>
			<PageTitle title="Admin Panel" description="หน้าต่างจัดการระบบสำหรับ Admin" />
			<div className="text-2xl font-bold mb-5">Staff Accounts</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Options</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{staffAccouts.map((ac: any, i: number) => (
						<TableRow key={i}>
							<TableCell>{ac.username}</TableCell>
							<TableCell>{ac.name}</TableCell>
							<TableCell>{ac.email}</TableCell>
							<TableCell>{ac.role}</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<div className="p-2 bg-white text-black w-fit rounded-md hover:scale-105 active:scale-95 duration-300 cursor-pointer">
											<Settings2 strokeWidth={3} size={20} />
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuGroup>
											<DropdownMenuLabel>{ac.username}</DropdownMenuLabel>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<PenLine />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Trash />
											Remove
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Pagination className="mt-10">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#" isActive>
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">3</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
}

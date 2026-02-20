"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import PageTitle from "@/components/PageTitle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Bolt, List, Settings2 } from "lucide-react";

type User = {
	role?: string;
};

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

export default function AdminPage() {
	const { data: session } = authClient.useSession();
	const router = useRouter();

	useEffect(() => {
		if (session && (session.user as User)?.role !== "admin") {
			router.push("/"); // ถ้าไม่ใช่ admin ดีดกลับหน้าแรก
		}
	}, [session, router]);

	// use

	if (session?.user && (session.user as User)?.role !== "admin") return null;

	return (
		<>
			<PageTitle
				title="Admin Panel"
				description="หน้าต่างจัดการระบบสำหรับ Admin"
			/>
			<div className="text-2xl font-bold">Staff Accounts</div>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
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
					{invoices.map((invoice) => (
						<TableRow key={invoice.invoice}>
							<TableCell>{invoice.invoice}</TableCell>
							<TableCell>{invoice.paymentStatus}</TableCell>
							<TableCell>{invoice.paymentMethod}</TableCell>
							<TableCell>{invoice.totalAmount}</TableCell>
							<TableCell>
								<div className="p-2 bg-white text-black w-fit rounded-md hover:scale-105 active:scale-95 duration-300 cursor-pointer"><Settings2 strokeWidth={3} size={20} /></div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className="text-right">$2,500.00</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	);
}

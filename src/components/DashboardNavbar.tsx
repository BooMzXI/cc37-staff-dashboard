"use client";

import type { Session, User } from "better-auth";
import { Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MENU_ITEMS } from "@/config/menu-items";
import { ROLES } from "@/constants/roles";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

export type AuthSession = {
	session: Session;
	user: User & { role?: string };
};

type Props = {
	session: AuthSession | null;
};

/*const navItems = [
  { label: "Home", icon: LayoutDashboard, href: "/" },
  { label: "ข้อมูลส่วนตัว", icon: User, href: "/personal-information" },
  { label: "คำถามทะเบียน", icon: FileQuestionMark, href: "/questions" },
  { label: "ยืนยันสิทธิ์", icon: UserCheck, href: "/confirm" },
  { label: "คำถามวิชาการ", icon: BookOpen, href: "/academic-questions" },
  { label: "เปลี่ยนรหัสผ่าน", icon: Settings, href: "/change-password" },
  { label: "แอดมิน", icon: ShieldCheck, href: "/admin" },
];*/

const DashboardNavbar = ({ role }: { role: string | undefined | null }) => {
	const { theme, toggleTheme } = useTheme();
	const router = useRouter();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const userRole = role || null;
	const filteredMenu = MENU_ITEMS.filter((item) => userRole && item.roles.includes(userRole)).filter((item) => item.isEnable || userRole === ROLES.ADMIN);

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
					router.refresh();
				},
			},
		});
	};
	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-xl">
			<div className="pl-14! flex h-14 items-center justify-between px-4 lg:px-6">
				<div className="flex items-center gap-6">
					<Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground">
						<img className="w-10" src={"https://storage.comcamp.io/web-assets/Comcamp-Logo.png"} alt=""></img>
					</Link>

					<div className="hidden lg:flex items-center gap-1">
						{filteredMenu.map((item) => {
							const Icon = item.icon as React.ComponentType<{
								className?: string;
							}>;
							return (
								<Link key={item.title} href={item.url} className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs xl:text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
									<Icon className="h-4 w-4" />
									{item.title}
								</Link>
							);
						})}
					</div>
				</div>

				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={toggleTheme}
						className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
						aria-label="Toggle theme"
					>
						{mounted && (theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />)}
					</button>

					<div className="mx-2 h-6 w-px bg-border hidden lg:flex" />
					<Button variant="ghost" className="cursor-pointer hidden lg:flex" size="sm" onClick={handleSignOut}>
						Sign Out
					</Button>
					<Drawer direction="right">
						<DrawerTrigger asChild>
							<button type="button" className="cursor-pointer lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent active:bg-accent/80 transition-colors duration-200" aria-label="Open menu">
								<Menu size={24} />
							</button>
						</DrawerTrigger>
						<DrawerContent className="inset-y-0 inset-x-auto right-0 w-3/4 max-w-sm h-full mt-0 rounded-l-[10px] rounded-t-none">
							<DrawerHeader>
								<div className="w-full flex flex-col">
									<img className="w-24 mx-auto" src={"https://storage.comcamp.io/web-assets/Comcamp-Logo.png"} alt=""></img>
									{/* <DrawerTitle className="mt-5">Navigation Menu</DrawerTitle> */}
								</div>
							</DrawerHeader>
							<div className="flex-1 overflow-y-auto py-4">
								<div className="flex flex-col gap-1 px-2">
									{filteredMenu.map((item) => {
										const Icon = item.icon as React.ComponentType<{
											className?: string;
										}>;
										return (
											<DrawerClose asChild key={item.title}>
												<Link href={item.url} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
													<Icon className="h-5 w-5" />
													{item.title}
												</Link>
											</DrawerClose>
										);
									})}
								</div>
							</div>
							<DrawerFooter>
								<Button variant="outline" onClick={handleSignOut}>
									Sign Out
								</Button>
								<DrawerClose asChild>
									<Button variant="ghost">ปิด</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</nav>
	);
};

export default DashboardNavbar;

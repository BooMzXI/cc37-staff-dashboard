"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { MENU_ITEMS } from "@/config/menu-items";
import { Session, User } from "better-auth";
import { Button } from "./ui/button";

type AuthSession = {
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

const DashboardNavbar = ({ session }: Props) => {
  const { theme, toggleTheme } = useTheme();

  const userRole = session?.user?.role || null;
  const filteredMenu = MENU_ITEMS.filter(
    (item) => userRole && item.roles.includes(userRole),
  );
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              D
            </div>
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {filteredMenu.map((item) => {
              const Icon = item.icon as React.ComponentType<{
                className?: string;
              }>;
              return (
                <a
                  key={item.title}
                  href={item.url}
                  className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          <div className="mx-2 h-6 w-px bg-border" />
          <Button variant="ghost" size="sm">
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

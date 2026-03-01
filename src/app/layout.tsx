import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";

const THSarabun = localFont({
	src: [
		{
			path: "./fonts/THSarabunNew.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/THSarabunNew Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/THSarabunNew Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/THSarabunNew BoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
	],
	variable: "--font-sarabun",
});

export const metadata: Metadata = {
	title: "ComCamp 37 | Staff Back Office",
	description: "ระบบหลังบ้านสำหรับทีมงาน ComCamp 37",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${THSarabun.variable}`}>
			<body className="antialiased" suppressHydrationWarning>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}

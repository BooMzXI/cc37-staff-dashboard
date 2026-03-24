"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/config/config";

const EXPORT_ENDPOINT = "/api/staff/export";

const getExportUrl = () => {
	const baseUrl = config.backend.baseUrl;
	if (!baseUrl) {
		return EXPORT_ENDPOINT;
	}

	return `${baseUrl}${EXPORT_ENDPOINT}`;
};

const getFilenameFromDisposition = (contentDisposition: string | null) => {
	if (!contentDisposition) {
		return "ComCamp37-nongnong";
	}

	const utf8NameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
	if (utf8NameMatch?.[1]) {
		return decodeURIComponent(utf8NameMatch[1]);
	}

	const fallbackNameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
	if (fallbackNameMatch?.[1]) {
		return fallbackNameMatch[1];
	}

	return "ComCamp37-nongnong";
};

export default function ExportPage() {
	const [isDownloading, setIsDownloading] = useState(false);

	const handleExport = async () => {
		setIsDownloading(true);

		try {
			const response = await fetch(getExportUrl(), {
				method: "GET",
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Failed to export file");
			}

			const contentDisposition = response.headers.get("content-disposition");
			const filename = getFilenameFromDisposition(contentDisposition);
			const blob = await response.blob();
			const objectUrl = window.URL.createObjectURL(blob);

			const anchor = document.createElement("a");
			anchor.href = objectUrl;
			anchor.download = filename;
			document.body.appendChild(anchor);
			anchor.click();
			anchor.remove();

			window.URL.revokeObjectURL(objectUrl);
			toast.success("Download started");
		} catch (error) {
			console.error("Export failed:", error);
			toast.error("Export failed. Please try again.");
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="space-y-6">
			<PageTitle title="ดาวน์โหลดไฟล์ข้อมูล" description="" />

			<Card className="max-w-2xl">
				<CardHeader>
					<CardTitle>ComCamp37 - ข้อมูลน้องๆ ทั้งหมด</CardTitle>
				</CardHeader>
				<CardFooter>
					<Button type="button" onClick={handleExport} disabled={isDownloading}>
						{isDownloading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Downloading...
							</>
						) : (
							<>
								<Download className="mr-2 h-4 w-4" />
								Download Export File
							</>
						)}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

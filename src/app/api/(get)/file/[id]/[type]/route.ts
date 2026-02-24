import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { config } from "@/config/config";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; type: string }> }) {
	try {
		const { id, type } = await params;

		const headersList = await headers();
		const cookie = headersList.get("cookie") || "";
		const authorization = headersList.get("authorization") || "";

		const backendUrl = `${config.backend.baseUrl}/api/application/file/${id}/${type}`;

		const res = await fetch(backendUrl, {
			method: "GET",
			headers: {
				Cookie: cookie,
				Authorization: authorization,
			},
		});

		if (!res.ok) {
			const errorText = await res.text();
			return NextResponse.json({ error: "Failed to fetch file URL", details: errorText }, { status: res.status });
		}

		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Fetch File Route Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

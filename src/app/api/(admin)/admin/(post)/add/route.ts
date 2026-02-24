import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { config } from "@/config/config";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const headersList = await headers();
		const cookie = headersList.get("cookie") || "";
		const authorization = headersList.get("authorization") || "";

		const backendUrl = `${config.backend.baseUrl}/api/staff/account/create`;
		const res = await fetch(backendUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookie,
				Authorization: authorization,
			},
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			const errorText = await res.text();
			console.error("Backend POST Create Staff Failed:", errorText);
			return NextResponse.json({ error: "Backend error", details: errorText }, { status: res.status });
		}

		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Create Staff Route Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

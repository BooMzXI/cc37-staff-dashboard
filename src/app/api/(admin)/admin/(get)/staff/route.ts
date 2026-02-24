import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { config } from "@/config/config";

export async function GET() {
	try {
		const headersList = await headers();
		const cookie = headersList.get("cookie") || "";
		const authorization = headersList.get("authorization") || "";

		const backendUrl = `${config.backend.baseUrl}/api/staff/account`;
		const res = await fetch(backendUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookie,
				Authorization: authorization,
			},
		});

		if (!res.ok) {
			const errorText = await res.text();
			console.error("Backend GET Staff Failed:", errorText);
			return NextResponse.json({ error: "Backend error" }, { status: res.status });
		}

		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("GET Staff Route Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

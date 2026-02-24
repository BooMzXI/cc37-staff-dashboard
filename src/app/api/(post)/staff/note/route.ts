import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { app_id, is_note, app_note } = body;

		if (!app_id) {
			return NextResponse.json({ error: "Missing app_id" }, { status: 400 });
		}

		const headersList = await headers();
		const authorization = headersList.get("authorization") || "";
		const cookie = headersList.get("cookie") || "";

		const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/staff/application/note`;

		const res = await fetch(backendUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authorization,
				Cookie: cookie,
			},
			body: JSON.stringify({
				app_id: app_id,
				is_note: is_note,
				app_note: app_note,
			}),
		});

		if (!res.ok) {
			const errorText = await res.text();
			console.error("Backend Note API Failed:", errorText);
			return NextResponse.json({ error: "Backend error", details: errorText }, { status: res.status });
		}

		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Note API Route Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

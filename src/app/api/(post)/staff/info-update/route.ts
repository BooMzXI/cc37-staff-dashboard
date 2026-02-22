import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { config } from "@/config/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const headersList = await headers();
    const cookie = headersList.get("cookie") || "";
    let authorization = headersList.get("authorization") || "";

    if (!authorization && cookie) {
      const tokenMatch = cookie.match(/(?:^|;\s*)(?:__Secure-)?better-auth\.session_token=([^;]+)/);
      if (tokenMatch && tokenMatch[1]) {
        authorization = `Bearer ${tokenMatch[1]}`;
      }
    }

    const backendUrl = `${config.backend.baseUrl}/api/staff/status/info/check`;
    
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie,
        "Authorization": authorization,
        "Accept": "application/json, text/plain, */*",
        "Origin": process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: "Failed to update status", details: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Update Status Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
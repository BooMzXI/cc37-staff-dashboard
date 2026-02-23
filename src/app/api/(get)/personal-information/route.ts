import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { config } from "@/config/config";

export async function GET() {
  try {
    const headersList = await headers();
    const res = await fetch(`${config.backend.baseUrl}/api/staff/application/all`, {
      method: "GET",
      headers: headersList,
      cache: "no-store",
    });

    if (!res.ok) {
        const errorText = await res.text(); 
        console.error("Backend Error:", res.status, errorText);
        
        return NextResponse.json(
            { error: `Backend failed: ${res.status}`, details: errorText }, 
            { status: res.status }
        );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API Route Error:", err);
    const message = err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
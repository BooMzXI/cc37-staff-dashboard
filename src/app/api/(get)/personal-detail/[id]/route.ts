import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import { config } from "@/config/config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const studentId = resolvedParams.id;
    const headersList = await headers();

    const res = await fetch(`${config.backend.baseUrl}/api/staff/application/${studentId}`, {
      method: "GET",
      headers: headersList,
      cache: "no-store",
    });

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch from backend" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (err) {
    console.error("Detail API Route Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
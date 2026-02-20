"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type User = {
  role?: string;
};

export default function AdminPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && (session.user as User)?.role !== 'admin') {
      router.push("/"); // ถ้าไม่ใช่ admin ดีดกลับหน้าแรก
    }
  }, [session, router]);


  return <div>Welcome Admin!</div>
}
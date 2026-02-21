"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageTitle from "@/components/PageTitle";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Card, CardContent } from "@/components/ui/card";

type User = {
  role?: string;
};

export default function AdminPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && (session.user as User)?.role !== 'admin') {
      router.push("/");
    }
  }, [session, router]);


  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <PageTitle 
          title="Admin Dashboard"
          description="Welcome Administrator! Here you can manage the system settings and user accounts."
        />
        <div className="w-full flex items-end">ff</div>
      </main>
    </div>
  )
}
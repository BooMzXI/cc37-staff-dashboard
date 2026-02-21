"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { CreateStaffDialog } from "./components/CreateStaffDialog";
import { columns, StaffUser } from "./column";
import { DataTable } from "@/components/DataTable";
import { Loader2 } from "lucide-react";

type User = {
  role?: string;
};

export default function AdminPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [staffData, setStaffData] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const handleGetStaffData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/staff`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch staff data");
      const jsonData = await res.json();
      setStaffData(jsonData);
    } catch (error) {
      console.error("Failed to fetch staff data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetStaffData();
  }, []);

  useEffect(() => {
    if (session && (session.user as User)?.role !== 'admin') {
      router.push("/");
    }
  }, [session, router]);

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <PageTitle 
          title="Admin Dashboard"
          description="Welcome Administrator! Here you can manage the system settings and user accounts."
        />
        
        <div className="mt-8">
          <Card className="border-2 border-muted/50 shadow-sm">
            
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl">Staff Management</CardTitle>
              
              <Button 
                className="flex items-center gap-2"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <PlusCircle className="h-4 w-4" />
                เพิ่ม Staff ใหม่
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={staffData} />
            </CardContent>

          </Card>
        </div>

        <CreateStaffDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen}
          onSuccess={handleGetStaffData}
        />

      </main>
    </div>
  );
}
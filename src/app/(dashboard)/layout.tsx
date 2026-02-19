import { headers } from "next/headers";
import { Suspense } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { authClient } from "@/lib/auth-client";

async function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
    
  const headersList = await headers();
  const { data } = await authClient.getSession({
      fetchOptions: { headers: headersList }
  });
  return (
    <>
      <DashboardNavbar session={data} />
      {children}
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="h-screen w-screen" />}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}

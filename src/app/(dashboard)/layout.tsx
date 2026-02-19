import { headers } from "next/headers";
import { Suspense } from "react";
import DashboardNavbar, { AuthSession } from "@/components/DashboardNavbar";
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
      <DashboardNavbar role={data?.user.role} />
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

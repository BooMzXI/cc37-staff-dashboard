"use client";

import PageTitle from "@/components/PageTitle";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { Loader2 } from "lucide-react";
import  { DataTable } from "@/components/DataTable";
import { columns, information } from "./column";
import { MOCK_INFORMATION } from "@/constants/mock-people";

export default function PersonalInformation() {
    const { data: session } = authClient.useSession();
    const stdinfo = MOCK_INFORMATION;
    
  return (
    <>
      <PageTitle
        title="Overview"
        description={`Welcome Back! : ${session?.user.name}`}
      />
      <div className="mt-6 rounded-lg shadow-sm">
        <DataTable columns={columns} data={stdinfo} />
      </div>
    </>
  );
}

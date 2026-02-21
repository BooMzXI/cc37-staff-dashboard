"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { StudentDetail } from "@/types/student";
import { formatThaiDate, formatThaiDateTime } from "@/lib/utils";

import ProfileCard from "../components/ProfileCard";
import ApplicationStatusCard from "../components/ApplicationStatusCard";
import NoteCard from "../components/NoteCard";
import StudentInfoSection from "../components/StudentInfoSection";
import ActionFooterCard from "../components/ActionFooterCard";

export default function PersonalDetail() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StudentDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStudentDetail = async () => {
      try {
        const res = await fetch(`/api/personal-detail/${id}`);
        if (!res.ok) throw new Error("Failed to fetch detail");

        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">
            ไม่พบข้อมูลผู้สมัคร
          </h1>
          <p className="text-muted-foreground mb-6">รหัสอ้างอิง: {id}</p>
          <Button
            variant="outline"
            onClick={() => router.push("/personal-information")}
          >
            กลับไปหน้ารายชื่อ
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <Card className="mb-6 p-6">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/personal-information")}
              className="shrink-0 hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              {`${data.std_info?.std_info_first_name || ""} ${data.std_info?.std_info_last_name || ""}`}
            </h1>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] w-full overflow-hidden">
            {/* Left column */}
            <div className="space-y-6 ">
              {/* Photo placeholder */}
              <ProfileCard data={data} />
              {/* Application status */}
              <ApplicationStatusCard
                statusData={data.std_status}
                updatedAt={data.updated_at}
                formatThaiDateTime={formatThaiDateTime}
              />

              {/* Note */}
              <NoteCard applicationId={data.std_application_id} />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Personal info */}
              <StudentInfoSection data={data} formatThaiDate={formatThaiDate} />
            </div>
          </div>
          <div className="mt-6">
            <ActionFooterCard
			  confirmStatus={data.std_application_confirm}
			  updatedAt={data.updated_at}
			  formatThaiDateTime={formatThaiDateTime}
			/>
          </div>
        </Card>
      </main>
    </div>
  );
}

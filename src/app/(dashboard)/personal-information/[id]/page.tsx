"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_INFORMATION_DETAIL } from "@/constants/mock-people";
import { Separator } from "@/components/ui/separator";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex py-3 border-b border-border last:border-0">
    <span className="w-2/5 text-muted-foreground text-sm shrink-0">
      {label}:
    </span>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </div>
);

const StatusBadge = ({
  checked,
  label,
}: {
  checked: boolean;
  label: string;
}) => (
  <span className="inline-flex items-center gap-1.5 text-sm mr-4 mb-2">
    {label}:
    {checked ? (
      <CheckCircle2 className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-destructive" />
    )}
  </span>
);

export default function PersonalDetail() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const person = MOCK_INFORMATION_DETAIL;

  if (!person) {
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
      <main className="mx-auto max-w-5xl px-4 py-8 lg:px-6">
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
            {person.fullName}
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Photo placeholder */}
            <Card>
              <CardContent className="p-6 flex items-center justify-center">
                <div className="w-full aspect-square max-w-[300px] rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-6xl font-bold uppercase shadow-inner">
                  {person.fullName.charAt(0)} {/* ค่อยเปลี่ยนเป็น image ทีหลัง */}
                </div>
              </CardContent>
            </Card>

            {/* Application status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">สถานะการสมัคร</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap">
                  <StatusBadge
                    checked={person.status === "ตรวจแล้ว"}
                    label="ข้อมูลส่วนตัว"
                  />
                  <StatusBadge checked={person.isCorrect} label="ความถูกต้อง" />
                </div>
                {person.checkedAt && (
                  <p className="text-xs text-muted-foreground mt-3 bg-muted/50 p-2 rounded-md">
                    ตรวจสอบเมื่อ: {person.checkedAt}
                    {person.checkedBy && ` (${person.checkedBy})`}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Personal info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">ข้อมูลส่วนตัว</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="รหัสผู้สมัคร" value={id} />
                <InfoRow label="อายุ" value={`${person.age} ปี`} />
                <InfoRow label="วันเกิด" value={person.birthDate} />
                <InfoRow label="เพศ" value={person.gender} />
                <InfoRow label="ศาสนา" value={person.religion} />
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">ประวัติการศึกษา</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="ชั้นการศึกษา" value={person.educationLevel} />
                <InfoRow label="สายการเรียน" value={person.studyProgram} />
                <InfoRow label="โรงเรียน" value={person.school} />
              </CardContent>
            </Card>

            {/* Medical */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">ข้อมูลทางการแพทย์</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="หมู่เลือด" value={person.bloodType} />
                <InfoRow label="สิทธิการรักษา" value={person.medicalRight} />
                <InfoRow label="โรคประจำตัว" value={person.chronicDisease} />
                <InfoRow label="แพ้อาหาร" value={person.foodAllergy} />
                <InfoRow label="แพ้ยา" value={person.drugAllergy} />
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">ข้อมูลสำหรับติดต่อ</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="อีเมล" value={person.email} />
                <InfoRow label="เบอร์โทรศัพท์" value={person.phone} />
                <InfoRow label="ที่อยู่" value={person.address} />
                <Separator className="my-4" />
                <h4 className="text-sm font-semibold mb-2 text-foreground">
                  ติดต่อฉุกเฉิน
                </h4>
                <InfoRow
                  label="ผู้ติดต่อฉุกเฉิน"
                  value={person.emergencyName}
                />
                <InfoRow
                  label="ความสัมพันธ์"
                  value={person.emergencyRelation}
                />
                <InfoRow label="เบอร์ฉุกเฉิน" value={person.emergencyPhone} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

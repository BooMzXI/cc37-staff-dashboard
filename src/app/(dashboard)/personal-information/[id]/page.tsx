"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { StudentDetail } from "@/types/student";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StudentDetail | null>(null);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const formatThaiDate = (dateString?: string) => {
    if (!dateString) return "-";

    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return dateString;

    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const thaiYear = parseInt(year, 10) + 543;
    const thaiMonth = thaiMonths[parseInt(month, 10) - 1];
    const thaiDay = parseInt(day, 10);

    return `${thaiDay} ${thaiMonth} ${thaiYear}`;
  };

const handleNoteSubmit = async (isNote: boolean, content: string = "") => {
  if (!data?.std_application_id) return;
  
  if (isNote && !content.trim()) {
    alert("กรุณาพิมพ์หมายเหตุก่อนบันทึก");
    return;
  }

  setIsSubmittingNote(true);
  try {
    const res = await fetch("/api/staff/application/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: data.std_application_id,
        is_note: isNote,   // true = บันทึก, false = ลบ
        app_note: content,
      }),
    });

    if (!res.ok) throw new Error("Failed to update note");
    alert(isNote ? "บันทึกหมายเหตุสำเร็จ!" : "ลบหมายเหตุสำเร็จ!");
    setIsEditingNote(false);
    
    if (!isNote) {
      setNoteText("");
    }
  } catch (error) {
    console.error(error);
    alert("เกิดข้อผิดพลาดในการจัดการหมายเหตุ");
  } finally {
    setIsSubmittingNote(false);
  }
};

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

          <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
            {/* Left column */}
            <div className="space-y-6">
              {/* Photo placeholder */}
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="w-full aspect-square max-w-[300px] rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-6xl font-bold uppercase shadow-inner overflow-hidden">
                    {(() => {
                      const profileFile = data.std_file?.find(
                        (file) => file.std_file_type === "file_face",
                      );
                      const imageUrl = profileFile
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${profileFile.std_file_key}`
                        : data.std_user?.image;
                      if (imageUrl) {
                        return (
                          <Image
                            src={imageUrl}
                            alt={`รูปโปรไฟล์ของ ${data.std_info?.std_info_first_name}`}
                            className="w-full h-full object-cover"
                            width={300}
                            height={300}
                          />
                        );
                      }

                      return (
                        <>
                          {data.std_info?.std_info_first_name?.charAt(0) || "?"}
                        </>
                      );
                    })()}
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
                      checked={data.std_status?.std_status_info_done || false}
                      label="ข้อมูลส่วนตัว"
                    />
                    <StatusBadge
                      checked={data.std_status?.std_status_file_done || false}
                      label="ไฟล์เอกสาร"
                    />
                    <StatusBadge
                      checked={
                        data.std_status?.std_status_regis_question_done || false
                      }
                      label="คำถามฝ่ายทะเบียน"
                    />
                    <StatusBadge
                      checked={
                        data.std_status?.std_status_acdemic_question_done ||
                        false
                      }
                      label="คำถามวิชาการ"
                    />
                    <StatusBadge
                      checked={
                        data.std_status?.std_status_payment_done || false
                      }
                      label="การชำระเงิน"
                    />
                  </div>
                  {data.updated_at && (
                    <p className="text-xs text-muted-foreground mt-3 bg-muted/50 p-2 rounded-md">
                      ตรวจสอบเมื่อ:{" "}
                      {new Date(data.updated_at).toLocaleString("th-TH")}
                    </p>
                  )}
                </CardContent>
              </Card>

			{/* Note */}
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">หมายเหตุ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isEditingNote
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <Textarea
                        placeholder="พิมพ์หมายเหตุเกี่ยวกับน้องคนนี้ เช่น เอกสารไม่ชัด, รอการติดต่อกลับ..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="min-h-[100px] resize-none mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex w-full gap-2">
                    {!isEditingNote ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full flex-1"
                          onClick={() => setIsEditingNote(true)}
                        >
                          เพิ่มหมายเหตุ
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full flex-1"
                          onClick={() => handleNoteSubmit(false, "")}
						  disabled={isSubmittingNote || !noteText.trim()}
						>
						  {isSubmittingNote ? (
							<Loader2 className="h-4 w-4 animate-spin mr-2" />
						  ) : null}
                          ลบหมายเหตุ
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="w-full flex-1"
                          onClick={() => handleNoteSubmit(true, noteText)}
                          disabled={isSubmittingNote || !noteText.trim()}
                        >
                          {isSubmittingNote ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          บันทึก
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full text-muted-foreground flex-1"
                          onClick={() => {
							setIsEditingNote(false)
							setNoteText("");
						  }}
                          disabled={isSubmittingNote}
                        >
                          ยกเลิก
                        </Button>
                      </>
                    )}
                  </div>
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
                  <InfoRow
                    label="อายุ"
                    value={`${data.std_info?.std_info_age || 0} ปี`}
                  />
                  <InfoRow
                    label="วันเกิด"
                    value={formatThaiDate(
                      data.std_info?.std_info_birthdate || "",
                    )}
                  />
                  <InfoRow
                    label="เพศ"
                    value={data.std_info?.std_info_gender || ""}
                  />
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">ประวัติการศึกษา</CardTitle>
                </CardHeader>
                <CardContent>
                  <InfoRow
                    label="ชั้นการศึกษา"
                    value={data.std_info?.std_info_education_level || ""}
                  />
                  <InfoRow
                    label="โรงเรียน"
                    value={data.std_info?.std_info_education_institute || ""}
                  />
                </CardContent>
              </Card>

              {/* Medical (เราไม่มี) */}
              {/*<Card>
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
            </Card>*/}

              {/* Contact */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">ข้อมูลสำหรับติดต่อ</CardTitle>
                </CardHeader>
                <CardContent>
                  <InfoRow label="อีเมล" value={data.std_user?.email || ""} />
                  <InfoRow
                    label="เบอร์โทรศัพท์"
                    value={data.std_info?.std_info_phone_number || ""}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

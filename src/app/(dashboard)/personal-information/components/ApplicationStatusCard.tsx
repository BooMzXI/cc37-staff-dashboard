import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StudentStatus } from "@/types/student";
import { StatusBadge } from "./StatusBadge";
import { StudentFile } from "@/types/student";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
interface ApplicationStatusCardProps {
  statusData?: StudentStatus | null;
  files?: StudentFile[];
  updatedAt?: string;
  formatThaiDateTime: (date?: string) => string;
}

const fileTypeLabelMap: Record<string, string> = {
  file_national_id: "บัตรประชาชน",
  file_parent_permission: "ใบอนุญาตผู้ปกครอง",
  file_pp_1: "ปพ.1",
  file_pp_7: "ปพ.7",
  file_slip: "สลิปโอนเงิน",
};

export default function ApplicationStatusCard({
  statusData,
  files,
  updatedAt,
  formatThaiDateTime,
}: ApplicationStatusCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">สถานะการสมัคร</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap">
          <StatusBadge
            checked={statusData?.std_status_info_done || false}
            label="ข้อมูลส่วนตัว"
          />
          <StatusBadge
            checked={statusData?.std_status_file_done || false}
            label="ไฟล์เอกสาร"
          />
          <StatusBadge
            checked={statusData?.std_status_regis_question_done || false}
            label="คำถามฝ่ายทะเบียน"
          />
          <StatusBadge
            checked={statusData?.std_status_acdemic_question_done || false}
            label="คำถามวิชาการ"
          />
          <StatusBadge
            checked={
              statusData?.std_status_academic_chaos_question_done || false
            }
            label="คำถามวิชาการ 2"
          />
          <StatusBadge
            checked={statusData?.std_status_payment_done || false}
            label="การชำระเงิน"
          />
          <StatusBadge
            checked={statusData?.stf_regis_question_checked || false}
            label="ตรวจคำถามฝ่ายทะเบียน"
          />
          <StatusBadge
            checked={statusData?.stf_academic_question_checked || false}
            label="ตรวจคำถามวิชาการ"
          />
        </div>

        {files && files.length > 0 && (
          <div className="bg-muted/30 p-4 rounded-lg border border-border mt-4 mb-4">
            <div className="flex flex-wrap gap-2">
              {files
                .filter(
                  (f) =>
                    f.std_file_type !== "file_face" && !f.std_file_disabled,
                )
                .map((file) => {
                  const fileUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${file.std_file_key}`;
                  const label =
                    fileTypeLabelMap[file.std_file_type] ||
                    file.std_file_originalname;

                  return (
                    <Button
                      key={file.std_file_key}
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors"
                      asChild
                    >
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                        <ExternalLink className="ml-1.5 h-3 w-3" />
                      </a>
                    </Button>
                  );
                })}
            </div>
          </div>
        )}

        {updatedAt && (
          <p className="text-xs text-muted-foreground mt-3 bg-muted/50 p-2 rounded-md">
            ตรวจสอบเมื่อ: {formatThaiDateTime(updatedAt)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

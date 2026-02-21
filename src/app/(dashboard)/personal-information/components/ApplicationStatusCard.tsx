import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StdStatus } from "@/types/student";
import { StatusBadge } from "./StatusBadge";

interface ApplicationStatusCardProps {
  statusData?: StdStatus | null;
  updatedAt?: string;
  formatThaiDateTime: (date?: string) => string;
}

export default function ApplicationStatusCard({ 
  statusData, 
  updatedAt, 
  formatThaiDateTime 
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
            checked={statusData?.std_status_payment_done || false}
            label="การชำระเงิน"
          />
        </div>
        
        {updatedAt && (
          <p className="text-xs text-muted-foreground mt-3 bg-muted/50 p-2 rounded-md">
            ตรวจสอบเมื่อ: {formatThaiDateTime(updatedAt)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
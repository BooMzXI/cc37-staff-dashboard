import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentDetail } from "@/types/student";
import { InfoRow } from "../components/InfoRow";

interface StudentInfoProps {
  data: StudentDetail;
  formatThaiDate: (date?: string) => string;
}

export default function StudentInfoSection({ data, formatThaiDate }: StudentInfoProps) {
  return (
    <div className="space-y-6 w-full">
      {/* ข้อมูลส่วนตัว */}
      <Card className="w-full overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">ข้อมูลส่วนตัว</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="รหัสผู้สมัคร" value={data.std_user_id || "-"} />
          <InfoRow label="ชื่อ-นามสกุล" value={`${data.std_info?.std_info_first_name || ""} ${data.std_info?.std_info_last_name || ""}`} />
          <InfoRow label="อายุ" value={`${data.std_info?.std_info_age || 0} ปี`} />
          <InfoRow label="วันเกิด" value={formatThaiDate(data.std_info?.std_info_birthdate)} />
          <InfoRow label="เพศ" value={data.std_info?.std_info_gender === "male" ? "ชาย" : data.std_info?.std_info_gender === "female" ? "หญิง" : "-"} />
        </CardContent>
      </Card>

      {/* ประวัติการศึกษา */}
      <Card className="w-full overflow-hidden"> {/* 👈 เติมตรงนี้ */}
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">ประวัติการศึกษา</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="ชั้นการศึกษา" value={data.std_info?.std_info_education_level || "-"} />
          <InfoRow label="โรงเรียน" value={data.std_info?.std_info_education_institute || "-"} />
        </CardContent>
      </Card>

      {/* ข้อมูลสำหรับติดต่อ */}
      <Card className="w-full overflow-hidden"> {/* 👈 เติมตรงนี้ */}
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">ข้อมูลสำหรับติดต่อ</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="อีเมล" value={data.std_user?.email || "-"} />
          <InfoRow label="เบอร์โทรศัพท์" value={data.std_info?.std_info_phone_number || "-"} />
        </CardContent>
      </Card>
    </div>
  );
}
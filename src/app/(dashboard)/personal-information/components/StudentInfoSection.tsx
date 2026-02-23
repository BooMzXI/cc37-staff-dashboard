import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentDetail } from "@/types/student";
import { InfoRow } from "./InfoRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, GraduationCap, UsersRound, HeartPulse, Laptop } from "lucide-react";

interface StudentInfoProps {
  data: StudentDetail;
  formatThaiDate: (date?: string) => string;
}

export default function StudentInfoSection({ data, formatThaiDate }: StudentInfoProps) {
  const info = data.std_info;

  return (
    <div className="w-full">
      <Tabs defaultValue="personal" className="w-full">
        
        {/* เมนูให้กดสลับ Tab */}
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6 h-auto p-1">
          <TabsTrigger value="personal" className="py-2">ส่วนตัว</TabsTrigger>
          <TabsTrigger value="education" className="py-2">การศึกษา</TabsTrigger>
          <TabsTrigger value="parent" className="py-2">ผู้ปกครอง</TabsTrigger>
          <TabsTrigger value="health" className="py-2">สุขภาพ</TabsTrigger>
          <TabsTrigger value="device" className="py-2">อุปกรณ์</TabsTrigger>
        </TabsList>

        {/* --- ข้อมูลส่วนตัว --- */}
        <TabsContent value="personal" className="mt-0">
          <Card className="w-full overflow-hidden border-t-4 border-t-primary">
            <CardHeader className="pb-3 bg-muted/10">
              <CardTitle className="text-lg flex text-center item-center"><UserRound className="w-5 h-5 mr-3 text-center mt-1"/> ข้อมูลส่วนตัว</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {/*<InfoRow label="รหัสผู้สมัคร" value={data.std_application_id} />*/}
              <InfoRow label="ชื่อ-นามสกุล" value={`${info?.std_info_prefix || ""} ${info?.std_info_first_name || ""} ${info?.std_info_last_name || ""}`} />
              <InfoRow label="ชื่อเล่น" value={info?.std_info_nick_name} />
              <InfoRow label="อายุ" value={info?.std_info_age ? `${info.std_info_age} ปี` : "-"} />
              <InfoRow label="วันเกิด" value={formatThaiDate(info?.std_info_birthdate)} />
              <InfoRow label="เพศ" value={info?.std_info_gender === "male" ? "ชาย" : info?.std_info_gender === "female" ? "หญิง" : info?.std_info_gender} />
              <InfoRow label="ศาสนา" value={info?.std_info_religion} />
              <InfoRow label="เบอร์โทรศัพท์" value={info?.std_info_phone_number} />
              <InfoRow label="อีเมล" value={data.std_user?.email} />
              <InfoRow label="ที่อยู่" value={info?.std_info_address} />
              <InfoRow label="ไซส์เสื้อ" value={info?.std_info_shirt_size} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- การศึกษา --- */}
        <TabsContent value="education" className="mt-0">
          <Card className="w-full overflow-hidden border-t-4 border-t-blue-500">
            <CardHeader className="pb-3 bg-muted/10">
              <CardTitle className="text-lg flex items-center"><GraduationCap className="w-5 h-5 mr-3"/> ประวัติการศึกษา</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <InfoRow label="ชั้นการศึกษา" value={info?.std_info_education_level} />
              <InfoRow label="โรงเรียน" value={info?.std_info_education_institute} />
              <InfoRow label="แผนการเรียน" value={info?.std_info_education_plan} />
              <InfoRow label="GPAX" value={info?.std_info_grade_gpax} />
              <InfoRow label="เกรดคณิตศาสตร์" value={info?.std_info_grade_math} />
              <InfoRow label="เกรดวิทยาศาสตร์" value={info?.std_info_grade_sci} />
              <InfoRow label="เกรดอังกฤษ" value={info?.std_info_grade_eng} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ผู้ปกครอง --- */}
        <TabsContent value="parent" className="mt-0">
          <Card className="w-full overflow-hidden border-t-4 border-t-green-500">
            <CardHeader className="pb-3 bg-muted/10">
              <CardTitle className="text-lg flex center"><UsersRound className="w-5 h-5 mr-3 mt-1"/> ข้อมูลผู้ปกครอง</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <InfoRow label="ชื่อ-นามสกุล" value={info?.std_info_parent_fullname} />
              <InfoRow label="ความสัมพันธ์" value={info?.std_info_parent_relation} />
              <InfoRow label="เบอร์โทรศัพท์" value={info?.std_info_parent_phone_number} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- สุขภาพ --- */}
        <TabsContent value="health" className="mt-0">
          <Card className="w-full overflow-hidden border-t-4 border-t-red-500">
            <CardHeader className="pb-3 bg-muted/10">
              <CardTitle className="text-lg flex item-center"><HeartPulse className="w-5 h-5 mr-3 mt-1"/> สุขภาพและการเดินทาง</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <InfoRow label="กรุ๊ปเลือด" value={info?.std_info_blood_group} />
              <InfoRow label="โรคประจำตัว" value={info?.std_info_chronic_disease} />
              <InfoRow label="แพ้ยา" value={info?.std_info_drug_allergy} />
              <InfoRow label="แพ้อาหาร" value={info?.std_info_food_allergy} />
              <InfoRow label="สิทธิพยาบาล" value={info?.std_info_medical_insurance} />
              <InfoRow label="การเดินทาง" value={info?.std_info_travel_plan} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- อุปกรณ์ --- */}
        <TabsContent value="device" className="mt-0">
          <Card className="w-full overflow-hidden border-t-4 border-t-purple-500">
            <CardHeader className="pb-3 bg-muted/10">
              <CardTitle className="text-lg flex item-center"><Laptop className="w-5 h-5 mr-3 mt-1"/> อุปกรณ์และความพร้อม</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <InfoRow label="มีแล็ปท็อป" value={info?.std_info_have_laptop} />
              <InfoRow label="OS" value={info?.std_info_laptop_os} />
              <InfoRow label="มีเมาส์" value={info?.std_info_have_mouse} />
              <InfoRow label="มีแท็บเล็ต" value={info?.std_info_have_tablet} />
              <InfoRow label="มาได้ทุกวัน" value={info?.std_info_can_participate_every_day} />
              <InfoRow label="เคยเข้าค่าย" value={info?.std_info_have_participated} />
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
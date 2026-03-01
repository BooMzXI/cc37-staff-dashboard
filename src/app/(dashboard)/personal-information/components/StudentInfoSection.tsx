import { GraduationCap, HeartPulse, Laptop, UserRound, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentDetail } from "@/types/student";
import { InfoRow } from "./InfoRow";

interface StudentInfoProps {
	data: StudentDetail;
	formatThaiDate: (date?: string) => string;
}

export default function StudentInfoSection({ data, formatThaiDate }: StudentInfoProps) {
	const info = data.std_info;

	return (
		<div className="w-full">
			<div className="flex flex-col gap-6">
				{/* --- ข้อมูลส่วนตัว --- */}
				<Card className="w-full border-t-4 border-t-primary shadow-sm">
					<CardHeader className="pb-3 bg-muted/10">
						<CardTitle className="text-lg flex items-center">
							<UserRound className="w-5 h-5 mr-3" /> ข้อมูลส่วนตัว
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 space-y-2">
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

				{/* --- การศึกษา --- */}
				<Card className="w-full border-t-4 border-t-blue-500 shadow-sm">
					<CardHeader className="pb-3 bg-muted/10">
						<CardTitle className="text-lg flex items-center">
							<GraduationCap className="w-5 h-5 mr-3" /> ประวัติการศึกษา
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 space-y-2">
						<InfoRow label="ชั้นการศึกษา" value={info?.std_info_education_level} />
						<InfoRow label="โรงเรียน" value={info?.std_info_education_institute} />
						<InfoRow label="แผนการเรียน" value={info?.std_info_education_plan} />
						<InfoRow label="GPAX" value={info?.std_info_grade_gpax} />
						<InfoRow label="เกรดคณิตศาสตร์" value={info?.std_info_grade_math} />
						<InfoRow label="เกรดวิทยาศาสตร์" value={info?.std_info_grade_sci} />
						<InfoRow label="เกรดอังกฤษ" value={info?.std_info_grade_eng} />
					</CardContent>
				</Card>

				{/* --- สุขภาพ --- */}
				<Card className="w-full border-t-4 border-t-red-500 shadow-sm">
					<CardHeader className="pb-3 bg-muted/10">
						<CardTitle className="text-lg flex items-center">
							<HeartPulse className="w-5 h-5 mr-3" /> สุขภาพและการเดินทาง
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 space-y-2">
						<InfoRow label="กรุ๊ปเลือด" value={info?.std_info_blood_group} />
						<InfoRow label="โรคประจำตัว" value={info?.std_info_chronic_disease} />
						<InfoRow label="แพ้ยา" value={info?.std_info_drug_allergy} />
						<InfoRow label="แพ้อาหาร" value={info?.std_info_food_allergy} />
						<InfoRow label="สิทธิพยาบาล" value={info?.std_info_medical_insurance} />
						<InfoRow label="การเดินทาง" value={info?.std_info_travel_plan} />
					</CardContent>
				</Card>

				{/* --- ผู้ปกครอง --- */}
				<Card className="w-full border-t-4 border-t-green-500 shadow-sm">
					<CardHeader className="pb-3 bg-muted/10">
						<CardTitle className="text-lg flex items-center">
							<UsersRound className="w-5 h-5 mr-3" /> ข้อมูลผู้ปกครอง
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 space-y-2">
						<InfoRow label="ชื่อ-นามสกุล" value={info?.std_info_parent_fullname} />
						<InfoRow label="ความสัมพันธ์" value={info?.std_info_parent_relation} />
						<InfoRow label="เบอร์โทรศัพท์" value={info?.std_info_parent_phone_number} />
					</CardContent>
				</Card>

				{/* --- อุปกรณ์ --- */}
				<Card className="w-full border-t-4 border-t-purple-500 shadow-sm">
					<CardHeader className="pb-3 bg-muted/10">
						<CardTitle className="text-lg flex items-center">
							<Laptop className="w-5 h-5 mr-3" /> อุปกรณ์และความพร้อม
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 space-y-2">
						<InfoRow label="มีแล็ปท็อป" value={info?.std_info_have_laptop} />
						<InfoRow label="OS" value={info?.std_info_laptop_os} />
						<InfoRow label="มีเมาส์" value={info?.std_info_have_mouse} />
						<InfoRow label="มีแท็บเล็ต" value={info?.std_info_have_tablet} />
						<InfoRow label="มาได้ทุกวัน" value={info?.std_info_can_participate_every_day} />
						<InfoRow label="เคยเข้าค่าย" value={info?.std_info_have_participated} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

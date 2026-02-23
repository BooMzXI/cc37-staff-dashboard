
/*export const MOCK_INFORMATION: any[] = [
  {
    id: "STD001",
    std_name: "นายสมชาย ใจดี",
    std_gender: "ชาย",
    std_phone: "081-234-5678",
    email: "somchai.j@example.com",
    status: "success",
    isCorrect: true,
    timeChecked: "20-02-2026 10:30",
  },
  {
    id: "STD002",
    std_name: "นางสาวสมหญิง รักเรียน",
    std_gender: "หญิง",
    std_phone: "082-345-6789",
    email: "somying.r@example.com",
    status: "pending",
    isCorrect: false,
    timeChecked: "-",
  },
  {
    id: "STD003",
    std_name: "นายภูผา มั่นคง",
    std_gender: "ชาย",
    std_phone: "089-999-1111",
    email: "phupha.m@example.com",
    status: "success",
    isCorrect: false, // ตรวจแล้วแต่ข้อมูลอาจจะผิด
    timeChecked: "20-02-2026 11:15",
  },
  {
    id: "STD004",
    std_name: "นางสาวสายน้ำ ไหลเย็น",
    std_gender: "หญิง",
    std_phone: "083-444-5555",
    email: "sainam.l@example.com",
    status: "success",
    isCorrect: true,
    timeChecked: "19-02-2026 15:45",
  },
  {
    id: "STD005",
    std_name: "นายเวหา ฟ้าคราม",
    std_gender: "ชาย",
    std_phone: "085-555-6666",
    email: "weha.f@example.com",
    status: "pending",
    isCorrect: false,
    timeChecked: "-",
  },
  {
    id: "STD006",
    std_name: "นางสาวดารา ส่องแสง",
    std_gender: "หญิง",
    std_phone: "086-777-8888",
    email: "dara.s@example.com",
    status: "success",
    isCorrect: true,
    timeChecked: "20-02-2026 09:00",
  },
  {
    id: "STD007",
    std_name: "นายตะวัน เบิกบาน",
    std_gender: "ชาย",
    std_phone: "087-888-9999",
    email: "tawan.b@example.com",
    status: "success",
    isCorrect: true,
    timeChecked: "18-02-2026 14:20",
  },
  {
    id: "STD008",
    std_name: "นางสาวจันทร์เพ็ญ สว่าง",
    std_gender: "หญิง",
    std_phone: "088-111-2222",
    email: "janphen.s@example.com",
    status: "pending",
    isCorrect: false,
    timeChecked: "-",
  },
  {
    id: "STD001",
    std_name: "นายสมชาย ใจดี",
    std_gender: "ชาย",
    std_phone: "081-234-5678",
    email: "somchai.j@example.com",
    status: "success",
    isCorrect: true,
    timeChecked: "20-02-2026 10:30",
  },
  {
    id: "STD002",
    std_name: "นางสาวสมหญิง รักเรียน",
    std_gender: "หญิง",
    std_phone: "082-345-6789",
    email: "somying.r@example.com",
    status: "pending",
    isCorrect: false,
    timeChecked: "-",
  },
  {
    id: "STD003",
    std_name: "นายภูผา มั่นคง",
    std_gender: "ชาย",
    std_phone: "089-999-1111",
    email: "phupha.m@example.com",
    status: "success",
    isCorrect: false, // ตรวจแล้วแต่ข้อมูลอาจจะผิด
    timeChecked: "20-02-2026 11:15",
  },
  {
    id: "STD004",
    std_name: "นางสาวสายน้ำ ไหลเย็น",
    std_gender: "หญิง",
    std_phone: "083-444-5555",
    email: "sainam.l@example.com",
    status: "success",
    isCorrect: true,
    timeChecked: "19-02-2026 15:45",
  },
  {
    id: "STD005",
    std_name: "นายเวหา ฟ้าคราม",
    std_gender: "ชาย",
    std_phone: "085-555-6666",
    email: "weha.f@example.com",
    status: "pending",
    isCorrect: false,
    timeChecked: "-",
  },
  {
    id: "STD006",
    std_name: "นางสาวดารา ส่องแสง",
    std_gender: "หญิง",
    std_phone: "086-777-8888",
    email: "dara.s@example.com",
    status: "success",
    isCorrect: true,
    timeChecked: "20-02-2026 09:00",
  },
  {
    id: "STD007",
    std_name: "นายตะวัน เบิกบาน",
    std_gender: "ชาย",
    std_phone: "087-888-9999",
    email: "tawan.b@example.com",
    status: "success",
    isCorrect: true,
    timeChecked: "18-02-2026 14:20",
  },
  {
    id: "STD008",
    std_name: "นางสาวจันทร์เพ็ญ สว่าง",
    std_gender: "หญิง",
    std_phone: "088-111-2222",
    email: "janphen.s@example.com",
    status: "pending",
    isCorrect: false,
    timeChecked: "-",
  }
];*/

export interface Person {
  id: string;
  fullName: string;
  gender: "ชาย" | "หญิง";
  phone: string;
  email: string;
  status: "ตรวจแล้ว" | "ยังไม่มีคนตรวจ";
  isCorrect: boolean;
  checkedAt: string | null;
  checkedBy: string | null;
  // Detail fields
  age: number;
  birthDate: string;
  religion: string;
  educationLevel: string;
  studyProgram: string;
  school: string;
  bloodType: string;
  medicalRight: string;
  chronicDisease: string;
  foodAllergy: string;
  drugAllergy: string;
  emergencyPhone: string;
  emergencyName: string;
  emergencyRelation: string;
  address: string;
}
export const MOCK_INFORMATION_DETAIL: Person = {
    id: "user-001",
    fullName: "สมชาย ใจดี",
    gender: "ชาย",
    phone: "081-234-5678",
    email: "somchai@example.com",
    status: "ตรวจแล้ว",
    isCorrect: true,
    checkedAt: "18 กุมภาพันธ์ 2568 6:00 น.",
    checkedBy: "regisstaff",
    age: 17,
    birthDate: "15 พ.ค. 2552",
    religion: "พุทธ",
    educationLevel: "ม.6",
    studyProgram: "วิทย์-คณิต",
    school: "โรงเรียนสาธิตแห่งมหาวิทยาลัยเกษตรศาสตร์",
    bloodType: "O",
    medicalRight: "ประกันสังคม",
    chronicDisease: "ไม่มี",
    foodAllergy: "ไม่มี",
    drugAllergy: "ไม่มี",
    emergencyPhone: "089-111-2222",
    emergencyName: "สมศรี ใจดี",
    emergencyRelation: "มารดา",
    address: "123 ถ.พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900",
  }
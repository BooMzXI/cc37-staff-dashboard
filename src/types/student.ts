
export interface StdUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// ข้อมูลส่วนตัวเชิงลึก (Info)
export interface StdInfo {
  std_application_id: string;
  std_info_prefix: string;
  std_info_first_name: string;
  std_info_last_name: string;
  std_info_nick_name: string;
  std_info_age: number;
  std_info_birthdate: string;
  std_info_gender: string;
  std_info_phone_number: string;
  std_info_education_level: string;
  std_info_education_institute: string;
  created_at: string;
  updated_at: string;
}

// ข้อมูลไฟล์เอกสารที่อัปโหลด
export interface StdFile {
  std_application_id: string;
  std_file_originalname: string;
  std_file_mimetype: string;
  std_file_key: string;
  std_file_type: string;
  std_file_disabled: boolean;
  created_at: string;
  updated_at: string;
}

// ข้อมูลสตาฟ (คนตรวจ)
export interface StfUser {
  id: string;
  name: string;
  email: string;
}

// คะแนนและการตรวจคำถามฝ่ายทะเบียน
export interface StfRegisQuestionScore {
  id: number;
  std_regis_answer_id: number;
  stf_count: number;
  stf_score: number;
  stf_comment: string;
  stf_user_id: string;
  stf_user: StfUser;
  created_at: string;
  updated_at: string;
}

// คำถามฝ่ายทะเบียน
export interface StdRegisQuestion {
  std_application_id: string;
  std_regis_answer_id: number;
  std_regis_answer_section: string;
  std_regis_answer: string;
  stf_regis_question_score: StfRegisQuestionScore[];
  created_at: string;
  updated_at: string;
}

// คะแนนและการตรวจคำถามวิชาการ
export interface StfAcademicQuestionScore {
  id: number;
  std_academic_answer_id: number;
  stf_count: number;
  stf_score: number;
  stf_user_id: string;
  stf_user: StfUser;
  created_at: string;
  updated_at: string;
}

// คำถามวิชาการ
export interface StdAcademicQuestion {
  std_application_id: string;
  std_academic_answer_id: number;
  std_academic_answer_section: string;
  std_academic_answer: string;
  stf_academic_question_score: StfAcademicQuestionScore[];
  created_at: string;
  updated_at: string;
}

// สถานะความคืบหน้าของการสมัคร (Checklist)
export interface StdStatus {
  std_application_id: string;
  
  std_status_info_done: boolean;
  std_status_file_done: boolean;
  std_status_regis_question_done: boolean;
  std_status_acdemic_question_done: boolean;
  std_status_payment_done: boolean;

  stf_regis_question_checked: boolean;
  stf_academic_question_checked: boolean;
  stf_question_result: number;
  created_at: string;
  updated_at: string;
}


export interface StudentDetail {
  std_application_id: string;
  std_application_submit: boolean;
  std_application_confirm: boolean;
  std_application_pass: boolean;
  std_application_result: string;
  std_user_id: string;
  std_user: StdUser;
  std_info: StdInfo;
  std_file: StdFile[];
  std_regis_question: StdRegisQuestion[];
  std_academic_question: StdAcademicQuestion[];
  std_status: StdStatus;
  created_at: string;
  updated_at: string;
}
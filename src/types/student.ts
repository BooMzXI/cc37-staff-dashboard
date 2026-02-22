export interface StudentUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: string;
}

export interface StudentInfo {
  std_application_id: string;
  // ข้อมูลส่วนตัวพื้นฐาน
  std_info_prefix: string;
  std_info_first_name: string;
  std_info_last_name: string;
  std_info_nick_name: string;
  std_info_age: number;
  std_info_birthdate: string; // YYYY-MM-DD
  std_info_gender: string;
  std_info_sexuality: string;
  std_info_religion: string;
  std_info_phone_number: string;
  std_info_address: string;
  std_info_shirt_size: string;
  std_info_blood_group: string;
  
  // ข้อมูลการศึกษา
  std_info_education_level: string;
  std_info_education_institute: string;
  std_info_education_plan: string;
  std_info_grade_gpax: string;
  std_info_grade_math: string;
  std_info_grade_sci: string;
  std_info_grade_eng: string;

  // ข้อมูลผู้ปกครอง
  std_info_parent_fullname: string;
  std_info_parent_relation: string;
  std_info_parent_phone_number: string;

  // ข้อมูลสุขภาพและการเดินทาง
  std_info_medical_insurance: string;
  std_info_chronic_disease: string;
  std_info_drug_allergy: string;
  std_info_food_allergy: string;
  std_info_travel_plan: string;

  // ข้อมูลความพร้อมและอุปกรณ์
  std_info_have_participated: boolean;
  std_info_can_participate_every_day: boolean;
  std_info_have_laptop: boolean;
  std_info_laptop_os: string;
  std_info_have_tablet: boolean;
  std_info_have_mouse: boolean;

  created_at: string;
  updated_at: string;
}

export interface StaffInfoCheck {
  std_application_id: string;
  stf_user_id: string;
  std_info_status: "info_approve" | "info_reject" | "info_waiting" | string;
  created_at: string;
  updated_at: string;
  stf_user: StaffUser;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  displayUsername: string;
}

export interface StudentFile {
  std_file_key: string;
  std_file_originalname: string;
  std_file_mimetype: string;
  std_file_size: number;
  std_file_type: string;
  std_file_disabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudentStatus {
  std_status_info_done: boolean;
  std_status_file_done: boolean;
  std_status_payment_done: boolean;
  std_application_id: string;
  std_status_regis_question_done: boolean;
  std_status_acdemic_question_done: boolean;
  std_status_academic_chaos_question_done: boolean;
  std_info_note: string | null;

  stf_regis_question_checked: boolean;
  stf_academic_question_checked: boolean;
  stf_question_result: number;
  stf_question_result_detail: string | null;
  stf_info_check: StaffInfoCheck | null;
  created_at: string;
  updated_at: string;
}

// 🌟 Interface หลักที่จะเอาไปใช้งาน
export interface StudentDetail {
  std_application_id: string;
  std_application_submit: boolean;
  std_application_confirm: boolean;
  std_application_abort_reason: string | null;
  std_application_pass: boolean;
  std_application_result: string;
  std_user_id: string;
  
  std_user: StudentUser;
  std_info: StudentInfo;
  std_file: StudentFile[];
  std_status: StudentStatus;
  updated_at: string;
}
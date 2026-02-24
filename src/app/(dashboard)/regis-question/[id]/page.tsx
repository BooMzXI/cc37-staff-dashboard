"use client";

import { ArrowLeft, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Input } from "@/components/ui/input";
import { config } from "@/config/config";
import { Grading } from "./grading";
import { Question1, Question2, Question3, Question4, Question5, Question6 } from "./question";

export interface StaffUser {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	createdAt: string;
	updatedAt: string;
	role: string;
	banned: boolean;
	banReason: string | null;
	banExpires: string | null;
	username: string;
	displayUsername: string;
}

export interface RegisQuestionScore {
	id: number;
	std_regis_answer_id: number;
	stf_count: number;
	stf_score: number;
	stf_comment: string | null;
	stf_user_id: string;
	created_at: string;
	updated_at: string;
	stf_user: StaffUser;
}

export interface RegisAnswer {
	std_application_id: string;
	std_regis_answer_id: number;
	std_regis_answer_section: string;
	std_regis_answer: string;
	created_at: string;
	updated_at: string;
	stf_regis_question_score: RegisQuestionScore[];
}

const question = [
	{
		section: "regis_1",
		fullScore: "5",
		question: "น้องคาดหวังอะไรจากค่ายน้องคาดหวังอะไรจากค่าย",
		criteria: "ไม่รู้",
	},
	{
		section: "regis_2",
		fullScore: "5",
		question: "น้องได้เข้าร่วมการแข่งขันซึ่งต้องทำ Project เป็นทีม ทีมละ 5 คน โดยที่สมาชิกในทีมไม่เคยรู้จักกันมาก่อน ในกลุ่มมีสมาชิกคนหนึ่งที่มีความสามารถสูงกว่าเพื่อน ๆ เขาทำงานทุกอย่างแทนเพื่อนในกลุ่ม ส่งผลให้เพื่อนที่เหลือ รวมถึงตัวน้องรู้สึกว่าไม่ได้มีส่วนร่วมในการทำงาน",
		criteria: "ไม่รู้",
	},
	{
		section: "regis_3",
		fullScore: "5",
		question:
			"มดน้อยได้รับโอกาสเข้าไปเป็นมดฝึกงานในรังที่มดน้อยใฝ่ฝัน โดยราชินีมดมีอำนาจสูงสุด แต่เมื่อเริ่มงานมดน้อยกลับพบปัญหากับหัวหน้ามดงานซึ่งเป็นที่โปรดปรานของราชินี โดยหัวหน้ามดงานตัวนั้นมีพฤติกรรมเอารัดเอาเปรียบ รวมไปถึงการมอบหมายงานเกินกว่าขอบเขตที่ระบุไว้ในสัญญา นอกจากนี้ ยังได้ค่าจ้างซึ่งเป็นจำนวนน้ำตาลที่ไม่เหมาะสมกับขอบเขตของงานที่ทำ แม้มดน้อยจะรู้สึกว่าสิ่งนี้ไม่ยุติธรรมและไม่โปร่งใส แต่หัวหน้ามดงานดังกล่าวเป็นผู้ประเมินผลการฝึกงาน ซึ่งอาจส่งผลต่ออนาคตของมดน้อย",
		criteria: "ไม่รู้",
	},
	{
		section: "regis_4",
		fullScore: "5",
		question:
			"ทีมพัฒนาเทคโนโลยีของบริษัทแห่งหนึ่งได้รับข้อเสนอให้พัฒนาระบบการจัดการโรงแรมโดยใช้ AI ซึ่งทีมจะต้องพัฒนาระบบ AI ที่มีความซับซ้อน มีขอบเขตงานขนาดใหญ่ และต้องใช้ทรัพยากรจำนวนมาก จึงทำให้ค่าใช้จ่ายของโครงการค่อนข้างสูง ในขณะเดียวกัน ลูกค้ายังไม่มีความรู้และความเข้าใจด้านระบบเทคโนโลยีมากนัก",
		criteria: "ไม่รู้",
	},
	{
		section: "regis_5",
		fullScore: "5",
		question: "น้องจะต้องเดินทางเพื่อออกตามหากุญแจ 2 ดอก เพื่อนำไปเปิดกล่องสมบัติชิ้นสุดท้ายของตระกูลที่ถูกโจรสลัดขโมยไปเมื่อหลายสิบปีก่อน",
		criteria: "ไม่รู้",
	},
	{
		section: "regis_6",
		fullScore: "5",
		question:
			"ในปัจจุบันความรู้ด้านคอมพิวเตอร์สามารถเรียนรู้ได้ผ่านช่องทางออนไลน์ได้อย่างอิสระ อย่างไรก็ตาม น้องคิดว่าทำไมการเข้าศึกษาต่อในระดับอุดมศึกษา สาขาวิศวกรรมคอมพิวเตอร์จึงยังมีความสำคัญ AI ซึ่งทีมจะต้องพัฒนาระบบ AI ที่มีความซับซ้อน มีขอบเขตงานขนาดใหญ่ และต้องใช้ทรัพยากรจำนวนมาก จึงทำให้ค่าใช้จ่ายของโครงการค่อนข้างสูง ในขณะเดียวกัน ลูกค้ายังไม่มีความรู้และความเข้าใจด้านระบบเทคโนโลยีมากนัก",
		criteria: "ไม่รู้",
	},
];

export default function RegisAnswerGradingPage() {
	const params = useParams();
	const id = params?.id as string;
	const router = useRouter();
	const [answer, setAnswer] = useState<RegisAnswer[]>([]);

	useEffect(() => {
		if (!id) return;

		const fetchAnswer = async () => {
			try {
				const res = await fetch(`${config.backend.baseUrl}/api/staff/regis/answer/${id}`, {
					credentials: "include",
				});
				if (!res.ok) throw new Error("Failed to fetch detail");

				const data = await res.json();
				setAnswer(data);
			} catch (error) {
				console.error(error);
			} finally {
				// setLoading(false);
			}
		};

		fetchAnswer();
	}, [id]);

	return (
		<>
			<div className="flex flex-row items-center">
				<div className="mb-8 mr-5">
					<button type="button" className="px-2 py-2 rounded-md hover:bg-white/10 border duration-300 cursor-pointer" onClick={() => router.push("/regis-question")}>
						<ArrowLeft size={30} />
					</button>
				</div>
				<PageTitle title="ประเมินคะแนนคำถามทะเบียน" description="" />
			</div>
			<div className="border rounded-xl py-8 pl-10">
				<div className="grid grid-cols-5 gap-5 h-[calc(100vh-250px)]">
					<div className="col-span-3 border-r flex flex-col pr-10 overflow-y-auto">
						<div className="text-center sticky top-0 bg-background pb-4">คำถาม</div>
						<Question1 answer={answer.filter((ans) => ans.std_regis_answer_section === "regis_1")[0]?.std_regis_answer} />
						<Question2 answer={answer.filter((ans) => ans.std_regis_answer_section === "regis_2")[0]?.std_regis_answer} />
						<Question3 answer={answer.filter((ans) => ans.std_regis_answer_section === "regis_3")[0]?.std_regis_answer} />
						<Question4 answer={answer.filter((ans) => ans.std_regis_answer_section === "regis_4")[0]?.std_regis_answer} />
						<Question5 answer={answer.filter((ans) => ans.std_regis_answer_section === "regis_5")[0]?.std_regis_answer} />
						<Question6 answer={answer.filter((ans) => ans.std_regis_answer_section === "regis_6")[0]?.std_regis_answer} />
					</div>
					<div className="col-span-2 flex flex-col overflow-y-auto">
						<div className="text-center sticky top-0 bg-background pb-4">เกณฑ์การให้คะแนน</div>
						<div className="pr-5">
							{/* {answer.map((ans, i) => (
								<Grading key={i} section={ans.std_regis_answer_section} question={question[i].question} applicationId={ans.std_application_id} answerId={ans.std_regis_answer_id} />
							))} */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

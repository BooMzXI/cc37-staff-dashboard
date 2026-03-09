"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { config } from "@/config/config";
import { AcademicChaosQuestionScore, getSectionDisplayName, sectionSortIndex } from "../column";
import { Grading } from "./components/Grading";
import { type GradingBoxItem, GradingGroup } from "./components/GradingGroup";
import { Question1, Question2, Question3 } from "./components/Question";

export interface AcademicChaosAnswer {
	std_application_id: string;
	std_academic_chaos_answer_id: number;
	std_academic_chaos_answer_section: string;
	std_academic_chaos_answer: string;
	created_at: string;
	updated_at: string;
	stf_academic_chaos_question_score: AcademicChaosQuestionScore[];
}

const question = [
	{
		section: "aptitude_101",
		fullScore: "-1",
		question: "คำสาปสามสีแห่งจอมมาร",
		criteria: "",
	},
	{
		section: "aptitude_102",
		fullScore: "-1",
		question: "คำสาปสามสีแห่งจอมมาร (ต่อ)",
		criteria: "",
	},
	{
		section: "aptitude_201",
		fullScore: "-1",
		question: "จงระบุสถานะของหอคอย X, Y และ Z ใน นาทีที่ 2 และ นาทีที่ 3 อย่างละเอียด",
		criteria: "",
	},
	{
		section: "aptitude_202",
		fullScore: "-1",
		question: "จากกฎข้างต้น น้องคิดว่าจะเกิด “เหตุการณ์ไฟลัดวงจร” (กฎข้อที่ 1 ถูกละเมิด) ในนาทีใดหรือไม่? หากเกิด ให้ระบุนาทีที่เกิดเหตุการณ์นั้นและอธิบายสาเหตุของปัญหา",
		criteria: "",
	},
	{
		section: "aptitude_203",
		fullScore: "-1",
		question: "หากน้องเป็นวิศวกรผู้ออกแบบระบบ และพบว่ากฎเดิมทำให้เกิดอันตราย น้องจะ “แก้ไขกฎข้อใดเพียงข้อเดียว” เพื่อให้ระบบสามารถป้องกันพายุได้ (X เป็น 🔴) โดยที่ไฟไม่ลัดวงจร และหอคอย Z ยังทำงานได้? (จงอธิบายเหตุผลและความคิดสร้างสรรค์ในการแก้ปัญหา)",
		criteria: "",
	},
	{
		section: "aptitude_301",
		fullScore: "-1",
		question: "น้องคิดว่าใครเป็นผู้ร้ายที่ปิดเครื่องฟอกอากาศ ตอบเป็นชื่อของผู้ร้าย",
		criteria: "",
	},
	{
		section: "aptitude_302",
		fullScore: "-1",
		question: "อธิบายเหตุผลว่าทำไมถึงคิดเช่นนั้น จงอธิบายเหตุผลอย่างละเอียดและชัดเจน",
		criteria: "",
	},
];

export default function AcademicChaosAnswerGradingPage() {
	const params = useParams();
	const id = params?.id as string;
	const router = useRouter();
	const [answer, setAnswer] = useState<AcademicChaosAnswer[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [updateTrigger, setUpdateTrigger] = useState<number>(0);

	useEffect(() => {
		if (!id) return;
		setIsLoading(true);

		const fetchAnswer = async () => {
			try {
				const res = await fetch(`${config.backend.baseUrl}/api/staff/academic-chaos/answer/${id}`, {
					credentials: "include",
				});
				if (!res.ok) throw new Error("Failed to fetch detail");

				const data = await res.json();
				setAnswer(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnswer();
	}, [id, updateTrigger]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="flex flex-row items-center">
				<div className="mb-8 mr-5">
					<button type="button" className="px-2 py-2 rounded-md hover:bg-white/10 border duration-300 cursor-pointer" onClick={() => router.push("/academic-chaos-question")}>
						<ArrowLeft size={30} />
					</button>
				</div>
				<PageTitle title="ประเมินคะแนนคำถามวิชาการ (เชาว์)" description="" />
			</div>
			<div className="border rounded-xl py-8 pl-10">
				<div className="grid gap-y-16 lg:grid-cols-5 gap-5 h-screen xl:h-[calc(100vh-250px)]">
					<div className="col-span-3 border-r flex flex-col pr-10 overflow-y-auto">
						<div className="text-center sticky z-10 top-0 bg-background pb-4">คำถาม</div>
						<Question1
							answer1={answer.filter((ans) => ans.std_academic_chaos_answer_section === "aptitude_101")[0]?.std_academic_chaos_answer}
							answer2={answer.filter((ans) => ans.std_academic_chaos_answer_section === "aptitude_102")[0]?.std_academic_chaos_answer}
						/>
						<Question2
							answer1={answer.filter((ans) => ans.std_academic_chaos_answer_section === "aptitude_201")[0]?.std_academic_chaos_answer}
							answer2={answer.filter((ans) => ans.std_academic_chaos_answer_section === "aptitude_202")[0]?.std_academic_chaos_answer}
							answer3={answer.filter((ans) => ans.std_academic_chaos_answer_section === "aptitude_203")[0]?.std_academic_chaos_answer}
						/>
						<Question3
							answer1={answer.filter((ans) => ans.std_academic_chaos_answer_section === "aptitude_301")[0]?.std_academic_chaos_answer}
							answer2={answer.filter((ans) => ans.std_academic_chaos_answer_section === "aptitude_302")[0]?.std_academic_chaos_answer}
						/>
					</div>
					<div className="col-span-3 lg:col-span-2 flex flex-col overflow-y-auto">
						<div className="text-center sticky z-10 top-0 bg-background pb-4">ให้คะแนน</div>
						<div className="pr-5">
							{/* ข้อ 1: aptitude_101 — 1 grading box */}
							{(() => {
								const ans101 = answer.find((a) => a.std_academic_chaos_answer_section === "aptitude_101");
								if (!ans101) return null;
								return (
									<Grading
										key={ans101.std_academic_chaos_answer_id}
										section={ans101.std_academic_chaos_answer_section}
										question={question.find((q) => q.section === "aptitude_101")?.question || ""}
										applicationId={ans101.std_application_id}
										answerId={ans101.std_academic_chaos_answer_id}
										passGrading={ans101.stf_academic_chaos_question_score}
										updateTrigger={setUpdateTrigger}
									/>
								);
							})()}

							{/* ข้อ 2: aptitude_201-203 — 1 section, 3 grading boxes */}
							{(() => {
								const ans201 = answer.find((a) => a.std_academic_chaos_answer_section === "aptitude_201");
								const ans202 = answer.find((a) => a.std_academic_chaos_answer_section === "aptitude_202");
								const ans203 = answer.find((a) => a.std_academic_chaos_answer_section === "aptitude_203");
								if (!ans201 && !ans202 && !ans203) return null;
								const items: GradingBoxItem[] = [];
								if (ans201)
									items.push({
										label: getSectionDisplayName("aptitude_201"),
										answerId: ans201.std_academic_chaos_answer_id,
										applicationId: ans201.std_application_id,
										staffCount: 21,
										passGrading: ans201.stf_academic_chaos_question_score,
										criteriaSection: "aptitude_201",
									});
								if (ans202)
									items.push({
										label: getSectionDisplayName("aptitude_202"),
										answerId: ans202.std_academic_chaos_answer_id,
										applicationId: ans202.std_application_id,
										staffCount: 22,
										passGrading: ans202.stf_academic_chaos_question_score,
										criteriaSection: "aptitude_202",
									});
								if (ans203)
									items.push({
										label: getSectionDisplayName("aptitude_203"),
										answerId: ans203.std_academic_chaos_answer_id,
										applicationId: ans203.std_application_id,
										staffCount: 23,
										passGrading: ans203.stf_academic_chaos_question_score,
										criteriaSection: "aptitude_203",
									});
								return <GradingGroup title="ข้อ 2: หอคอยสัญญาณอัฉริยะ" items={items} updateTrigger={setUpdateTrigger} />;
							})()}

							{/* ข้อ 3: aptitude_301-302 — 1 section, 4 grading boxes */}
							{(() => {
								const ans301 = answer.find((a) => a.std_academic_chaos_answer_section === "aptitude_301");
								if (!ans301) return null;
								const items: GradingBoxItem[] = [
									{
										label: "ด้าน 1: การเชื่อมโยงหลักฐานสมองกล",
										answerId: ans301.std_academic_chaos_answer_id,
										applicationId: ans301.std_application_id,
										staffCount: 31,
										passGrading: ans301.stf_academic_chaos_question_score,
										criteriaSection: "aptitude_301",
									},
									{
										label: "ด้าน 2: การวิเคราะห์ความขัดแย้งพยาน",
										answerId: ans301.std_academic_chaos_answer_id,
										applicationId: ans301.std_application_id,
										staffCount: 32,
										passGrading: ans301.stf_academic_chaos_question_score,
										criteriaSection: "aptitude_302",
									},
									{
										label: "ด้าน 3: ความสมเหตุสมผลเชิงตรรกะ",
										answerId: ans301.std_academic_chaos_answer_id,
										applicationId: ans301.std_application_id,
										staffCount: 33,
										passGrading: ans301.stf_academic_chaos_question_score,
										criteriaSection: "aptitude_303",
									},
									{
										label: "ด้าน 4: ความตั้งใจและการเรียบเรียง",
										answerId: ans301.std_academic_chaos_answer_id,
										applicationId: ans301.std_application_id,
										staffCount: 34,
										passGrading: ans301.stf_academic_chaos_question_score,
										criteriaSection: "aptitude_304",
									},
								];
								return <GradingGroup title="ข้อ 3: คดีปริศนาในม่านฝุ่น" items={items} updateTrigger={setUpdateTrigger} />;
							})()}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { config } from "@/config/config";
import { AcademicQuestionScore, getSectionDisplayName, sectionSortIndex } from "../column";
import { Grading } from "./components/Grading";
import { Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10 } from "./components/Question";

export interface AcademicAnswer {
	std_application_id: string;
	std_academic_answer_id: number;
	std_academic_answer_section: string;
	std_academic_answer: string;
	created_at: string;
	updated_at: string;
	stf_academic_question_score: AcademicQuestionScore[];
}

export default function AcademicAnswerGradingPage() {
	const params = useParams();
	const id = params?.id as string;
	const router = useRouter();
	const [answer, setAnswer] = useState<AcademicAnswer[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [updateTrigger, setUpdateTrigger] = useState<number>(0);

	useEffect(() => {
		if (!id) return;
		setIsLoading(true);

		const fetchAnswer = async () => {
			try {
				const res = await fetch(`${config.backend.baseUrl}/api/staff/academic/answer/${id}`, {
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

	const sortedAnswers = [...answer].sort((a, b) => sectionSortIndex(a.std_academic_answer_section) - sectionSortIndex(b.std_academic_answer_section));

	return (
		<>
			<div className="flex flex-row items-center">
				<div className="mb-8 mr-5">
					<button type="button" className="px-2 py-2 rounded-md hover:bg-white/10 border duration-300 cursor-pointer" onClick={() => router.push("/academic-question")}>
						<ArrowLeft size={30} />
					</button>
				</div>
				<PageTitle title="ประเมินคะแนนคำถามวิชาการ" description="" />
			</div>
			<div className="border rounded-xl py-8 pl-10">
				<div className="grid gap-y-16 lg:grid-cols-5 gap-5 h-screen xl:h-[calc(100vh-250px)]">
					<div className="col-span-3 border-r flex flex-col pr-10 overflow-y-auto">
						<div className="text-center sticky z-10 top-0 bg-background pb-4">คำถาม</div>
						<Question1 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_1")[0]?.std_academic_answer} />
						<Question2
							answer1={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_201")[0]?.std_academic_answer}
							answer2={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_202")[0]?.std_academic_answer}
							answer3={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_203")[0]?.std_academic_answer}
						/>
						<Question3 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_3")[0]?.std_academic_answer} />
						<Question4 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_4")[0]?.std_academic_answer} />
						<Question5 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_5")[0]?.std_academic_answer} />
						<Question6 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_6")[0]?.std_academic_answer} />
						<Question7 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_7")[0]?.std_academic_answer} />
						<Question8 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_8")[0]?.std_academic_answer} />
						<Question9 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_9")[0]?.std_academic_answer} />
						<Question10 answer={sortedAnswers.filter((ans) => ans.std_academic_answer_section === "academic_10")[0]?.std_academic_answer} />
					</div>
					<div className="col-span-3 lg:col-span-2 flex flex-col overflow-y-auto">
						<div className="text-center sticky z-10 top-0 bg-background pb-4">ให้คะแนน</div>
						<div className="pr-5">
							{sortedAnswers.map((ans) => (
								<Grading
									key={ans.std_academic_answer_id}
									section={ans.std_academic_answer_section}
									applicationId={ans.std_application_id}
									answerId={ans.std_academic_answer_id}
									passGrading={ans.stf_academic_question_score}
									updateTrigger={setUpdateTrigger}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

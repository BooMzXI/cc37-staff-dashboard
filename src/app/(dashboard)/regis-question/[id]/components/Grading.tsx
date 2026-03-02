import axios from "axios";
import { Check, ChevronDown, Dot, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Collapsible } from "@/components/Collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config/config";
import { RegisQuestionScore } from "../page";
import { Criteria } from "./Criteria";

interface Grading {
	score: number;
	comment?: string | null;
}

export function Grading({
	fullScore,
	section,
	question,
	applicationId,
	answerId,
	passGrading,
	criteria,
	updateTrigger,
}: {
	fullScore: string;
	question: string;
	applicationId: string;
	answerId: number;
	section: string;
	passGrading: RegisQuestionScore[];
	criteria: string;
	updateTrigger: (_: number) => void;
}): React.JSX.Element {
	const [gradingStaff1, setGradingStaff1] = useState<Grading>({
		score: passGrading.filter((g) => g.stf_count === 1)[0]?.stf_score,
		comment: passGrading.filter((g) => g.stf_count === 1)[0]?.stf_comment,
	});
	const [gradingStaff2, setGradingStaff2] = useState<Grading>({
		score: passGrading.filter((g) => g.stf_count === 2)[0]?.stf_score,
		comment: passGrading.filter((g) => g.stf_count === 2)[0]?.stf_comment,
	});
	const [isShowCriteria, setIsShowCriteria] = useState<boolean>(false);

	const [isGradingLoading, setIsGradingLoading] = useState<boolean>(false);

	async function submitGrading(staff: number) {
		// if (!gradingStaff1.score && staff === 1) return toast.error(`คะเเนนไม่ถูกต้อง (0 - ${fullScore})`);
		// if (!gradingStaff2.score && staff === 2) return toast.error(`คะเเนนไม่ถูกต้อง (0 - ${fullScore})`);

		if (gradingStaff1.score > Number(fullScore) || gradingStaff2.score > Number(fullScore)) return toast.error(`คะเเนนไม่ถูกต้อง (0 - ${fullScore})`);

		console.log("Staff 1", gradingStaff1);
		console.log("Staff 2", gradingStaff2);

		console.log("section", section);
		console.log("answer_id", answerId);

		setIsGradingLoading(true);
		try {
			axios.defaults.withCredentials = true;
			const gradingResponse = await axios.post(`${config.backend.baseUrl}/api/staff/regis/answer/grading`, {
				application_id: applicationId,
				answer_id: answerId,
				staff_count: staff,
				score: staff === 1 ? gradingStaff1.score : gradingStaff2.score,
				comment: staff === 1 ? gradingStaff1.comment : gradingStaff2.comment,
			});
			console.log(gradingResponse.data);
			toast.success(`บันทึกคะเเนนข้อ ${section.replace("regis_", "")} ของผู้ตรวจ ${staff} เเล้ว`);
		} catch (e) {
			console.error(e);
		} finally {
			setIsGradingLoading(false);
			updateTrigger(Math.random());
		}
	}

	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-lg mr-3">{section.replace("regis_", "")}.</div> <div className="truncate">{question}</div>
			</div>
			<div className="font-normal text-base mt-1 text-[#eb6838]">({criteria})</div>
			<div className="w-full flex flex-row justify-between items-center my-3">
				<button type="button" className={`pl-5 py-3 grow cursor-pointer flex flex-row items-center active:bg-white/40 hover:bg-white/10 mr-5 rounded-lg duration-300`} onClick={() => setIsShowCriteria((prev) => !prev)}>
					<ChevronDown className={`mr-3 duration-300 ${isShowCriteria ? "rotate-180" : "rotate-0"}`} />
					<div className="text-sm">เกณการให้คะเเนน</div>
				</button>
				<div className="font-normal text-base bg-[#fa3636] w-fit px-2 rounded-xl py-[2px]">{fullScore} คะเเนน</div>
			</div>
			<Collapsible open={isShowCriteria}>
				<Criteria section={section} />
			</Collapsible>

			<div className="grid gap-y-10 lg:grid-cols-2 mt-2 gap-4">
				<div className="flex flex-col">
					<div className="text-xs">ผู้ตรวจคนที่ 1</div>
					<div className="flex flex-row items-center mt-5">
						<Input
							disabled={isGradingLoading}
							className="mr-2"
							type="number"
							placeholder="0.00"
							step="0.01"
							min="0"
							max={Number(fullScore)}
							defaultValue={passGrading.filter((g) => g.stf_count === 1)[0]?.stf_score}
							onChange={(e) =>
								setGradingStaff1((prev) => ({
									...prev,
									score: Number(e.target.value),
								}))
							}
							required
						/>
						<button disabled={isGradingLoading} type="button" className="flex items-center py-2 px-2 bg-white text-black rounded-md cursor-pointer hover:scale-105 duration-300 active:scale-95" onClick={() => submitGrading(1)}>
							{isGradingLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : <Check strokeWidth={3} />}
						</button>
					</div>
					<div className="mt-3">
						<Textarea
							disabled={isGradingLoading}
							defaultValue={passGrading.filter((g) => g.stf_count === 1)[0]?.stf_comment || ""}
							onChange={(e) =>
								setGradingStaff1((prev) => ({
									...prev,
									comment: e.target.value,
								}))
							}
						></Textarea>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="text-xs">ผู้ตรวจคนที่ 2</div>
					<div className="flex flex-row items-center mt-5">
						<Input
							disabled={isGradingLoading}
							className="mr-2"
							type="number"
							placeholder="0.00"
							step="0.01"
							min="0"
							max={Number(fullScore)}
							defaultValue={passGrading.filter((g) => g.stf_count === 2)[0]?.stf_score}
							onChange={(e) =>
								setGradingStaff2((prev) => ({
									...prev,
									score: Number(e.target.value),
								}))
							}
							required
						/>
						<button disabled={isGradingLoading} type="button" className="flex items-center py-2 px-2 bg-white text-black rounded-md cursor-pointer hover:scale-105 duration-300 active:scale-95" onClick={() => submitGrading(2)}>
							{isGradingLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : <Check strokeWidth={3} />}
						</button>
					</div>
					<div className="mt-3">
						<Textarea
							disabled={isGradingLoading}
							defaultValue={passGrading.filter((g) => g.stf_count === 2)[0]?.stf_comment || ""}
							onChange={(e) =>
								setGradingStaff2((prev) => ({
									...prev,
									comment: e.target.value,
								}))
							}
						></Textarea>
					</div>
				</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

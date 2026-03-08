import axios from "axios";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Collapsible } from "@/components/Collapsible";
import { Input } from "@/components/ui/input";
import { config } from "@/config/config";
import type { AcademicChaosQuestionScore } from "../../column";
import { Answer2, Criteria } from "./Criteria";

export interface GradingBoxItem {
	label: string;
	answerId: number;
	applicationId: string;
	staffCount: number;
	passGrading: AcademicChaosQuestionScore[];
	criteriaSection: string;
}

function GradingBox({ item, updateTrigger }: { item: GradingBoxItem; updateTrigger: (_: number) => void }) {
	const existingScore = item.passGrading.find((g) => g.stf_count === item.staffCount)?.stf_score;
	const [score, setScore] = useState<number | undefined>(existingScore);
	const [isGradingLoading, setIsGradingLoading] = useState<boolean>(false);
	const [isShowCriteria, setIsShowCriteria] = useState<boolean>(false);
	const [isShowSection2Answer, setIsShowSection2Answer] = useState<boolean>(false);

	async function submitGrading() {
		if (score === undefined || score === null) return toast.error("กรุณาใส่คะแนน");

		setIsGradingLoading(true);
		try {
			axios.defaults.withCredentials = true;
			const gradingResponse = await axios.post(`${config.backend.baseUrl}/api/staff/academic-chaos/answer/grading`, {
				application_id: item.applicationId,
				answer_id: item.answerId,
				staff_count: item.staffCount,
				score: score,
			});
			console.log(gradingResponse.data);
			toast.success(`บันทึกคะแนน ${item.label} แล้ว`);
		} catch (e) {
			console.error(e);
			toast.error("เกิดข้อผิดพลาดในการบันทึกคะแนน");
		} finally {
			setIsGradingLoading(false);
			updateTrigger(Math.random());
		}
	}

	return (
		<div className="flex flex-col mt-4">
			<div className="text-base font-semibold">{item.label}</div>
			<div className="mt-2 flex flex-row items-center justify-between">
				<button type="button" className="px-5 py-2 cursor-pointer flex flex-row items-center active:bg-white/40 hover:bg-white/10 mr-5 rounded-lg duration-300" onClick={() => setIsShowCriteria((prev) => !prev)}>
					<ChevronDown className={`mr-3 duration-300 ${isShowCriteria ? "rotate-180" : "rotate-0"}`} />
					<div className="text-sm">เกณการให้คะเเนน</div>
				</button>
				{item.criteriaSection.startsWith("aptitude_2") ? (
					<button type="button" className="px-5 py-2 cursor-pointer flex flex-row items-center active:bg-white/40 hover:bg-white/10 rounded-lg duration-300" onClick={() => setIsShowSection2Answer((prev) => !prev)}>
						<ChevronDown className={`mr-3 duration-300 ${isShowSection2Answer ? "rotate-180" : "rotate-0"}`} />
						<div className="text-sm">เฉลยเชิงตรรกะ</div>
					</button>
				) : (
					<></>
				)}
			</div>

			<Collapsible open={isShowCriteria}>
				<Criteria section={item.criteriaSection} />
			</Collapsible>
			<Collapsible open={isShowSection2Answer}>
				<Answer2 />
			</Collapsible>
			<div className="flex flex-row items-center mt-2">
				<Input disabled={isGradingLoading} className="mr-2" type="number" placeholder="0.00" step="0.01" min="0" defaultValue={existingScore} onChange={(e) => setScore(Number(e.target.value))} required />
				<button disabled={isGradingLoading} type="button" className="flex items-center py-2 px-2 bg-white text-black rounded-md cursor-pointer hover:scale-105 duration-300 active:scale-95" onClick={() => submitGrading()}>
					{isGradingLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : <Check strokeWidth={3} />}
				</button>
			</div>
		</div>
	);
}

export function GradingGroup({ title, items, updateTrigger }: { title: string; items: GradingBoxItem[]; updateTrigger: (_: number) => void }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-lg mr-3">{title}</div>
			</div>
			{items.map((item, i) => (
				<GradingBox key={i} item={item} updateTrigger={updateTrigger} />
			))}
			<div className="w-auto mt-8 h-[1px] bg-white"></div>
		</div>
	);
}

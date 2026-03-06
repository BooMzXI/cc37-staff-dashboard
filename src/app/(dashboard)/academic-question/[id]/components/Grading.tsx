import axios from "axios";
import { Check, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { config } from "@/config/config";
import { AcademicQuestionScore, getSectionDisplayName } from "../../column";

export function Grading({
	section,
	applicationId,
	answerId,
	passGrading,
	updateTrigger,
}: {
	section: string;
	applicationId: string;
	answerId: number;
	passGrading: AcademicQuestionScore[];
	updateTrigger: (_: number) => void;
}): React.JSX.Element {
	const [score, setScore] = useState<number | undefined>(passGrading[0]?.stf_score);
	const [isGradingLoading, setIsGradingLoading] = useState<boolean>(false);

	async function submitGrading() {
		if (score === undefined || score === null) return toast.error("กรุณาใส่คะแนน");

		setIsGradingLoading(true);
		try {
			axios.defaults.withCredentials = true;
			const gradingResponse = await axios.post(`${config.backend.baseUrl}/api/staff/academic/answer/grading`, {
				application_id: applicationId,
				answer_id: answerId,
				staff_count: 1,
				score: score,
			});
			console.log(gradingResponse.data);
			toast.success(`บันทึกคะแนนข้อ ${getSectionDisplayName(section)} แล้ว`);
		} catch (e) {
			console.error(e);
			toast.error("เกิดข้อผิดพลาดในการบันทึกคะแนน");
		} finally {
			setIsGradingLoading(false);
			updateTrigger(Math.random());
		}
	}

	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-lg mr-3">ข้อ {getSectionDisplayName(section)}</div>
			</div>
			<div className="flex flex-col mt-2">
				<div className="text-xs">ผู้ตรวจ</div>
				<div className="flex flex-row items-center mt-5">
					<Input disabled={isGradingLoading} className="mr-2" type="number" placeholder="0.00" step="0.01" min="0" defaultValue={passGrading[0]?.stf_score} onChange={(e) => setScore(Number(e.target.value))} required />
					<button disabled={isGradingLoading} type="button" className="flex items-center py-2 px-2 bg-white text-black rounded-md cursor-pointer hover:scale-105 duration-300 active:scale-95" onClick={() => submitGrading()}>
						{isGradingLoading ? <Loader2 strokeWidth={3} className="animate-spin" /> : <Check strokeWidth={3} />}
					</button>
				</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white"></div>
		</div>
	);
}

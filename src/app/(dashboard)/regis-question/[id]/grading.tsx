import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config/config";
import axios from "axios";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Grading {
	application_id: string;
	answer_id: string;
	score: string;
	staff_count: string;
	comment: string;
}

export function Grading({
	applicationId,
	answerId,
	question,
	section,
	score,
	staffCount,
	comment,
}: {
	question: string;
	applicationId: string;
	answerId: string;
	section: string;
	score: string;
	staffCount: string;
	comment: string;
}): React.JSX.Element {
	const [grading, setGrading] = useState<Grading | null>(null);

	useEffect(() => {
		if (!grading || !grading.score) {
			return;
		}

		(async () => {
			try {
				axios.defaults.withCredentials = true;
				const gradingResponse = await axios.post(`${config.backend.baseUrl}/api/staff/regis/answer/${grading.application_id}`, {
					...grading,
				});
			} catch (e) {
				console.error(e);
			}
		})();
	}, [grading]);

	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-lg mr-3">{section}.</div> <div className="truncate">{"question"}</div>
			</div>
			<div className="font-normal text-base mt-1 text-[#eb6838]">({"criteria"})</div>
			<div className="mt-1 w-full flex flex-row justify-end">
				<div className="font-normal text-base bg-[#fa3636] w-fit px-2 rounded-xl py-[2px]">{"fullScore"} คะเเนน</div>
			</div>
			<div className="grid grid-cols-2 mt-2 gap-4">
				<div className="flex flex-col">
					<div className="text-xs">ผู้ตรวจคนที่ 1</div>
					<div className="flex flex-row items-center mt-5">
						<Input className="mr-2" type="number" placeholder="0.00" step="0.01" min="0" max={"fullScore"} value={"staffGrading1"} onChange={(e) => "setStaffGrading1(e.target.value)"} disabled={false} required />
						<div className="flex items-center py-2 px-2 bg-white text-black rounded-md cursor-pointer hover:scale-105 duration-300 active:scale-95">
							<Check strokeWidth={3} />
						</div>
					</div>
					<div className="mt-3">
						<Textarea>asd</Textarea>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="text-xs">ผู้ตรวจคนที่ 1</div>
					<div className="flex flex-row items-center mt-5">
						<Input className="mr-2" type="number" placeholder="0.00" step="0.01" min="0" max={"fullScore"} value={"staffGrading2"} onChange={(e) => "setStaffGrading2(e.target.value)"} disabled={false} required />
						<div className="flex items-center py-2 px-2 bg-white text-black rounded-md cursor-pointer hover:scale-105 duration-300 active:scale-95">
							<Check strokeWidth={3} />
						</div>
					</div>
					<div className="mt-3">
						<Textarea>asd</Textarea>
					</div>
				</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

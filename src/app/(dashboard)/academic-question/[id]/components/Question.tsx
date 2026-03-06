import type React from "react";
import { getSectionDisplayName } from "../../column";

export function Question({ section, answer }: { section: string; answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-lg mr-3 font-bold">ข้อ {getSectionDisplayName(section)}</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold underline">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white"></div>
		</div>
	);
}

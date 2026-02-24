import { Dot } from "lucide-react";
import React from "react";

export function Criteria({ section }: { section: string }): React.JSX.Element {
	if (section === "regis_1") return <Criteria1 />;
	else if (section === "regis_2") return <Criteria2 />;
	else if (section === "regis_3") return <Criteria3 />;
	else if (section === "regis_4") return <Criteria4 />;
	else if (section === "regis_5") return <Criteria5 />;
	else if (section === "regis_6") return <Criteria6 />;
	else return <></>;
}

function CriteriaBody({ children }: { children: React.ReactNode }): React.JSX.Element {
	return <div className="border rounded-lg py-3 px-5 mb-3 mt-2 flex flex-col">{children}</div>;
}

function CriteriaHead({ children, score }: { children: React.ReactNode; score: number }): React.JSX.Element {
	return (
		<div className="text-base">
			{children} <span className="text-red-500">({score} คะแนน)</span>
		</div>
	);
}

function CriteriaSub({ children, score }: { children: React.ReactNode; score: number }): React.JSX.Element {
	return (
		<div className="ml-5 mt-2 flex flex-row items-baseline">
			<div className="min-w-[7px] min-h-[7px] rounded-full bg-white"></div>
			<div className="ml-3 text-sm break-words">
				{children} <span className="text-red-500">({score} คะแนน)</span>
			</div>
		</div>
	);
}

function CriteriaHead2({ children, score }: { children: React.ReactNode; score: number }): React.JSX.Element {
	return (
		<div className="text-base mt-4">
			{children} <span className="text-red-500">({score} คะแนน)</span>
		</div>
	);
}

function CriteriaAI(): React.JSX.Element {
	return (
		<div className="text-base mt-3 break-words">
			<span className="text-red-500">หากตรวจพบการใช้ AI ปรับคะแนนในข้อนี้เป็น 0</span>
		</div>
	);
}

function CriteriaWord(): React.JSX.Element {
	return (
		<>
			<CriteriaHead2 score={1}>การสะกดคำ</CriteriaHead2>
			<CriteriaSub score={1}>ไม่มีคำผิด</CriteriaSub>
			<CriteriaSub score={0}>มีคำผิด</CriteriaSub>
		</>
	);
}

export function Criteria1(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead score={4}>การประเมินความคาดหวัง</CriteriaHead>
			<CriteriaSub score={4}>มีความคาดหวังที่ชัดเจนมาก พร้อมอธิบายสิ่งที่คาดหวังให้เห็นภาพได้เป็นอย่างดี รายละเอียดสนับสุนนชัดเจน</CriteriaSub>
			<CriteriaSub score={3}>มีความคาดหวังค่อนข้างชัดเจน อธิบายสิ่งที่คาดหวังได้เข้าใจในภาพรวม แต่รายละเอียดยังไม่ครบถ้วน</CriteriaSub>
			<CriteriaSub score={2}>มีการกล่าวถึงความคาดหวัง แต่ยังไม่ชัดเจน อธิบายค่อนข้างกว้างหรือสั้นเกินไป ทำให้เห็นภาพบางส่วน</CriteriaSub>
			<CriteriaSub score={1}>มีการกล่าวถึงความคาดหวังแบบกว้างๆ หรือคลุมเครือ ไม่ระบุชัดว่าคาดหวังอะไร หรืออธิบายไม่ตรงประเด็นบางส่วน</CriteriaSub>
			<CriteriaSub score={0}>ไม่แสดงให้เห็นถึงความคาดหวัง/ตอบคำถามผิดประเด็น/ไม่ตอบคำถาม</CriteriaSub>
			<CriteriaWord />
			<CriteriaAI />
		</CriteriaBody>
	);
}

export function Criteria2(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead score={2}>วิธีการแก้ไขปัญหาอย่างมีประสิทธิภาพ</CriteriaHead>
			<CriteriaSub score={2}>วิธีการแก้ไขปัญหามีความเหมาะสม และมีแนวโน้มว่าสามารถทำได้จริงในปัจจุบัน กล่าวคือ สอดคล้องกับบริบท ทรัพยากร เวลาและศักยภาพ</CriteriaSub>
			<CriteriaSub score={1}>วิธีการแก้ไขปัญหายังไม่สอดคล้องกับสถานการณ์จริง หรือมีข้อจำกัดด้านทรัพยากร เวลา หรือศักยภาพ ทำให้มีความเป็นไปได้ต่ำที่จะนำไปปฏิบัติได้ในปัจจุบัน</CriteriaSub>
			<CriteriaSub score={0}>ไม่มีวิธีการแก้ไขปัญหา หรือเสนอแนวทางที่ไม่เหมาะสมและไม่สามารถนำไปปฏิบัติได้จริงในสถานการณ์ปัจจุบัน</CriteriaSub>

			<CriteriaHead2 score={3}>การแก้ปัญหาด้านจิตใจ</CriteriaHead2>
			<CriteriaSub score={3}>ตระหนักถึงปัญหาเกี่ยวกับสภาพจิตใจของเพื่อน และแก้ไขปัญหาอย่างเหมาะสม</CriteriaSub>
			<CriteriaSub score={2}>ตระหนักถึงปัญหาเกี่ยวกับสภาพจิตใจของเพื่อน และมีความพยายามช่วยเหลือหรือแก้ไขปัญหา แต่ยังไม่ต่อเนื่องหรือไม่เหมาะสมเพียงพอ</CriteriaSub>
			<CriteriaSub score={1}>ตระหนักถึงปัญหาเกี่ยวกับสภาพจิตใจของเพื่อน แต่ไม่แก้ไข</CriteriaSub>
			<CriteriaSub score={0}>ไม่ตระหนักถึงปัญหาเกี่ยวกับสภาพจิตใจของเพื่อน</CriteriaSub>

			<CriteriaHead2 score={4}>การให้เหตุผลในการแก้ไขปัญหา</CriteriaHead2>
			<CriteriaSub score={4}>สามารถอธิบายวิธีการแก้ไขปัญหาได้อย่างละเอียดและเข้าใจได้ง่าย มีเหตุและผล</CriteriaSub>
			<CriteriaSub score={3}>สามารถอธิบายวิธีการแก้ไขปัญหาได้พอเข้าใจได้ มีเหตุและผลในระดับพอใช้</CriteriaSub>
			<CriteriaSub score={2}>อธิบายวิธีการแก้ไขปัญหา มีการให้เหตุและผลอยู่ในระดับเข้าใจได้ยาก</CriteriaSub>
			<CriteriaSub score={1}>อธิบายวิธีการแก้ไขปัญหา แต่ไม่มีการให้เหตุและผล</CriteriaSub>
			<CriteriaSub score={0}>ไม่สามารถอธิบายวิธีการแก้ไขได้และไม่มีการให้เหตุและผล</CriteriaSub>

			<CriteriaWord />
			<CriteriaAI />
		</CriteriaBody>
	);
}

export function Criteria3(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead score={2}>การแก้ไขปัญหา</CriteriaHead>
			<CriteriaSub score={2}>มีวิธีการแก้ไขปัญหา</CriteriaSub>
			<CriteriaSub score={0}>ไม่การแก้ไขปัญหา</CriteriaSub>

			<CriteriaHead2 score={3}>วิธีการแก้ไขปัญหามีจริยธรรมและไม่เกินขอบเขตเนื้อเรื่อง</CriteriaHead2>
			<CriteriaSub score={3}>วิธีการแก้ไขปัญหาแบบปัญญาชน ไม่เกินขอบเขตของเนื้อเรื่อง และสามารถทำได้จริง</CriteriaSub>
			<CriteriaSub score={2}>วิธีการแก้ไขปัญหาแบบปัญญาชน สามารถทำได้จริง แต่เกินขอบเขตของเนื้อเรื่อง</CriteriaSub>
			<CriteriaSub score={1}>ไม่มีวิธีการแก้ไขปัญหาแบบปัญญาชน แต่ไม่เกินขอบเขตของเนื้อเรื่องและสามารถทำได้จริง</CriteriaSub>
			<CriteriaSub score={0}>ไม่มีวิธีการแก้ไขปัญหาแบบปัญญาชน เกินขอบเขตของเนื้อเรื่อง และไม่สามารถทำได้จริง</CriteriaSub>

			<CriteriaHead2 score={6}>การให้เหตุผลในการแก้ไขปัญหา</CriteriaHead2>
			<CriteriaSub score={6}>สามารถอธิบายแนวทางการแก้ไขปัญหาได้อย่างละเอียด ชัดเจน เข้าใจง่าย และมีการให้เหตุผลประกอบอย่างสมเหตุสมผล</CriteriaSub>
			<CriteriaSub score={4}>สามารถอธิบายแนวทางการแก้ไขปัญหาได้ในระดับพอใช้ มีการให้เหตุผลประกอบ แต่รายละเอียดหรือความชัดเจนยังไม่ครบถ้วน</CriteriaSub>
			<CriteriaSub score={2}>สามารถอธิบายแนวทางการแก้ไขปัญหาได้ แต่ยังขาดความละเอียดและการให้เหตุผลยังไม่ชัดเจน ทำให้เข้าใจได้ยากบางส่วน</CriteriaSub>
			<CriteriaSub score={0}>ไม่สามารถอธิบายแนวทางการแก้ไขปัญหา หรือไม่มีการให้เหตุผลประกอบ</CriteriaSub>

			<CriteriaHead2 score={3}>การให้เหตุผลในการแก้ไขปัญหา</CriteriaHead2>
			<CriteriaSub score={3}>เขียนอธิบายได้อย่างชัดเจน เป็นลำดับขั้น เข้าใจง่าย ไม่กำกวมและมีการแสดงกระบวนการคิดอย่างเหมาะสม</CriteriaSub>
			<CriteriaSub score={2}>เขียนอธิบายได้ในระดับพอใช้ เข้าใจได้ในภาพรวม มีลำดับขั้นบางส่วน แต่อาจยังไม่ละเอียดทั้งหมด</CriteriaSub>
			<CriteriaSub score={1}>มีการเขียนอธิบาย แต่ขาดเหตุผลรองรับ หรือไม่แสดงกระบวนการคิดอย่างชัดเจน</CriteriaSub>
			<CriteriaSub score={0}>ไม่สามารถเขียนอธิบายได้อย่างชัดเจน ข้อความกำกวม เข้าใจได้ยากและไม่แสดงลำดับขั้นหรือกระบวนการคิด</CriteriaSub>

			<CriteriaWord />
			<CriteriaAI />
		</CriteriaBody>
	);
}

export function Criteria4(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead score={6}>การสื่อสาร</CriteriaHead>
			<CriteriaSub score={6}>สามารถอธิบายให้ลูกค้าเข้าใจได้อย่างละเอียดและเข้าใจได้ง่าย มีเหตุและผล และไม่ใช้คำหยาบคาย/ความรุนแรง/คำพูดเสียดสีถากถาง</CriteriaSub>
			<CriteriaSub score={4}>สามารถอธิบายให้ลูกค้าเข้าใจได้ มีเหตุและผลในระดับพอใช้ อาจมีการใช้คำพูดเหน็บแนม แต่ไม่มีการใช้คำหยาบคาย/ความรุนแรง</CriteriaSub>
			<CriteriaSub score={2}>อธิบายให้ลูกค้าเข้าใจได้ยาก การให้เหตุและผลอยู่ในระดับเข้าใจได้ยาก มีการใช้คำพูดเหน็บแนมหรือมีการใช้คำหยาบคาย/ความรุนแรง</CriteriaSub>
			<CriteriaSub score={0}>ไม่สามารถอธิบายให้ลูกค้าได้ ไม่มีการให้เหตุและผล มีการใช้คำพูดเหน็บแนมและมีการใช้ คำหยาบคาย/ความรุนแรง</CriteriaSub>

			<CriteriaHead2 score={3}>การเรียบเรียง</CriteriaHead2>
			<CriteriaSub score={3}>เขียนอธิบายได้อย่างดี เข้าใจง่าย ไม่วกวน</CriteriaSub>
			<CriteriaSub score={2}>เขียนอธิบายได้พอใช้ เข้าใจได้ง่าย</CriteriaSub>
			<CriteriaSub score={1}>เขียนอธิบายแต่ไม่มีการให้เหตุผลรองรับ</CriteriaSub>
			<CriteriaSub score={0}>เขียนอธิบายไม่ได้เลย เข้าใจได้ยาก เขียนวนกวนไม่มี Step กระบวนการคิด</CriteriaSub>

			<CriteriaWord />
			<CriteriaAI />
		</CriteriaBody>
	);
}

export function Criteria5(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead score={1}>เลือกสัตว์ได้ครบถ้วน</CriteriaHead>
			<CriteriaSub score={1}>เลือกสัตว์ได้ครบ 2 ชนิด</CriteriaSub>
			<CriteriaSub score={0}>เลือกสัตว์ไม่ครบ 2 ชนิด หรือมากกว่า 2 ชนิด</CriteriaSub>

			<CriteriaHead2 score={3}>การให้เหตุผลในการเลือกความสามารถของสัตว์</CriteriaHead2>
			<CriteriaSub score={3}>มีการให้เหตุผลในการเลือกชัดเจน ครบถ้วน และครอบคลุมสัตว์ทั้ง 2 ชนิด</CriteriaSub>
			<CriteriaSub score={2}>มีการให้เหตุผลในการเลือกพอสมควร แต่รายละเอียดหรือความเชื่อมโยงกับสถานการณ์ยังไม่ชัดเจนบางส่วน</CriteriaSub>
			<CriteriaSub score={1}>มีการให้เหตุผลในการเลือก แต่ยังคลุมเครือ ขาดความชัดเจน หรืออธิบายไม่เชื่อมโยงกับสถานการณ์อย่างเหมาะสม</CriteriaSub>
			<CriteriaSub score={0}>ไม่มีการให้เหตุผลในการเลือก</CriteriaSub>

			<CriteriaHead2 score={1}>ความสามารถของสัตว์ที่เลือกมีจริง</CriteriaHead2>
			<CriteriaSub score={1}>ความสามารถของสัตว์ที่เลือกมีจริง</CriteriaSub>
			<CriteriaSub score={0}>ความสามารถของสัตว์ที่เลือกไม่มีจริง</CriteriaSub>

			<CriteriaHead2 score={7}>เชื่อมโยงความสามารถกับสถานการณ์</CriteriaHead2>
			<CriteriaSub score={7}>เชื่อมโยงความสามารถของสัตว์กับสถานการณ์ได้ครบทั้ง 3 สถานที่อย่างเหมาะสม มีเหตุผล และใช้ความสามารถได้อย่างครบถ้วน</CriteriaSub>
			<CriteriaSub score={5}>เชื่อมโยงความสามารถของสัตว์กับสถานการณ์ได้ครบทั้ง 3 สถานที่ และใช้ความสามารถได้ในระดับพอใช้ แม้บางส่วนยังไม่ชัดเจน</CriteriaSub>
			<CriteriaSub score={3}>เชื่อมโยงความสามารถของสัตว์กับสถานการณ์ได้ครบทั้ง 3 สถานที่ แต่การใช้ความสามารถยังขาดความสมเหตุสมผล</CriteriaSub>
			<CriteriaSub score={1}>เชื่อมโยงความสามารถของสัตว์กับสถานการณ์ได้ไม่ครบทั้ง 3 สถานที่ และการใช้ความสามารถยังไม่สมเหตุสมผล</CriteriaSub>
			<CriteriaSub score={0}>ไม่มีการเชื่อมโยงความสามารถของสัตว์กับสถานการณ์ และไม่มีการนำความสามารถมาใช้แก้ปัญหา</CriteriaSub>

			<CriteriaHead2 score={3}>ความคิดสร้างสรรค์</CriteriaHead2>
			<CriteriaSub score={3}>แนวทางการแก้ไขปัญหามีความคิดสร้างสรรค์</CriteriaSub>
			<CriteriaSub score={0}>แนวทางการแก้ไขปัญหาไม่มีความคิดสร้างสรรค์</CriteriaSub>

			<CriteriaHead2 score={3}>การเรียบเรียง</CriteriaHead2>
			<CriteriaSub score={3}>อธิบายได้อย่างดี เข้าใจง่าย ชัดเจน ไม่วกวน</CriteriaSub>
			<CriteriaSub score={2}>อธิบายได้ค่อนข้างชัดเจน เข้าใจง่าย แต่อาจยังมีบางส่วนที่ไม่ละเอียด</CriteriaSub>
			<CriteriaSub score={1}>อธิบายได้พอใช้ เข้าใจได้บางส่วน แต่ยังขาดความชัดเจน หรือมีความวกวน</CriteriaSub>
			<CriteriaSub score={0}>อธิบายไม่ได้เลย เข้าใจได้ยาก เขียนกำกวม</CriteriaSub>

			<CriteriaWord />

			<CriteriaHead2 score={1}>โบนัส</CriteriaHead2>
			<CriteriaSub score={1}>มีความแปลกใหม่ ไม่ซ้ำกับคำตอบอื่น</CriteriaSub>
			<CriteriaSub score={0}>ไม่มีความแปลกใหม่</CriteriaSub>

			<CriteriaAI />
		</CriteriaBody>
	);
}

export function Criteria6(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead score={4}>การอธิบายความสำคัญและการให้เหตุผล</CriteriaHead>
			<CriteriaSub score={4}>สามารถอธิบายความสำคัญของการเข้าศึกษาต่อในระดับมหาวิทยาลัย สาขาวิศวกรรมคอมพิวเตอร์ได้อย่างละเอียด ชัดเจน เข้าใจง่าย และมีการให้เหตุผลสนับสนุนอย่างสมเหตุสมผล</CriteriaSub>
			<CriteriaSub score={3}>สามารถอธิบายความสำคัญของการเข้าศึกษาต่อในระดับมหาวิทยาลัย สาขาวิศวกรรมคอมพิวเตอร์ได้ค่อนข้างชัดเจน เข้าใจได้ในภาพรวม และมีการให้เหตุผลในระดับพอใช้</CriteriaSub>
			<CriteriaSub score={2}>สามารถอธิบายความสำคัญของการเข้าศึกษาต่อในระดับมหาวิทยาลัย สาขาวิศวกรรมคอมพิวเตอร์ได้ แต่การเรียบเรียงหรือเหตุผลยังไม่ชัดเจน ทำให้เข้าใจได้ยาก</CriteriaSub>
			<CriteriaSub score={1}>กล่าวถึงความสำคัญของการเข้าศึกษาต่อในระดับมหาวิทยาลัย สาขาวิศวกรรมคอมพิวเตอร์ แต่ไม่มีการให้เหตุผลประกอบอย่างชัดเจน</CriteriaSub>
			<CriteriaSub score={0}>ไม่สามารถอธิบายความสำคัญของการเข้าศึกษาต่อในระดับมหาวิทยาลัย สาขาวิศวกรรมคอมพิวเตอร์ หรือไม่ตอบคำถาม</CriteriaSub>

			<CriteriaHead2 score={2}>การกล่าวถึงสิ่งที่อินเทอร์เน็ตให้ไม่ได้</CriteriaHead2>
			<CriteriaSub score={2}>มีการกล่าวถึงสิ่งที่อินเทอร์เน็ตให้ไม่ได้ และมีการให้เหตุผลประกอบ</CriteriaSub>
			<CriteriaSub score={1}>มีการกล่าวถึงสิ่งที่อินเทอร์เน็ตให้ไม่ได้ แต่ไม่มีการให้เหตุผลประกอบ</CriteriaSub>
			<CriteriaSub score={0}>ไม่มีการกล่าวถึงสิ่งที่อินเทอร์เน็ตให้ไม่ได้ และไม่มีการให้เหตุผลประกอบ</CriteriaSub>

			<CriteriaHead2 score={1}>การเรียบเรียง</CriteriaHead2>
			<CriteriaSub score={1}>เขียนอธิบายได้อย่างดี เข้าใจง่าย ไม่วกวน</CriteriaSub>
			<CriteriaSub score={0}>เขียนอธิบายไม่ได้เลย เข้าใจได้ยาก เขียนวกวน</CriteriaSub>

			<CriteriaHead2 score={1}>ความสอดคล้องกับความเป็นจริง</CriteriaHead2>
			<CriteriaSub score={1}>คำตอบสอดคล้องกับความเป็นจริง</CriteriaSub>
			<CriteriaSub score={0}>คำตอบไม่สอดคล้องกับความเป็นจริง</CriteriaSub>

			<CriteriaWord />

			<CriteriaHead2 score={1}>โบนัส</CriteriaHead2>
			<CriteriaSub score={1}>มีการกล่าวถึง CPE KMUTT</CriteriaSub>
			<CriteriaSub score={0}>ไม่มีการกล่าวถึง CPE KMUTT</CriteriaSub>

			<CriteriaAI />
		</CriteriaBody>
	);
}

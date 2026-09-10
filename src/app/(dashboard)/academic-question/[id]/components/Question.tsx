import { ChevronDown } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Collapsible } from "@/components/Collapsible";
import { getSectionDisplayName } from "../../column";

export function Question1({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">1.</div>{" "}
				<div>
					ให้น้องอธิบายลำดับขั้นตอนการทำงานของโปรแกรมที่ใช้หา จำนวนเฉพาะ (เลขที่มากกว่า 1 และไม่มีเลขใดหารลงตัวนอกจาก 1 กับตัวมันเอง) ทั้งหมดที่อยู่ระหว่างค่า A ถึง B (รวม A และ B ด้วย) โดยต้องแสดงเลขที่เจอทั้งหมดเรียงจากน้อยไปหามาก หากไม่เจอเลยให้ตอบว่า NONE
					และบรรทัดสุดท้ายต้องแสดง ผลรวม ของเลขเหล่านั้นด้วย เช่น เมื่อ{" "}
				</div>
			</div>
			<div className="flex flex-col mt-4 ml-14">
				<div className="flex flex-row items-baseline">
					<div className="text-lg mr-3">1)</div>
					<div className="text-base">A เป็น 1 และ B เป็น 10 คำตอบบรรทัดแรกจะเป็น 2 3 5 7 และคำตอบบรรทัดที่สองจะเป็น 17</div>
				</div>
				<div className="flex flex-row items-baseline mt-2">
					<div className="text-lg mr-3">2)</div>
					<div className="text-base">
						A เป็น 8 และ B เป็น 10 คำตอบบรรทัดแรกจะเป็น <span className="font-bold">NONE</span> และคำตอบบรรทัดที่สองจะเป็น 0
					</div>
				</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question2({ answer1, answer2, answer3 }: { answer1: string; answer2: string; answer3: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">2.</div> <div>จงตอบคำถามต่อไปนี้หากน้องต้องการเขียนโปรแกรมเพื่อเก็บข้อมูลนักเรียน 1 คน ซึ่งประกอบด้วยข้อมูลดังนี้</div>
			</div>
			<div className="flex flex-col mt-4 ml-14">
				<div className="flex flex-row items-baseline">
					<div className="text-lg mr-3">1)</div>
					<div className="text-base">ชื่อนักเรียน เช่น "Somchai" </div>
				</div>
				<div className="flex flex-row items-baseline mt-2">
					<div className="text-lg mr-3">2)</div>
					<div className="text-base">อายุ เช่น 15</div>
				</div>
				<div className="flex flex-row items-baseline mt-2">
					<div className="text-lg mr-3">3)</div>
					<div className="text-base">สถานะโรคประจำตัว คือมีและไม่มี</div>
				</div>
				<div className="flex flex-row items-baseline mt-2">
					<div className="text-lg mr-3">4)</div>
					<div className="text-base">น้ำหนัก เช่น 48.5</div>
				</div>
			</div>
			<div className="flex flex-col mt-4 ">
				<div className="flex flex-row items-baseline">
					<div className="text-lg mr-3">2.1)</div>
					<div className="text-base">ข้อมูลแต่ละประเภทควรใช้ชนิดข้อมูลอะไรในภาษา C เพราะเหตุใด จงอธิบาย</div>
				</div>
				<div className="flex flex-row items-baseline mt-2">
					<div className="text-lg mr-3">2.2)</div>
					<div className="text-base">หากน้ำหนักมีทศนิยมที่ละเอียดมากควรปรับเปลี่ยนชนิดของข้อมูลหรือไม่ อย่างไร</div>
				</div>
				<div className="flex flex-row items-baseline mt-2">
					<div className="text-lg mr-3">2.3)</div>
					<div className="text-base">จงยกตัวอย่างสิ่งที่อาจจะเกิดขึ้นได้หากใช้ชนิดข้อมูลผิดรูปแบบมาอย่างน้อยหนึ่งข้อ</div>
				</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="text-3xl mr-3">2.1</div>
				<div className="mr-3 text-base font-bold underline">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer1}</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="text-3xl mr-3">2.2</div>
				<div className="mr-3 text-base font-bold underline">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer2}</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="text-3xl mr-3">2.3</div>
				<div className="mr-3 text-base font-bold underline">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer3}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question3({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">3.</div>{" "}
				<div>ในภาษา C เมื่อเราต้องการเก็บข้อมูลชนิดเดียวกันหลาย ๆ ตัว เราจะใช้โครงสร้างข้อมูลชนิดหนึ่งซึ่งเราต้องระบุขนาดของมันไว้ตั้งแต่ตอนประกาศตัวแปร หากน้อง ๆ ระบุขนาดของโครงสร้างข้อมูลชนิดนี้ไว้ 5 แต่พยายามใส่ข้อมูลตำแหน่งที่ 6 ลงไปจะเกิดอะไรขึ้น เพราะเหตุใด จงอธิบายโดยละเอียด </div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question4({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">4.</div> <div>ในความคิดของน้อง ทำไมเราถึงต้องเรียนภาษา C แม้ว่าจะมีภาษาอื่น ๆ บนโลกอีกมากมาย</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question5({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">5.</div>{" "}
				<div>
					น้องคิดว่า “Microcontroller” คืออะไร และเคยมีประสบการณ์อะไรเกี่ยวกับ Microcontroller มาบ้าง <span className="font-bold">หมายเหตุ ถ้าน้องไม่รู้จักหรือไม่เคยมีประสบการณ์ให้ตอบตามความเป็นจริงได้เลย</span>
				</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question6({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">6.</div>{" "}
				<div>ในการทำงานร่วมชิ้นงานที่มีความจำเป็นต้องใช้ Micro:bit หากเราได้ทำการตรวจสอบแล้วว่าโค้ดที่ได้ทำการเขียนขึ้นมาถูกต้องสมบูรณ์แล้ว แต่เมื่อทำนำ Micro:bit เชื่อมต่อสายไฟเข้ากับมอเตอร์จริง ๆ มอเตอร์กลับไม่ทำงาน จากสถานะการณ์เบื้องต้นน้องคิดว่าปัญหาน่าจะเกิดจากอะไรได้บ้าง?</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question7({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">7.</div>{" "}
				<div>
					น้องจะต้องบังคับหุ่นยนต์ให้เก็บซากหุ่นต่าง ๆ ในพื้นที่ ไปไว้ที่จุด Checkpoint 2 จุดที่แตกต่างกันสำหรับหุ่นยนต์แต่ละประเภท ถ้าหากวางในที่ที่ผิดประเภท จะโดนหักคะแนน โดยจะเก็บครั้งละกี่ตัวก็ได้ และจะต้องเก็บให้ได้มากที่สุดภายในระยะเวลาที่จำกัด (ขยะชิ้นใหญ่และขยะชิ้นเล็กจะได้คะแนนแตกต่างกัน
					ขยะชิ้นใหญ่จะได้คะแนนมากกว่าชิ้นเล็ก แต่ถ้าวางชิ้นใหญ่ผิดประเภทก็จะลบคะแนนมากกว่าเช่นกัน)
					<div className="font-bold indent-10 mt-2">พี่ ๆ มีหุ่นยนต์มาให้น้องเลือก 2 ตัว ในการเอาไปทำภารกิจ เก็บซากหุ่นยนต์ โดยให้น้องเลือกหุ่นยนต์ตัวใดตัวหนึ่ง และอธิบายว่าทำไมน้องถึงเลือกหุ่นยนต์ตัวนั้น รวมถึงวิธีการที่น้องจะทำภารกิจนี้ให้สำเร็จ</div>
				</div>
			</div>
			<div className="grid grid-cols-2 mt-5 gap-x-5">
				<div className="flex flex-col col-span-1">
					<div className="font-bold text-base">หุ่นยนต์ A</div>
					<div className="text-sm">Code name: สาส์นจากสวรรค์หุ่นยนต์ผู้ซึ่งปลดแอกจากการจองจำของปีศาจจากขุมนรก</div>
				</div>
				<div className="flex flex-col col-span-1">
					<div className="font-bold text-base">หุ่นยนต์ B</div>
					<div className="text-sm">Code name: ราชาปีศาจหุ่นยนต์ผู้ซึ่งทำลายล้างทุกสิ่งผู้ที่ปกครองทุกอย่างผู้ที่เกิดมาเพื่อสร้างความโกลาหลแก่โลกใบนี้</div>
				</div>
				<img className="w-full rounded-lg mt-3 col-span-1" src="https://storage.comcamp.io/web-assets/exam/robotA.png" alt="หุ่นยนต์ A" />
				<img className="w-full rounded-lg mt-3 col-span-1" src="https://storage.comcamp.io/web-assets/exam/robotB.png" alt="หุ่นยนต์ B" />
			</div>
			<div className="text-sm mt-7 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question8({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">8.</div> <div>ในความคิดของน้อง AI คืออะไร เเละ AI ถูกสร้างขึ้นมาเพื่ออะไร</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question9({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">9.</div>{" "}
				<div>
					สมมุติว่าน้องได้ทำการสร้าง AI ผ่านกระบวนการ Machine learning ขึ้นมาตัวหนึ่งเพื่อช่วยในการเเยกขยะ ก่อนนำไปรีไซเคิลเเต่ในขั้นตอนการทดสอบกลับพบว่า AI ตรวจจับขวดน้ำที่ทำจากเเก้วว่าเป็นขวดที่ทำจาก พลาสติก เมื่อทำการตรวจสอบปัญหาพบว่าส่วนของ Hardware (เช่น กล้อง)
					ไม่มีส่วนเกี่ยวข้องกับปัญหาในครั้งนี้ น้องคิดว่าที่มาของปัญหาในครั้งนี้คืออะไร เเละน้องจะมีเเนวทางเเก้ปัญหาอย่างไรเพื่อให้ AI สามารถตรวจสอบเเละเเยกขวดเเก้วออกจากขวดพลาสติกได้
				</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question10({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">10.</div> <div>ในความคิดของน้อง น้องคิดว่าการเรียนรู้ของ AI นั้นเหมือนกับมนุษย์หรือไม่ อย่างไร</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

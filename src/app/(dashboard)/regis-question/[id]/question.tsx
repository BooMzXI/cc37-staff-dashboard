import React from "react";

export function Question1({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
				<div className="font-normal text-base flex flex-row items-baseline">
					<div className="text-3xl mr-3">1.</div> <div>น้องคาดหวังอะไรจากค่ายน้องคาดหวังอะไรจากค่าย</div>
				</div>
				<div className="text-sm mt-5 flex flex-row items-baseline">
					<div className="mr-3 text-base font-bold">ตอบ</div>
					<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
				</div>
				<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question2({ answer }: { answer: string }): React.JSX.Element {
	return (
		<div className="flex flex-col mt-10">
				<div className="font-normal text-base flex flex-row items-baseline">
					<div className="text-3xl mr-3">2.</div>{" "}
					<div>น้องได้เข้าร่วมการแข่งขันซึ่งต้องทำ Project เป็นทีม ทีมละ 5 คน โดยที่สมาชิกในทีมไม่เคยรู้จักกันมาก่อน ในกลุ่มมีสมาชิกคนหนึ่งที่มีความสามารถสูงกว่าเพื่อน ๆ เขาทำงานทุกอย่างแทนเพื่อนในกลุ่ม ส่งผลให้เพื่อนที่เหลือ รวมถึงตัวน้องรู้สึกว่าไม่ได้มีส่วนร่วมในการทำงาน</div>
				</div>
				<div className="font-normal text-base mt-3">ในฐานะที่น้องเป็นหนึ่งในสมาชิกกลุ่ม น้องจะมีวิธีการแก้ปัญหาอย่างไร จงอธิบาย</div>
				<div className="text-sm mt-5 flex flex-row items-baseline">
					<div className="mr-3 text-base font-bold">ตอบ</div>
					<div className="break-all w-full text-base text-[#7b7b7b]">{answer}</div>
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
					<div>
						มดน้อยได้รับโอกาสเข้าไปเป็นมดฝึกงานในรังที่มดน้อยใฝ่ฝัน โดยราชินีมดมีอำนาจสูงสุด แต่เมื่อเริ่มงานมดน้อยกลับพบปัญหากับหัวหน้ามดงานซึ่งเป็นที่โปรดปรานของราชินี โดยหัวหน้ามดงานตัวนั้นมีพฤติกรรมเอารัดเอาเปรียบ รวมไปถึงการมอบหมายงานเกินกว่าขอบเขตที่ระบุไว้ในสัญญา นอกจากนี้
						ยังได้ค่าจ้างซึ่งเป็นจำนวนน้ำตาลที่ไม่เหมาะสมกับขอบเขตของงานที่ทำ แม้มดน้อยจะรู้สึกว่าสิ่งนี้ไม่ยุติธรรมและไม่โปร่งใส แต่หัวหน้ามดงานดังกล่าวเป็นผู้ประเมินผลการฝึกงาน ซึ่งอาจส่งผลต่ออนาคตของมดน้อย
					</div>
				</div>
				<div className="font-normal text-base mt-3">หากน้องเป็นมดน้อยตัวนั้น น้องจะตัดสินใจและรับมือกับสถานการณ์นี้อย่างไร</div>
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
					<div className="text-3xl mr-3">4.</div>{" "}
					<div>
						ทีมพัฒนาเทคโนโลยีของบริษัทแห่งหนึ่งได้รับข้อเสนอให้พัฒนาระบบการจัดการโรงแรมโดยใช้ AI ซึ่งทีมจะต้องพัฒนาระบบ AI ที่มีความซับซ้อน มีขอบเขตงานขนาดใหญ่ และต้องใช้ทรัพยากรจำนวนมาก จึงทำให้ค่าใช้จ่ายของโครงการค่อนข้างสูง ในขณะเดียวกัน
						ลูกค้ายังไม่มีความรู้และความเข้าใจด้านระบบเทคโนโลยีมากนัก
					</div>
				</div>
				<div className="font-normal text-base mt-3">น้องจะสื่อสารให้ลูกค้าที่ไม่มีความรู้เรื่องเทคโนโลยีน้อยสามารถเข้าใจสิ่งที่ทีมพัฒนาทำอย่างไร เพื่อให้โครงการนี้สามารถดำเนินการต่อไปได้</div>
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
					<div className="text-3xl mr-3">5.</div> <div>น้องจะต้องเดินทางเพื่อออกตามหากุญแจ 2 ดอก เพื่อนำไปเปิดกล่องสมบัติชิ้นสุดท้ายของตระกูลที่ถูกโจรสลัดขโมยไปเมื่อหลายสิบปีก่อน</div>
				</div>
				<div className="font-normal text-base mt-3">โดยน้องจะต้องเดินทางไปยัง 3 สถานที่ตามลำดับ ดังนี้</div>
				<div className="flex flex-row mt-1 items-center">
					<div className="mx-3">1.</div>ป่าดงดิบ
				</div>
				<div className="flex flex-row mt-1 items-center">
					<div className="mx-3">2.</div>ทะเลทราย
				</div>
				<div className="flex flex-row mt-1 items-center">
					<div className="mx-3">3.</div>ใต้มหาสมุทร
				</div>
				<div className="font-normal text-base mt-3">รายละเอียดภารกิจ :</div>
				<div className="flex flex-row mt-1 items-center">
					<div className="mx-3 w-[5px] h-[5px] bg-white rounded-full"></div>กุญแจดอกที่ 1: อยู่ที่กระท่อมของแม่มดในป่าดงดิบ ซึ่งมีการร่ายเวทพรางตาที่มองไม่เห็นด้วยตาเปล่า
				</div>
				<div className="flex flex-row mt-1 items-center">
					<div className="mx-3 w-[5px] h-[5px] bg-white rounded-full"></div>กุญแจดอกที่ 2: อยู่ในโลงศพฟาโรห์ ชั้นใต้ดินของพีระมิดในทะเลทราย ซึ่งมีกับดักธนูอาบยาพิษรอทำงานอยู่
				</div>
				<div className="flex flex-row mt-1 items-center">
					<div className="mx-3 w-[5px] h-[5px] bg-white rounded-full"></div>กล่องสมบัติ : อยู่ในซากเรืออัปปางใต้มหาสมุทรที่มีกระแสน้ำแปรปรวนอย่างรุนแรง
				</div>
				<div className="font-normal text-base mt-3">เงื่อนไขเพิ่มเติม:</div>
				<div className="font-normal text-base mt-1 ml-6">น้องต้องเลือกความสามารถของสัตว์ที่มีอยู่จริงและยังไม่สูญพันธุ์ทั้งหมด 2 ชนิด (เลือกได้กี่ความสามารถก็ได้จากสัตว์ชนิดนั้น)</div>
				<div className="font-normal text-base text-[#7b7b7b] ml-6">เช่น "มดสามารถปล่อยฟีโรโมนและปล่อยพิษได้"</div>
				<div className="font-normal text-base mt-3">จงอธิบายเหตุผลในการเลือกสัตว์ ความสามารถ และวิธีการนำไปใช้แก้ปัญหาอย่างชัดเจน</div>
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
					<div>
						ในปัจจุบันความรู้ด้านคอมพิวเตอร์สามารถเรียนรู้ได้ผ่านช่องทางออนไลน์ได้อย่างอิสระ อย่างไรก็ตาม น้องคิดว่าทำไมการเข้าศึกษาต่อในระดับอุดมศึกษา สาขาวิศวกรรมคอมพิวเตอร์จึงยังมีความสำคัญ AI ซึ่งทีมจะต้องพัฒนาระบบ AI ที่มีความซับซ้อน มีขอบเขตงานขนาดใหญ่ และต้องใช้ทรัพยากรจำนวนมาก
						จึงทำให้ค่าใช้จ่ายของโครงการค่อนข้างสูง ในขณะเดียวกัน ลูกค้ายังไม่มีความรู้และความเข้าใจด้านระบบเทคโนโลยีมากนัก
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

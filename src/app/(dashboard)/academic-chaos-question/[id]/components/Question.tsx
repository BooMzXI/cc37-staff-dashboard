import { ChevronDown } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Collapsible } from "@/components/Collapsible";
import { getSectionDisplayName } from "../../column";

export function Question1({ answer1, answer2 }: { answer1: string; answer2: string }): React.JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">1.</div>
				<div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-baseline w-full">
					<div className="text-lg font-bold">คำสาปสามสีแห่งจอมมาร</div>
					<button type="button" className="mt-4 py-2 px-3 w-fit hover:bg-white/20 rounded-lg duration-300 active:bg-white/40 text-sm flex flex-row" onClick={() => setIsOpen((prev) => !prev)}>
						<ChevronDown className={`mr-3 duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
						เเสดงรายละเอียดตำถาม
					</button>
				</div>
			</div>
			<Collapsible open={isOpen}>
				<div className="text-sm indent-7 mt-2">
					น้องคือผู้กล้าที่อาสามาช่วยเหลือชาวเมืองที่ถูก “พ่อมดศาสตร์มืด” ยึดครอง น้องและประชาชนรวมทั้งหมด 100 คน ถูกจับตัวไปยังลานพิธีกรรมและถูกร่ายเวทย์คำสาปใส่ทีละคน โดยทุกคนจะโดนสาปให้ที่คอมีอักขระต้องสาปปรากฏขึ้น เป็นสีใดสีหนึ่งใน 3 สีนี้เท่านั้น คือ สีแดง, สีเขียว, หรือ สีน้ำเงิน (สุ่มเกิดได้ทั้ง 3
					สี) และเงื่อนไขมรณะมีดังนี้ :
				</div>
				<div className="mt-2 flex flex-col">
					<div className="flex flex-row items-baseline">
						<div className="p-1 bg-white rounded-full mx-5"></div>
						<div className="break-words text-sm">ทุกคนจะยืนเรียงแถวตอนลึกและถูกเวทย์ตรึงร่างกายไว้ ทำให้มองเห็นได้แค่อักขระของคนด้านหน้า ทั้งหมด แต่ไม่สามารถหันหลังหรือมองอักขระของตนเองได้</div>
					</div>
					<div className="flex flex-row items-baseline">
						<div className="p-1 bg-white rounded-full mx-5"></div>
						<div className="break-words text-sm">เมื่อพิธีกรรมเริ่มขึ้น คนที่โดนคำสาปจะต้องตะโกน “ชื่อสี” อักขระของตนเองออกมาทีละคน เริ่มจากคนท้ายแถว (คนที่มองเห็นเพื่อนทุกคน) ไล่ไปจนถึงคนแรกสุด</div>
					</div>
					<div className="flex flex-row items-baseline">
						<div className="p-1 bg-white rounded-full mx-5"></div>
						<div className="break-words text-sm">หากตอบถูก คำสาปจะสลายไป แต่หากตอบผิด คำสาปจะระเบิดและคร่าชีวิตคนคนนั้นทันที</div>
					</div>
					<div className="flex flex-row items-baseline">
						<div className="p-1 bg-white rounded-full mx-5"></div>
						<div className="break-words text-sm">พ่อมดอนุญาตให้พวกน้องและชาวเมือง “วางแผนนัดแนะรหัสลับ” กันได้ ก่อนที่จะถูกจับไปเข้าแถวและร่ายเวทย์คำสาปใส่</div>
					</div>
				</div>
			</Collapsible>
			<div className="flex flex-col items-baseline mt-4">
				<div className="font-semibold mb-2 underline">คำถาม:</div>
				<div className="text-sm">
					ให้น้องอธิบายวิธีการ (Method) หรือ อัลกอริทึม (Algorithm) ที่น้องจะนัดแนะกับชาวเมือง เพื่อให้มีคนรอดชีวิตมากที่สุดเท่าที่จะทำได้ พร้อมบอกเหตุผล <span className="text-red-600">(ห้ามใช้ AI ในการตอบคำถาม ให้ตอบตามความเข้าใจของน้อง)</span>
				</div>
			</div>
			<div className="flex flex-col items-baseline mt-4">
				<div className="font-semibold mb-2 underline">ตัวอย่างคำตอบ :</div>
				<div className="text-sm">
					วิธีการคือให้ผู้กล้าที่ยืนอยู่ท้ายแถว มองสีอักขระของเพื่อนคนที่ยืนอยู่ข้างหน้าตัวเองเพียงคนเดียว ถ้าเห็นว่าเพื่อนข้างหน้าเป็นสีอะไร ก็ให้ตะโกนตอบสีนั้นออกมาเลย เช่น ถ้าเห็นเพื่อนข้างหน้าเป็นสีแดง ก็ให้ตอบว่า “แดง” ส่วนเพื่อนคนอื่น ๆ ในแถวก็ให้ทำเหมือนกัน คือให้มองสีของคนที่อยู่ข้างหน้าเรา
					แล้วตอบตามสีที่เราเห็นไปเรื่อย ๆ จนครบทุกคน
				</div>
			</div>
			<div className="text-sm mt-4">
				เหตุผลที่เลือกวิธีนี้เพราะคิดว่าพ่อมดน่าจะจัดคนที่มีสีเดียวกันให้ยืนอยู่ติด ๆ กันเป็นกลุ่ม ๆ เพื่อความสวยงาม หรือถ้าเป็นการสุ่ม ก็น่าจะมีโอกาสสูงที่คนยืนติดกันจะเป็นสีเดียวกัน วิธีนี้จึงเป็นวิธีที่ง่ายที่สุดและไม่ต้องคิดเลขให้ปวดหัว แค่เชื่อมั่นในเพื่อนข้างหน้าก็พอ คาดว่าน่าจะมีคนรอดประมาณ 30-40 คน
				ขึ้นอยู่กับดวงว่าพ่อมดเรียงสีมาแบบไหน
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="mr-3 text-base font-bold underline">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer1}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

export function Question2({ answer1, answer2, answer3 }: { answer1: string; answer2: string; answer3: string }): React.JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">2.</div>
				<div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-baseline w-full">
					<div className="text-lg font-bold">หอคอยสัญญาณอัฉริยะ</div>
					<button type="button" className="mt-4 py-2 px-3 w-fit hover:bg-white/20 rounded-lg duration-300 active:bg-white/40 text-sm flex flex-row" onClick={() => setIsOpen((prev) => !prev)}>
						<ChevronDown className={`mr-3 duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
						เเสดงรายละเอียดตำถาม
					</button>
				</div>
			</div>
			<Collapsible open={isOpen}>
				<div className="text-sm indent-7 mt-2">
					ในเมืองแห่งหนึ่งมีระบบป้องกันภัยพิบัติที่ทำงานด้วย <span className="font-semibold">"หอคอยสัญญาณอัฉริยะ"</span> 3 หอคอย ได้แก่ <span className="font-semibold">หอคอย X, หอคอย Y และ หอคอย Z</span> ทั้งสามหอคอยต้องช่วยกันปล่อยโล่พลังงานเพื่อป้องกันเมือง
					โดยแต่ละหอคอยมี 3 สถานะ คือ
				</div>
				<div className="flex flex-col items-center mt-4">
					<div className="text-sm mt-1">
						🔵 <span className="font-semibold">Blue (ป้องกันปกติ)</span> ใช้พลังงานต่ำ
					</div>
					<div className="text-sm mt-1">
						🟡 <span className="font-semibold">Yellow (เฝ้าระวัง)</span> ใช้พลังงานปานกลาง
					</div>
					<div className="text-sm mt-1">
						🔴 <span className="font-semibold">Red (จู่โจม)</span> ใช้พลังงานสูง
					</div>
				</div>
				<div className="flex flex-col items-baseline mt-4">
					<div className="font-semibold mb-2 underline">กฎการทำงานของระบบ (System Logic)</div>
					<div className="flex flex-col">
						<div className="flex flex-row text-sm">
							<div className="mx-5">1.</div>
							<div>
								<span className="font-semibold">กฎความเสถียร (Stability Rule)</span> หอคอยที่อยู่ติดกัน (X - Y และ Y - Z) <span className="text-red-600">ห้าม</span> มีสถานะเป็น 🔴 Red พร้อมกันเด็ดขาด เพราะจะทำให้ระบบไฟลัดวงจร
							</div>
						</div>
						<div className="flex flex-row text-sm mt-2">
							<div className="mx-5">2.</div>
							<div className="flex flex-col">
								<span className="font-semibold">กฎการตอบสนอง (Response Rule)</span>
								<div className="ml-5 mt-2">
									<span className="text-sm font-semibold">หอคอย X </span>จะเปลี่ยนสถานะตาม "เซ็นเซอร์ตรวจจับฝน" เสมอ (ถ้าฝนตก X จะเป็น 🟡, ถ้าพายุเข้า X จะเป็น 🔴)
								</div>
								<div className="ml-5 mt-2">
									<span className="text-sm font-semibold">หอคอย Y </span>จะต้องเปลี่ยนสถานะตามสถานะ <span className="font-semibold">ก่อนหน้า</span> ของหอคอย X เสมอ (เช่น ถ้านาทีก่อนหน้า X เป็น 🟡 นาทีนี้ Y ต้องเปลี่ยนเป็น 🟡)
								</div>
								<div className="ml-5 mt-2">
									<span className="text-sm font-semibold">หอคอย Z </span>จะมีสถานะที่ ตรงข้าม กับสถานะปัจจุบันของหอคอย Y เสมอ (ถ้า Y เป็น 🔵, Z ต้องเป็น 🔴 / ถ้า Y เป็น 🔴, Z ต้องเป็น 🔵 / ถ้า Y เป็น 🟡, Z ต้องเป็น 🟡 เหมือนกัน)
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-baseline mt-4">
					<div className="font-semibold mb-2 underline">สถานะการจำลอง</div>
					<div className="flex flex-row items-baseline">
						<div className="p-1 bg-white rounded-full mx-5"></div>
						<div className="break-words text-sm">
							<span className="font-semibold">นาทีที่ 0:</span> ทุกหอคอยเริ่มต้นที่ 🔵 (X = 🔵, Y = 🔵, Z = 🔵)
						</div>
					</div>
					<div className="flex flex-row items-baseline">
						<div className="p-1 bg-white rounded-full mx-5"></div>
						<div className="break-words text-sm">
							<span className="font-semibold">นาทีที่ 1:</span> เซ็นเซอร์ตรวจจับได้ว่า “ฝนตก” ทำให้หอคอย X เปลี่ยนเป็น 🟡 และเริ่มเปลี่ยนสถานะตามกฎ
						</div>
					</div>
					<div className="flex flex-row items-baseline">
						<div className="p-1 bg-white rounded-full mx-5"></div>
						<div className="break-words text-sm">
							<span className="font-semibold">นาทีที่ 2:</span> พายุเข้า 🔴
						</div>
					</div>
					<div className="flex flex-row items-baseline">
						<div className="p-1 bg-white rounded-full mx-5"></div>
						<div className="break-words text-sm">
							<span className="font-semibold">นาทีที่ 3:</span> พายุเข้า 🔴
						</div>
					</div>
				</div>
				<div className="flex flex-col mt-4">
					<div className="grid grid-cols-5 justify-start border py-3 px-4 first:rounded-t-lg last:rounded-b-lg">
						<div className="text-sm">นาที (t)</div>
						<div className="text-sm">
							สถาน X <span className="hidden md:inline-block">(input)</span>
						</div>
						<div className="text-sm">
							สถาน Y <span className="hidden md:inline-block">(input)</span>
						</div>
						<div className="text-sm">
							สถาน Z <span className="hidden md:inline-block">(input)</span>
						</div>
						<div className="text-sm">Result</div>
					</div>
					<div className="grid grid-cols-5 justify-start border py-3 px-4 first:rounded-t-lg last:rounded-b-lg">
						<div className="text-xs md:text-sm ">0</div>
						<div className="text-xs md:text-sm ">🔵 Blue</div>
						<div className="text-xs md:text-sm ">🔵 Blue</div>
						<div className="text-xs md:text-sm ">🔵 Blue</div>
						<div className="text-xs md:text-sm ">ปกติ</div>
					</div>
					<div className="grid grid-cols-5 justify-start border py-3 px-4 first:rounded-t-lg last:rounded-b-lg">
						<div className="text-xs md:text-sm ">1</div>
						<div className="text-xs md:text-sm ">🟡 Yellow</div>
						<div className="text-xs md:text-sm ">🔵 Blue</div>
						<div className="text-xs md:text-sm ">🔴 Red</div>
						<div className="text-xs md:text-sm ">ปกติ</div>
					</div>
					<div className="grid grid-cols-5 justify-start border py-3 px-4 first:rounded-t-lg last:rounded-b-lg">
						<div className="text-xs md:text-sm ">2</div>
						<div className="text-xs md:text-sm ">...</div>
						<div className="text-xs md:text-sm ">...</div>
						<div className="text-xs md:text-sm ">...</div>
						<div className="text-xs md:text-sm ">...</div>
					</div>
					<div className="grid grid-cols-5 justify-start border py-3 px-4 first:rounded-t-lg last:rounded-b-lg">
						<div className="text-xs md:text-sm ">3</div>
						<div className="text-xs md:text-sm ">...</div>
						<div className="text-xs md:text-sm ">...</div>
						<div className="text-xs md:text-sm ">...</div>
						<div className="text-xs md:text-sm ">...</div>
					</div>
				</div>
			</Collapsible>
			<div className="flex flex-col items-baseline mt-4">
				<div className="font-semibold mb-2 underline">คำถาม:</div>
				<div className="flex flex-row mt-1 pl-5 items-baseline">
					<div className="mr-2 text-lg font-semibold">2.1</div>
					<div className="text-sm">
						จงระบุสถานะของหอคอย X, Y และ Z ใน <span className="font-semibold">นาทีที่ 2</span> และ <span className="font-semibold">นาทีที่ 3</span> อย่างละเอียด
					</div>
				</div>
				<div className="flex flex-row mt-1 pl-5 items-baseline">
					<div className="mr-2 text-lg font-semibold">2.2</div>
					<div className="text-sm">จากกฎข้างต้น น้องคิดว่าจะเกิด “เหตุการณ์ไฟลัดวงจร” (กฎข้อที่ 1 ถูกละเมิด) ในนาทีใดหรือไม่? หากเกิด ให้ระบุนาทีที่เกิดเหตุการณ์นั้นและอธิบายสาเหตุของปัญหา</div>
				</div>
				<div className="flex flex-row mt-1 pl-5 items-baseline">
					<div className="mr-2 text-lg font-semibold">2.3</div>
					<div className="text-sm">
						หากน้องเป็นวิศวกรผู้ออกแบบระบบ และพบว่ากฎเดิมทำให้เกิดอันตราย น้องจะ <span className="font-semibold">“แก้ไขกฎข้อใดเพียงข้อเดียว”</span> เพื่อให้ระบบสามารถป้องกันพายุได้ (X เป็น 🔴) โดยที่ไฟไม่ลัดวงจร และหอคอย Z ยังทำงานได้?
						(จงอธิบายเหตุผลและความคิดสร้างสรรค์ในการแก้ปัญหา)
					</div>
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

export function Question3({ answer1, answer2 }: { answer1: string; answer2: string }): React.JSX.Element {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="flex flex-col mt-10">
			<div className="font-normal text-base flex flex-row items-baseline">
				<div className="text-3xl mr-3">3.</div>
				<div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-baseline w-full">
					<div className="text-lg font-bold">คดีปริศนาในม่านฝุ่น</div>
					<button type="button" className="mt-4 py-2 px-3 w-fit hover:bg-white/20 rounded-lg duration-300 active:bg-white/40 text-sm flex flex-row" onClick={() => setIsOpen((prev) => !prev)}>
						<ChevronDown className={`mr-3 duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
						เเสดงรายละเอียดตำถาม
					</button>
				</div>
			</div>
			<Collapsible open={isOpen}>
				<div className="text-sm indent-7 mt-2">
					มหานครแห่งหนึ่งที่อยู่ท่ามกลางพายุฝุ่นขนาดมหึมากำลังเผชิญกับวิกฤตฝุ่นพิษโดยเมื่อ “เครื่องฟอกอากาศมหาภาค” ของเมืองหยุดทำงานกะทันหันในคืน ๆ หนึ่งที่อากาศหนาวเหน็บ ทำให้ฝุ่นจากภายนอกตัวเมืองคลืบคลานเข้าสู่ตัวเมือง ท่านเจ้าเมืองได้สั่งกักตัวผู้พิทักษ์ทั้ง 4 คน
					ที่ถูกพบเห็นและมีการบันทึกไว้ในระบบว่าอยู่ในพื้นที่ที่สามารถแก้ไขและจัดการกับเครื่องฟอกอากาศได้ เพื่อสืบสวนพยานและหาผู้อยู่เบื้องหลังเหตุการณ์ที่สร้างความอลหม่านให้กับชาวเมืองในครั้งนี้
				</div>
				<div className="flex flex-col items-baseline mt-4">
					<div className="font-semibold mb-2 underline">คำถาม:</div>
					<div className="text-sm mt-2 indent-7">
						<span className="font-bold">ชั้นใต้ดิน - ห้องเซิร์ฟเวอร์ :</span> ห้องคอมพิวเตอร์หลักของเมือง ที่มีซุเปอร์เพาว์เออร์คอมพิวเตอร์ นามว่า “คอลมีอ้าซูบาซูบาซูบาเอ้ยคอมพิวเตอร์” เป็นเหมือนศูนย์กลาง
					</div>
					<div className="text-sm mt-2 indent-7">
						<span className="font-bold">ชั้น 1 - โถงกลาง :</span> พื้นที่ส่วนกลาง พื้นที่เปิดที่จะมีการใช้งานสำหรับผู้พิทักษ์ และผู้เยี่ยมชมทุก ๆ คนเป็นบริเวณที่จะมีความแออัดเกือบตลอดเวลา เว้นเพียงแต่ว่า ในช่วงค่ำหลังเลิกงานซึ่งไร้ผู้สัญจรไปมา สถานที่แห่งนี้ก็จะมีแต่ความเงียบสงัด
						บรรยากาศมีความน่าฉงนเป็นอย่างมาก
					</div>
					<div className="text-sm mt-2 indent-7">
						<span className="font-bold">ชั้น 2 - ห้องควบคุมระบบ :</span> ห้องสั่งเปิด-ปิดเครื่องฟอกอากาศ ห้องควบคุมระบบการทำงานของเครื่องฟอกอากาศ ซึ่งเป็นเครื่องฟอกอากาศเครื่องแรกที่ถือกำเนิดขึ้น ที่อาจจะเป็นเครื่องสุดท้ายที่อยู่รอด
						เนื่องจากมีการพัฒนาระบบอยู่ตลอดเวลาและอัปเดตการทำงานจาก “คอลมีอ้าซูบาซูบาซูบาเอ้ยคอมพิวเตอร์” ทำให้ระบบมีความทันสมัย รวมถึงยังมีพลังการฟอกอากาศที่แข็งแกร่งและพร้อมที่รับได้ในทุก ๆ สถานการณ์ที่จะเกิดขึ้น ทำให้ห้องควบคุมระบบห้องนี้ เป็นห้องที่มีระบบนิรภัยขั้นสูง
						เพื่อป้องกันการแทรกซึมของบุคคลภายนอกและผู้ประสงค์ร้าย
					</div>
					<div className="text-sm mt-2 indent-7">
						<span className="font-bold">ชั้น 3 - ห้องเครื่องจักร :</span> ห้องดูแลเครื่องกล เปรียบเสมือนโครงสร้าง Hardware ของระบบฟอกอากาศที่ต้องคอยมีการทำนุบำรุงอยู่อย่างต่อเนื่องเพื่อไม่ให้การทำงานของเครื่องฟอกอากาศมีประสิทธิภาพที่ต่ำลงกว่าเกณฑ์มาตรฐาน
					</div>
					<div className="text-sm mt-2 indent-7">
						<span className="font-bold">รอบกำแพงเมือง :</span> พื้นที่ภายนอกตัวเมือง เป็นพื้นที่สำหรับการตรวจสอบสภาพฝุ่นภายนอกตัวเมืองเพื่อเตรียมตัวสำหรับการปรับสมดุลประสิทธิภาพของเครื่องฟอกอากาศให้สามารถทำงานได้อย่างมีประสิทธิภาพ
					</div>
				</div>
				<div className="flex flex-col items-baseline mt-4">
					<div className="font-semibold mb-2 underline">ข้อมูลสำคัญเพิ่มเติม</div>
					<div className="text-sm">
						โดยระบบการสั่งปิดเครื่องฟอกอากาศมหาภาคนี้จำเป็นต้องใช้ “รหัสพิเศษชั่วคราว” ซึ่งเปรียบเสมือนเป็นบัตรผ่านที่ทำให้ใครก็ตามที่มีบัตรนี้สามารถสั่งปิดระบบได้ โดยรหัสนี้จะสามารถสร้างได้จากเครื่องในห้องเซิร์ฟเวอร์เท่านั้นและจะไม่มีการบันทึกไว้ว่าใครเป็นคนใช้รหัสนี้ โดยต่อจากนี้เราจะเรียกรหัสอันนี้ว่า
						Token นอกจากนี้เมืองนี้ยังมีสิ่งที่เรียกว่า “บันทึกสมองกล” ที่จะบันทึกสิ่งต่าง ๆ ที่เกิดขึ้นในเมืองไว้อีกด้วย
					</div>
				</div>
				<div className="flex flex-col items-baseline mt-4">
					<div className="font-semibold mb-2 underline">คำให้การจากผู้พิทักษ์ทั้ง 4 ว่าในช่วงเวลาเกิดเหตุ (21:50 - 22:10) อยู่ที่ไหนและทำอะไรอยู่</div>
					<div className="font-bold text-sm mt-4">พี่มด - จอมกลไก :</div>
					<div className="text-sm mt-1 indent-7">
						“ผมไม่รู้เรื่องอะไรเกี่ยวกับระบบฟอกอากาศเลยครับ ตอนแรกผมเดินไปที่กำแพงรอบเมืองเพื่อไปคุยงานกับพี่กระรอกแล้วฝุ่นมันดันเข้าตา หลังจากนั้นผมก็ลงไปล้างหน้าที่ชั้นล่างเพราะฝุ่นเข้าตาแล้วผมก็ซ่อมวาล์วอยู่ที่ชั้น 3 ตลอดนะครับ รู้ตัวอีกทีผมก็เห็นว่าระบบฟอกอากาศได้ปิดตัวลงไปนะครับ”
					</div>
					<div className="font-bold text-sm mt-4">พี่ห่าน - ตาเพชร :</div>
					<div className="text-sm mt-1 indent-7">“ตอนนั้นห่านพึ่งเลิกงาน ก่อนกลับบ้านพี่เต่าให้ห่านเดินตรวจความเรียบร้อยของพื้นที่ส่วนกลาง ห่านเลยเดินดูความเรียบร้อยที่โถงกลาง ตอนประมาณ 22:05 ห่านเห็นพี่กระรอกวิ่งผ่านหน้าห้อง ห่านรู้สึกว่าท่าทางของพี่เขาจะรีบร้อนนะคะ”</div>
					<div className="font-bold text-sm mt-4">พี่กระรอก - สายฟ้า :</div>
					<div className="text-sm mt-1 indent-7">
						“ผมไม่ได้อยู่ในอาคารน่ะครับ พอดีเซนเซอร์ตรวจจับฝุ่นมันเสีย ผมเลยออกไปดูฝุ่นข้างนอกเมืองน่ะครับ แต่ผมก็ได้พบกับพี่มดอยู่สักพักนะครับเห็นเขาบอกว่าจะมีการตรวจสอบระบบที่ห้องวาล์วต่อ ผมได้คุยกับเขาอยู่สักพักนึงก่อนที่เขาจะแยกตัวไปเพราะฝุ่นเข้าตานะครับ”
					</div>
					<div className="font-bold text-sm mt-4">พี่เต่า - คีย์บอร์ดด่วน :</div>
					<div className="text-sm mt-1 indent-7">
						“ผมนั่งเฝ้าจออยู่ในห้องเซิร์ฟเวอร์ชั้นใต้ดินคนเดียวครับ ระบบมัน Error บ่อย ผมเลยไม่ได้ลุกไปไหนเลย แต่ก่อนหน้าที่ระบบมันจะ Error ผมก็ได้ชี้แจ้งกับพี่ห่านว่าให้ไปตรวจสอบที่ทางเดินตรงพื้นที่ส่วนกลางนะครับ ผมเห็นว่าตอนนั้นเขากำลังจะเลิกงานพอดีก็เลยไหว้วานให้ไปตรวจสอบอีกทีนะครับ”
					</div>
				</div>
				<div className="flex flex-col items-baseline mt-4">
					<div className="font-semibold mb-2 underline">บันทึกจากสมองกล</div>
					<div className="flex flex-row items-start mt-2">
						<div>21:30</div>
						<div className="mx-3">-</div>
						<div>กล้องที่ชั้นที่ 3 เกิดการชำรุดมาต่อเนื่องเป็นเวลาหลายวันและยังไม่ได้มีการซ่อมแซม ทำให้ภาพที่เห็นเป็นเพียงภาพลาง ๆ</div>
					</div>
					<div className="flex flex-row items-start mt-2">
						<div>21:50</div>
						<div className="mx-3">-</div>
						<div>ที่ห้องเซิร์ฟเวอร์มีแฟลชไดรฟ์ถูกเสียบเข้ากับคอมพิวเตอร์หลักของเมืองเพื่อใช้งาน</div>
					</div>
					<div className="flex flex-row items-start mt-2">
						<div>21:58</div>
						<div className="mx-3">-</div>
						<div>มีการเปิดไฟล์ตั้งค่าระบบที่ใช้ในการควบคุมเครื่องฟอกอากาศ</div>
					</div>
					<div className="flex flex-row items-start mt-2">
						<div>22:02</div>
						<div className="mx-3">-</div>
						<div>ระบบมีการสร้าง Token ใหม่</div>
					</div>
					<div className="flex flex-row items-start mt-2">
						<div>22:03</div>
						<div className="mx-3">-</div>
						<div>ตรวจพบว่ามีคนเข้าไปในห้องควบคุม แต่ไม่สามารถระบุจำนวนได้</div>
					</div>
					<div className="flex flex-row items-start mt-2">
						<div>22:06</div>
						<div className="mx-3">-</div>
						<div>มีคำสั่งปิดเครื่องฟอกอากาศ</div>
					</div>
					<div className="flex flex-row items-start mt-2">
						<div>22:09</div>
						<div className="mx-3">-</div>
						<div>แฟลชไดรฟ์ถูกถอดออก</div>
					</div>
					<div className="flex flex-row items-start mt-2">
						<div>21:55 ถึง 22:10</div>
						<div className="mx-3">-</div>
						<div>ระบบประตูชั้น 3 ทำงานคลาดเคลื่อน</div>
					</div>
				</div>
			</Collapsible>
			<div className="flex flex-col items-baseline mt-4">
				<div className="font-semibold mb-2 underline">จงตอบคำถามต่อไปนี้</div>
				<div className="flex flex-row mt-1 pl-5 items-baseline">
					<div className="mr-2 text-lg font-semibold">3.1</div>
					<div className="text-sm">
						น้องคิดว่าใครเป็นผู้ร้ายที่ปิดเครื่องฟอกอากาศ <span className="font-semibold">ตอบเป็นชื่อของผู้ร้าย</span>
					</div>
				</div>
				<div className="flex flex-row mt-1 pl-5 items-baseline">
					<div className="mr-2 text-lg font-semibold">3.2</div>
					<div className="text-sm">
						อธิบายเหตุผลว่าทำไมถึงคิดเช่นนั้น <span className="font-semibold">จงอธิบายเหตุผลอย่างละเอียดและชัดเจน</span>
					</div>
				</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="text-3xl mr-3">3.1</div>
				<div className="mr-3 text-base font-bold underline">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer1}</div>
			</div>
			<div className="text-sm mt-5 flex flex-row items-baseline">
				<div className="text-3xl mr-3">3.2</div>
				<div className="mr-3 text-base font-bold underline">ตอบ</div>
				<div className="break-all w-full text-base text-[#7b7b7b]">{answer2}</div>
			</div>
			<div className="w-auto mt-8 h-[1px] bg-white "></div>
		</div>
	);
}

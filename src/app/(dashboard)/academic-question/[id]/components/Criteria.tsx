import { Dot } from "lucide-react";
import React from "react";

export function Criteria({ section }: { section: string }): React.JSX.Element {
	if (section === "academic_1") return <Criteria1 />;
	else if (section === "academic_201") return <Criteria1 />;
	else if (section === "academic_202") return <Criteria1 />;
	else if (section === "academic_203") return <Criteria1 />;
	else if (section === "academic_3") return <Criteria1 />;
	else if (section === "academic_4") return <Criteria1 />;
	else if (section === "academic_5") return <Criteria5 />;
	else if (section === "academic_6") return <Criteria6 />;
	else if (section === "academic_7") return <Criteria7 />;
	else if (section === "academic_8") return <Criteria8 />;
	else if (section === "academic_9") return <Criteria9 />;
	else if (section === "academic_10") return <Criteria10 />;
	else return <></>;
}

function CriteriaBody({ children }: { children: React.ReactNode }): React.JSX.Element {
	return <div className="border rounded-lg py-3 px-5 mb-3 mt-2 flex flex-col">{children}</div>;
}

function CriteriaHead({ children }: { children: React.ReactNode }): React.JSX.Element {
	return <div className="text-base">{children}</div>;
}

function CriteriaTableBody({ children }: { children: React.ReactNode }): React.JSX.Element {
	return <div className="flex flex-col mt-3">{children}</div>;
}

function CriteriaTableHead({ c1, c2, c3 }: { c1: string; c2: string; c3: string }): React.JSX.Element {
	return (
		<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 bg-white/5">
			<div className="col-span-2 text-sm text-start font-bold">{c1}</div>
			<div className="col-span-1 text-sm text-center font-bold">{c2}</div>
			<div className="col-span-2 text-sm text-end font-bold">{c3}</div>
		</div>
	);
}

function CriteriaTableSub({ c1, c2, c3, score }: { c1: string; c2: string; c3: string; score?: boolean }): React.JSX.Element {
	return (
		<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
			<div className="col-span-2 text-xs text-start break-words font-bold">{c1}</div>
			<div className="col-span-1 text-xs text-center">{c2}</div>
			<div className="col-span-2 text-xs text-start break-words">
				{score ? (
					<>
						<span className="text-red-600 font-bold">{c2} คะเเนน</span> :{" "}
					</>
				) : (
					""
				)}
				{c3}
			</div>
		</div>
	);
}

export function Criteria1(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์การให้คะแนนโดยย่อ ข้อ 1 - 4</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนนเต็ม" c3="รายละเอียด (โดยย่อ)" />
				<CriteriaTableSub c1="1. การออกแบบอัลกอริทึม" c2="3" c3="ลำดับขั้นตอนการหาจำนวนเฉพาะ การสะสมผลรวม และการจัดการเงื่อนไข NONE" />
				<CriteriaTableSub c1="2. ความรู้ด้านประเภทข้อมูล" c2="3" c3="การเลือกชนิดข้อมูลที่เหมาะสมกับงาน และความเข้าใจเรื่องความแม่นยำ (Precision)" />
				<CriteriaTableSub c1="3. ความเข้าใจเกี่ยวกับหลักการของ Array" c2="2" c3="ความเข้าใจเรื่องตำแหน่ง (Index) การจองพื้นที่ และผลกระทบของการเข้าถึงข้อมูลเกินขอบเขต" />
				<CriteriaTableSub c1="4. ทัศนคติและความเข้าใจต่อภาษา C" c2="2" c3="การวิเคราะห์ความสำคัญและประโยชน์ของภาษา C เมื่อเทียบกับภาษาอื่น" />
			</CriteriaTableBody>

			<div className="my-4"></div>
			<CriteriaHead>เกณฑ์การให้คะแนนแบบละเอียด ข้อ 1 - 4</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนน" c3="เกณฑ์การให้คะแนนแบบละเอียด" />
				<CriteriaTableSub c1="1. การออกแบบอัลกอริทึม" c2="3" c3="อธิบายขั้นตอนได้สมบูรณ์ คือ มีการวนลูปเช็กเลขในช่วง A ถึง B, มีขั้นตอนเช็กตัวหารเพื่อพิสูจน์จำนวนเฉพาะ, มีการสะสมผลรวม และระบุเงื่อนไขการแสดง NONE ได้ถูกต้องตามโจทย์" score />
				<CriteriaTableSub c1="" c2="2" c3="อธิบายการวนลูปช่วงตัวเลขได้ถูกต้อง แต่ขั้นตอนการเช็กจำนวนเฉพาะไม่ชัดเจน หรือลืมอธิบายการจัดการผลลัพธ์ในกรณีที่ไม่พบเลขเฉพาะเลย (เช่น ลืมแสดง NONE)" score />
				<CriteriaTableSub c1="" c2="1" c3="อธิบายขั้นตอนสับสน เรียงลำดับก่อนหลังไม่ได้ หรือบอกเพียงนิยามของจำนวนเฉพาะแต่ไม่บอกวิธีที่ระบบจะทำงานจนได้คำตอบ" score />
				<CriteriaTableSub c1="" c2="0" c3="คำตอบไม่เกี่ยวข้องกับขั้นตอนการแก้ปัญหา หรือมีการใช้ AI ในการตอบคำถาม" score />

				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">2. ความรู้ด้านประเภทข้อมูล</div>
						<div className="mt-4">2.1 : เลือกประเภทข้อมูลถูกต้อง</div>
						<div className="mt-4">2.2 : อธิบายความแตกต่างระหว่าง double / float</div>
						<div className="mt-4">2.3 : อธิบายตัวอย่างความผิดพลาดได้ชัดเจน</div>
						<div className="font-bold mt-4 text-red-600">(ข้อย่อยละ 1 คะแนน)</div>
					</div>
					<div className="col-span-1 text-xs text-center">3</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">3 คะแนน</span> : ตอบถูกครบทุกส่วน:
						</div>
						<div className="mt-4">(1) เลือก char array, int, float หรือ double ได้ถูกต้องพร้อมเหตุผล</div>
						<div className="mt-4">(2) ระบุว่าควรใช้ double สำหรับทศนิยมละเอียดสูง</div>
						<div className="mt-4">(3) ยกตัวอย่างผลเสียของการใช้ผิดรูปแบบได้ชัดเจน เช่น หากใช้ char ในการรับ string อาจเกิดข้อมูลสูญหาย หรือ หากใช้ int รับ float จะรับได้แค่เลขก่อนจุดทศนิยม</div>
					</div>
				</div>

				<CriteriaTableSub c1="" c2="2" c3="เลือกชนิดข้อมูลได้ถูกต้องเป็นส่วนใหญ่ แต่อธิบายเหตุผลไม่ชัดเจน หรือไม่สามารถระบุความแตกต่างระหว่าง float กับ double ได้ (ทำถูกต้อง 2 ใน 3 ข้อย่อย)" score />
				<CriteriaTableSub c1="" c2="1" c3="เลือกชนิดข้อมูลผิดประเภทอย่างรุนแรง (เช่น ใช้ int เก็บชื่อ) หรือตอบถูกเพียงส่วนเดียว และไม่เห็นภาพผลเสียของการเลือกข้อมูลผิด (ทำถูกต้อง 1 ใน 3 ข้อย่อย)" score />
				<CriteriaTableSub c1="" c2="0" c3="ไม่สามารถระบุชนิดข้อมูลพื้นฐานของภาษา C ได้เลย หรือมีการใช้ AI ในการตอบคำถามอย่างชัดเจน" score />

				<CriteriaTableSub
					c1="3. ความเข้าใจเกี่ยวกับหลักการของ Array"
					c2="2"
					c3="อธิบายได้ชัดเจนว่า Array เริ่มนับตำแหน่งที่ 0 ดังนั้นขนาด 5 คือตำแหน่ง 0-4 การใส่ข้อมูลตำแหน่งที่ 6 (Index 5) คือการเขียนทับพื้นที่นอกเขตที่จองไว้ ทำให้ข้อมูลอื่นเสียหายหรือโปรแกรม Crash หรือเกิด Buffer Overflow"
					score
				/>
				<CriteriaTableSub c1="" c2="1" c3="ระบุได้ว่าโปรแกรมจะพังหรือเกิดข้อผิดพลาด แต่ไม่สามารถอธิบายหลักการนับตำแหน่ง Index หรือความสำคัญของการจองพื้นที่ที่จำกัดได้ชัดเจน" score />
				<CriteriaTableSub c1="" c2="0" c3="ตอบว่าทำได้ปกติ หรือไม่เข้าใจหลักการจองพื้นที่และตำแหน่งของ Array หรือมีการใช้ AI ในการตอบคำถามอย่างชัดเจน" score />

				<CriteriaTableSub c1="4. ทัศนคติและความเข้าใจต่อภาษา C" c2="2" c3="วิเคราะห์เหตุผลได้สมเหตุสมผล: เช่น เป็นภาษาที่ทำให้เข้าใจโครงสร้างคอมพิวเตอร์และหน่วยความจำได้ดีที่สุด, มีประสิทธิภาพสูง, หรือเป็นรากฐานที่ช่วยให้ต่อยอดภาษาอื่นได้ลึกซึ้งขึ้น" score />
				<CriteriaTableSub c1="" c2="1" c3="ให้เหตุผลแบบกว้างๆ เช่น เป็นภาษามาตรฐานที่นิยมใช้สอน หรือตอบเพียงว่าเป็นภาษาที่ใช้ฝึกตรรกะพื้นฐานได้ดี" score />
				<CriteriaTableSub c1="" c2="0" c3="ไม่สามารถระบุเหตุผลหรือความสำคัญของภาษา C ได้เลย หรือมีการใช้ AI ในการตอบคำถามอย่างชัดเจน" score />
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria6(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์การให้คะแนน ข้อ 6</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนน" c3="เกณฑ์การให้คะแนนแบบละเอียด" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">1. ความรู้เรื่องระบบไฟและกำลังขับ</div>
						<div className="mt-4">(Power & Drive Capability)</div>
						<div className="mt-4 font-bold">ข้อนี้สำคัญที่สุดสำหรับงานจริง</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- ตอบว่า "โค้ดผิด" (ทั้งที่โจทย์กำหนดว่าโค้ดถูกแล้ว)</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- สงสัยเรื่องแหล่งจ่ายไฟพื้นฐาน เช่น "ถ่านหมด", "ลืมเปิดสวิตช์รางถ่าน", "ไม่ได้เสียสาย USB"</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">2 คะแนน (Technical Insight)</span> :
						</div>
						<div className="mt-1">- วิเคราะห์ลึกถึง "กำลังไฟไม่พอ"</div>
						<div className="mt-1">- ระบุว่า Micro:bit จ่ายไฟให้มอเตอร์โดยตรงไม่ได้ (กระแสไม่พอ)</div>
						<div className="mt-1">- ต้องใช้ "บอร์ดขยาย (Motor Driver)" หรือต้องใช้แหล่งจ่ายไฟแยก (External Power)</div>
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">2. ความรู้เรื่องการเชื่อมต่อทางกายภาพ</div>
						<div className="mt-4">(Physical Connection)</div>
						<div className="mt-4">วัดความรอบคอบหน้างาน</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- ตอบกว้าง ๆ ว่า "พัง", "เสีย"</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- ระบุสาเหตุทั่วไปได้ เช่น "มอเตอร์เสีย", "สายไฟขาดใน", "พอร์ต USB หลวม"</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">2 คะแนน</span> :
						</div>
						<div className="mt-1">- ระบุความผิดพลาดเชิงเทคนิคได้ละเอียด เช่น "ต่อสายผิดขั้ว (บวก/ลบ)", "เสียบผิดขา (Pin)", "สายไฟจิ้มเปอร์หลวม (Loose connection)"</div>
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria5(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์การให้คะแนนโดยย่อ ข้อ 5</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนน" c3="เกณฑ์การให้คะแนนแบบละเอียด" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">ความเข้าใจในนิยาม</div>
						<div className="mt-4">(Conceptual Understanding)</div>
						<div className="mt-4">วัดว่ารู้นิยามที่ถูกต้องแค่ไหน</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- ตอบไม่ตรงประเด็น หรือตอบกว้างเกินไป เช่น "คือหุ่นยนต์", "คือไฟฟ้า"</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- เข้าใจว่าเป็นอุปกรณ์อิเล็กทรอนิกส์หรือแผงวงจร</div>
						<div className="mt-1">- ตอบตามความเข้าใจทั่วไป เช่น "แผงเขียว ๆ ที่เอาไว้ต่อไฟ", "ตัวควบคุมการทำงาน"</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">2 คะแนน</span> :
						</div>
						<div className="mt-1">- เปรียบเทียบได้เห็นภาพชัดเจน เช่น "คือสมองของคอมพิวเตอร์ขนาดเล็ก", "คือตัวสั่งงานอุปกรณ์ต่าง ๆ "</div>
						<div className="mt-1">- มีKeyword สำคัญ เช่น "ประมวลผล (Process)", "รับค่า (Input/Output)", "เขียนโปรแกรมสั่งงานได้"</div>
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">2. การถ่ายทอดประสบการณ์</div>
						<div className="mt-4">(Experience & Passion)</div>
						<div className="mt-4">วัดความสนใจหรือสิ่งที่เคยทำ</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- ไม่มีประสบการณ์เลย</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน (กลุ่มผู้เริ่มต้น)</span> :
						</div>
						<div className="mt-1">- เหรือเคยเห็นผ่านตา เคยเรียนในห้องเรียนพื้นฐาน (Block code)</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">2คะแนน (กลุ่มมีของ)</span> :
						</div>
						<div className="mt-1">- เล่ารายละเอียดโปรเจกต์ที่เคยทำได้ เช่น "เคยทำรถเดินตามเส้น", "เคยวัดอุณหภูมิ"</div>
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria7(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์การให้คะแนน ข้อ 7</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนน" c3="เกณฑ์การให้คะแนนแบบละเอียด" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">1. การวิเคราะห์กลยุทธ์</div>
						<div className="mt-4">(Strategic Reasoning)</div>
						<div className="mt-4">วัดการชั่งน้ำหนักข้อดี/ข้อเสีย</div>
					</div>
					<div className="col-span-1 text-xs text-center">3</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">0 คะแนน (คิดชั้นเดียว)</span> :
						</div>
						<div className="mt-1">- เลือกโดยใช้ความรู้สึกส่วนตัว เช่น "ชอบตัวนี้เพราะเท่กว่า" หรือ "ดูแข็งแรงกว่า"</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- ให้เหตุผลด้านเดียวตื้น ๆ เช่น "เลือกตัวกวาดเพราะมันเร็วกว่า" (โดยไม่พูดถึงความเสี่ยงเรื่องการแยกขยะ)</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">2 คะแนน (วิเคราะห์พื้นฐาน)</span> :
						</div>
						<div className="mt-1">- ระบุข้อดีของตัวที่เลือกได้ตรงกับภารกิจ</div>
						<div className="mt-1">
							- <strong>กรณีเลือกตัวคีบ:</strong> อ้างเหตุผลเรื่องความแม่นยำ ไม่โดนหักคะแนนแน่ ๆ
						</div>
						<div className="mt-1">
							- <strong>กรณีเลือกตัวกวาด:</strong> อ้างเหตุผลเรื่องความเร็ว ต้องการปริมาณมาก
						</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">3 คะแนน (วิเคราะห์เชิงลึก - Trade-off)</span> :
						</div>
						<div className="mt-1">- แสดงให้เห็นการเปรียบเทียบ (Comparison) ระหว่าง 2 ตัวชัดเจนและละเอียด</div>
						<div className="mt-1">
							- <strong>กรณีเลือกตัวคีบ:</strong> ยอมรับว่าช้ากว่า แต่เน้น "Score Efficiency" คือทำแต้มได้ชัวร์ ไม่เสียเวลาแก้ปัญหาตอนวางผิด
						</div>
						<div className="mt-1">
							- <strong>กรณีเลือกตัวกวาด:</strong> ยอมรับว่ามีความเสี่ยงที่จะตักผิด แต่เสนอแผนแก้เกม เช่น "จะโกยไปกองรวมกันก่อนแล้วค่อยเขี่ยแยก" หรือ "มั่นใจว่าแต้มที่ได้จากปริมาณ จะคุ้มกว่าแต้มที่ถูกหัก"
						</div>
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">2. การวางแผนกลยุทธ์</div>
						<div className="mt-4">(Strategic Planning)</div>
						<div className="mt-4">วัดไหวพริบในการทำภารกิจ (เก็บ/แยก/ส่ง)</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- ไม่มีแผน วิ่งมั่ว หรือตอบว่า "ก็วิ่งไปเก็บเรื่อย ๆ "</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน (กลุ่ม Play safe)</span> :
						</div>
						<div className="mt-1">- มีลำดับขั้นตอนพื้นฐาน</div>
						<div className="mt-1">- เช่น "จะเก็บขยะประเภท A ให้หมดก่อน แล้วค่อยไปเก็บประเภท B เพื่อกันความสับสนและไม่โดนหักคะแนน"</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">2 คะแนน (กลุ่ม Optimizer)</span> :
						</div>
						<div className="mt-1">- มีแผนการลดเวลา (Optimization)</div>
						<div className="mt-1">- เช่น "จะขับไปจุดกึ่งกลาง กวาดขยะทั้ง 2 แบบมาไว้ใกล้ ๆ จุด Checkpoint ก่อน แล้วค่อยดันเข้าทีเดียว" หรือ "จะเก็บขยะชิ้นใหญ่ก่อนเพื่อทำคะแนน"</div>
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria8(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์การให้คะแนน ข้อ 8</CriteriaHead>
			<div className="text-xs text-muted-foreground mt-1">จุดประสงค์: วัดทัศนคติ (Mindset) และทักษะการสรุปความด้วยภาษาตัวเอง โดยไม่พึ่งพาการคัดลอก Fact จากอินเทอร์เน็ตเพียงอย่างเดียว</div>
			<CriteriaTableBody>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 bg-white/5">
					<div className="col-span-1 text-sm text-start font-bold">คะแนน</div>
					<div className="col-span-2 text-sm text-center font-bold">เกณฑ์การพิจารณา</div>
					<div className="col-span-2 text-sm text-end font-bold">ตัวอย่างพฤติกรรมคำตอบ</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">3</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">มุมมองสะท้อนแนวคิด (Insightful):</div>
						<div className="mt-1">ให้คำนิยามที่ถูกต้องและมีมุมมองส่วนตัวประกอบชัดเจน อธิบายจุดประสงค์การสร้างเชิงการแก้ปัญหาหรือการต่อยอดศักยภาพมนุษย์ได้อย่างน่าสนใจ</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"AI คือเครื่องมือที่จำลองการคิดของมนุษย์เพื่อมาอุดรอยรั่วในส่วนที่มนุษย์ทำได้ไม่ดี เช่น การประมวลผลข้อมูลมหาศาล เพื่อให้มนุษย์ไปโฟกัสกับเรื่องการใช้ความคิดสร้างสรรค์แทนครับ"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">มุมมองเชิงเทคนิค (Technical but generic):</div>
						<div className="mt-1">ให้คำตอบที่ถูกต้องตามหลักการ มีความคิดเห็นส่วนตัวบ้างแต่ยังไม่ลึกขึ้น หรือคำอธิบายเหตุผลของการสร้าง AI ยังวนอยู่กับเรื่องความสะดวกสบายทั่วไป</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"AI คือสมองกลที่คิดแทนคนได้ ถูกสร้างมาเพื่อทำงานที่ยากเกินไปสำหรับคน หรือเพื่อทำงานให้เร็วขึ้นและลดความผิดพลาดครับ"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">1</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">มุมมองเชิงตำรา (Textbook/Google Copy):</div>
						<div className="mt-1">คำตอบถูกต้องตามหลักการเป๊ะ ๆ แต่เป็นการลอกคำนิยามจาก Google หรือวิกิพีเดียมาวาง โดยไม่มีการเรียบเรียงใหม่ด้วยภาษาของตนเอง</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"AI คือศาสตร์แขนงหนึ่งของวิทยาการคอมพิวเตอร์ที่เน้นการสร้างเครื่องจักรให้มีความฉลาด สร้างขึ้นเพื่อตอบสนองความต้องการด้านเทคโนโลยีสมัยใหม่"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">0</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">No Concept:</div>
						<div className="mt-1">ให้คำตอบที่ผิดพลาดอย่างร้ายแรงในเชิงตรรกะ หรือไม่ให้คำตอบเลย</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"AI คือหุ่นยนต์ที่เกิดมาเพื่อยึดครองโลกและกำจัดมนุษย์ทิ้งครับ"</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria9(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์การให้คะแนน ข้อ 9</CriteriaHead>
			<div className="text-xs text-muted-foreground mt-1">จุดประสงค์: วัดทักษะการวิเคราะห์หาต้นตอของปัญหา (Root Cause Analysis) ในระบบ Machine Learning โดยเฉพาะเรื่อง Data Bias</div>
			<CriteriaTableBody>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 bg-white/5">
					<div className="col-span-1 text-sm text-start font-bold">คะแนน</div>
					<div className="col-span-2 text-sm text-center font-bold">เกณฑ์การพิจารณา</div>
					<div className="col-span-2 text-sm text-end font-bold">ตัวอย่างพฤติกรรมคำตอบ</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">4</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">วิเคราะห์ตรงจุดและแก้ปัญหาได้ครบถ้วน:</div>
						<div className="mt-1">ระบุได้ว่าปัญหาเกิดจาก ข้อมูลที่ใช้สอน (Training Data) มีความลำเอียง (Bias) หรือขาดความหลากหลาย และเสนอการแก้ปัญหาด้วยการเพิ่ม Data Diversity หรือ Feature ใหม่ ๆ</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"ปัญหาเกิดจาก Data Bias เช่น ในชุดข้อมูลมีแต่รูปขวดแก้วที่ใสจนดูเหมือนพลาสติก วิธีแก้คือเพิ่มรูปขวดแก้วที่มีหลายทรง หลายสี และอาจใช้เซนเซอร์อื่นช่วย เช่น เซนเซอร์เสียงหรือน้ำหนักครับ"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">3</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">วิเคราะห์ที่มาได้ถูกต้อง:</div>
						<div className="mt-1">ระบุได้ว่าปัญหาอยู่ที่ข้อมูล (Data) ไม่ใช่ที่ตัวโปรแกรม แต่อาจจะเสนอวิธีแก้ไขที่ยังไม่ครอบคลุมเท่าที่ควร หรือให้เหตุผลรองรับได้ไม่ชัดเจนนัก</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"ข้อมูลที่ป้อนให้ AI อาจจะมีแต่ขวดพลาสติกเยอะเกินไป วิธีแก้คือต้องไปลนรูปขวดแก้วมาเติมให้เท่ากันครับ"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">วิเคราะห์ปัญหาผิดแต่แนวทางแก้มีเหตุผล:</div>
						<div className="mt-1">ระบุสาเหตุไปที่เรื่องอื่น (ที่ไม่ใช่ Hardware) แต่แนวทางการแก้ไขที่เสนออยังสามารถนำไปปรับปรุงระบบให้ดีขึ้นได้ในเชิงตรรกะ</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"น่าจะเป็นเพราะ Algorithm คำนวณค่าแสงผิดพลาด วิธีแก้คือต้องเขียนโปรแกรมให้ตรวจจับความหนาของขวดเพิ่มเข้าไปครับ"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">1</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">มีแนวทางแก้แต่ไม่เข้าใจปัญหา:</div>
						<div className="mt-1">เสนอวิธีแก้ไขปัญหาแบบกว้าง ๆ แต่ไม่สามารถบอกได้ว่าต้นตอของปัญหาที่ AI ทายผิดคืออะไร</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"เราควรจะลองเทรน AI ใหม่ไปเรื่อย ๆ จนกว่ามันจะตอบถูก หรือหา Dataset ชุดใหม่มาลองใช้ดูครับ"</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria10(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์การให้คะแนน ข้อ 10</CriteriaHead>
			<div className="text-xs text-muted-foreground mt-1">จุดประสงค์: วัดความเข้าใจเชิงลึกเกี่ยวกับกลไกการเรียนรู้ และความสามารถในการเปรียบเทียบเชิงตรรกะ</div>
			<CriteriaTableBody>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 bg-white/5">
					<div className="col-span-1 text-sm text-start font-bold">คะแนน</div>
					<div className="col-span-2 text-sm text-center font-bold">เกณฑ์การพิจารณา</div>
					<div className="col-span-2 text-sm text-end font-bold">ตัวอย่างพฤติกรรมคำตอบ</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">3</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">เข้าใจความต่างและเหมือนอย่างลึกซึ้ง:</div>
						<div className="mt-1">อธิบายได้ว่าเหมือนกันในเชิงการรับ Input และ Output แต่ต่างกันที่กระบวนการ (AI ใช้สถิติ/คณิตศาสตร์ มนุษย์ใช้ประสบการณ์/ความรู้สึก)</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"เหมือนในแง่การรับข้อมูลมาประมวลผลครับ แต่ต่างกันที่ AI เรียนรู้จากแพทเทิร์นตัวเลขมหาศาล ส่วนมนุษย์เรียนรู้จากบริบท ความรู้สึก และประสบการณ์ที่มีความซับซ้อนกว่า"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">เปรียบเทียบได้ในระดับพื้นฐาน:</div>
						<div className="mt-1">ให้คำตอบที่อาจจะยังไม่ถูกต้องที่สุดในเชิงวิทยาศาสตร์ แต่คนสามารถเรียนรู้เรื่องใหม่ได้เร็วกว่า โดยใช้ข้อมูลเพียงนิดเดียว</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"ต่างกันครับ เพราะ AI จำข้อมูลได้แม่นกว่า คน แต่คนสามารถเรียนรู้เรื่องใหม่ได้เร็วกว่า โดยใช้ข้อมูลเพียงนิดเดียว"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">1</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">อธิบายไม่ชัดเจน:</div>
						<div className="mt-1">ตอบว่าเหมือนหรือต่าง แต่ให้เหตุผลประกอบที่สับสน หรือไม่สามารถอธิบายเหตุผลได้อย่างเป็นระบบ</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"เหมือนกันครับ เพราะต้องมีคนสอนเหมือนกัน ถ้าไม่มีคนสอนก็ทำอะไรไม่เป็นทั้งคู่"</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-1 text-xs text-start break-words font-bold">0</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">No Explanation:</div>
						<div className="mt-1">ตอบเพียงคำว่า "เหมือน" หรือ "ไม่เหมือน" โดยไม่มีการอธิบายเหตุผลใด ๆ ต่อท้าย</div>
					</div>
					<div className="col-span-2 text-xs text-start break-words">"ไม่เหมือนกันครับ"</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

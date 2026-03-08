import React from "react";

export function Criteria({ section }: { section: string }): React.JSX.Element {
	if (section === "aptitude_101") return <Criteria1 />;
	else if (section === "aptitude_201") return <Criteria21 />;
	else if (section === "aptitude_202") return <Criteria22 />;
	else if (section === "aptitude_203") return <Criteria23 />;
	else if (section === "aptitude_301") return <Criteria31 />;
	else if (section === "aptitude_302") return <Criteria32 />;
	else if (section === "aptitude_303") return <Criteria33 />;
	else if (section === "aptitude_304") return <Criteria34 />;
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
			<CriteriaHead>เกณฑ์คะแนนโดยย่อ ข้อ 1</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนน" c3="รายละเอียด" />
				<CriteriaTableSub c1="การวิเคราะห์ความเสี่ยง" c2="2" c3="ระบุได้ว่าผู้ที่มีความเสี่ยงมีจำนวนน้อยที่สุดคือ 1 คน (คนท้ายแถวสุด) พร้อมอธิบายเหตุผลของการเสียสละเพื่อบอกใบ้รหัส" />
				<CriteriaTableSub c1="การออกแบบอัลกอริทึม" c2="3" c3="มีการใช้ตรรกะทางคณิตศาสตร์ด้วยการแปลงสีเป็นตัวเลขและใช้ผลรวมหารเอาเศษ (Modulo 3) เพื่อสร้างรหัสลับ" />
				<CriteriaTableSub c1="กระบวนการประมวลผล" c2="2" c3="อธิบายขั้นตอนที่คนที่เหลือใช้คำนวณสีของตนเอง โดยเปรียบเทียบจากข้อมูลที่ได้ยินกับข้อมูลที่มองเห็นได้อย่างถูกต้อง" />
			</CriteriaTableBody>

			<div className="my-4"></div>
			<CriteriaHead>เกณฑ์คะแนนโดยละเอียด ข้อ 1</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนน" c3="เกณฑ์การให้คะแนนแบบละเอียด" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">1. การวิเคราะห์ความเสี่ยง</div>
						<div className="mt-4">(Minimum Risk Analysis)</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">2 คะแนน</span> :
						</div>
						<div className="mt-1">- ระบุได้ถูกต้องว่ามีความเสี่ยงต่ำสุดคือ 1 คน และให้เหตุผลได้ชัดเจนว่าคนท้ายแถวต้องยอมเสี่ยงเพื่อบอกภาพรวมของข้อมูลให้คนทั้งแถว</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- ระบุจำนวน 1 คนถูกต้องแต่ให้เหตุผลสับสน หรือระบุจำนวนผิดแต่มองเห็นว่าต้องมีการเสียสละเพื่อส่งข้อมูล</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- ระบุจำนวนผิดพลาดทั้งหมด (เช่น รอด 100% หรือเสี่ยง 50 คน) หรือไม่ได้ระบุจำนวนคนที่มีความเสี่ยงเลย หรือมีการใช้ AI ในการตอบคำถาม</div>
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">2. การออกแบบอัลกอริทึม</div>
						<div className="mt-4">(Algorithm Design)</div>
					</div>
					<div className="col-span-1 text-xs text-center">3</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">3 คะแนน</span> :
						</div>
						<div className="mt-1">- ใช้วิธีแปลงสีเป็นค่าตัวเลข (เช่น 0, 1, 2) และใช้หลักการหารเอาเศษ (Modulo 3) จากผลรวมทั้งหมดเพื่อให้คนแรกตะโกนเป็นรหัสสี</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">2 คะแนน</span> :
						</div>
						<div className="mt-1">- พยายามใช้หลักการทางคณิตศาสตร์ เช่น การนับจำนวนคู่/คี่เฉพาะสีไสด์หนึ่ง ซึ่งไม่ครอบคลุมทั้ง 3 สี ทำให้ประสิทธิภาพการรอดชีวิตลดลง</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- ใช้วิธีการที่ไม่มีตรรกะที่แน่นอน เช่น การเดาสุ่ม การโหวตเสียงข้างมาก หรือใช้วิธีผิดตรรกิกา หรือมีการใช้ AI ในการตอบคำถาม</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- มีการใช้ AI ในการตอบคำถาม</div>
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">3. กระบวนการประมวลผล</div>
						<div className="mt-4">(Process Flow)</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">2 คะแนน</span> :
						</div>
						<div className="mt-1">- อธิบายตรรกะของคนที่สองไล่ไปจนถึงคนแรกได้อย่างสมบูรณ์ ว่าต้องนำ "รหัสผลรวมที่ได้ยิน" มาหักลบกับ "ผลรวมที่ตัวเองมองเห็น" เพื่อหาค่าสีของตนเอง</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- เข้าใจว่าต้องนำข้อมูลมาเทียบกัน แต่อธิบายกระบวนการคำนวณไม่ถูกต้อง หรืออธิบายได้แค่คนถัดไปเพียงคนเดียวไม่ครอบคลุมทั้งแถว</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- อธิบายกระบวนการถอดรหัสไม่ได้เลย เช่น บอกเพียงว่าให้ตอบตามๆ กันไป หรือมีการใช้ AI ในการตอบคำถาม</div>
					</div>
				</div>
			</CriteriaTableBody>

			<div className="my-4"></div>
			<CriteriaHead>เกณฑ์ของคำถามสำหรับคะแนนพิเศษโดยย่อ ข้อ 1</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนน" c3="รายละเอียด (อ้างอิงจากเกณฑ์ละเอียด)" />
				<CriteriaTableSub c1="การประยุกต์ใช้ตัวแปร k (Variable Adaptation)" c2="1.5" c3="ระบุได้ถูกต้องว่าต้องเปลี่ยนวิธีคำนวณจากการหารเอาเศษด้วย 3 มาเป็น การหารเอาเศษด้วย k (Modulo k) ตามจำนวนสีที่มี" />
				<CriteriaTableSub c1="ความเข้าใจในตัวแปร n (Logic Consistency)" c2="1.5" c3="อธิบายเหตุผลได้ถูกต้องว่าจำนวนคน (n) ไม่มีผล ต่ออัลกอริทึม เพราะเป็นการส่งต่อข้อมูลแบบลูกโซ่ (Chain Reaction) ที่ทำซ้ำได้เรื่อย ๆ" />
			</CriteriaTableBody>

			<div className="my-4"></div>
			<CriteriaHead>เกณฑ์ของคำถามสำหรับคะแนนพิเศษโดยละเอียด ข้อ 1</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="หัวข้อการประเมิน" c2="คะแนน" c3="รายละเอียดเกณฑ์การให้คะแนน" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">การประยุกต์ใช้ตัวแปร k</div>
						<div className="mt-4">(Variable Adaptation)</div>
					</div>
					<div className="col-span-1 text-xs text-center">1.5</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">1.5 คะแนน</span> :
						</div>
						<div className="mt-1">- ระบุได้ถูกต้องว่าต้องเปลี่ยนจากการ หารเอาเศษด้วย 3 มาเป็นหารเอาเศษด้วย k (Modulo k) ตามจำนวนสีที่มี</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- เข้าใจว่าต้องนับเลข แต่ยังยึดติดกับเลข 3 หรืออธิบายไม่ชัดเจนว่าตัวหารคืออะไร</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">0.5 คะแนน</span> :
						</div>
						<div className="mt-1">- ใช้วิธีอื่นที่ไม่ใช่การคำนวณ หรือตอบไม่ตรงคำถาม</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- มีการใช้ AI ในการตอบคำถาม</div>
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">ความเข้าใจในตัวแปร n</div>
						<div className="mt-4">(Logic Consistency)</div>
					</div>
					<div className="col-span-1 text-xs text-center">1.5</div>
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div>
							<span className="text-red-600 font-bold">1.5 คะแนน</span> :
						</div>
						<div className="mt-1">- อธิบายได้ว่าจำนวนคน n ไม่มีผล ต่อวิธีการคำนวณ เพราะอัลกอริทึมนี้ใช้การส่งต่อข้อมูลจากคนสู่คน (Chain Reaction) ไม่ว่าแถวจะยาวแค่ไหนก็ใช้วิธีเดิมได้</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">1 คะแนน</span> :
						</div>
						<div className="mt-1">- อธิบายขั้นตอนถูก แต่สรุปผลไม่ได้ว่ามันใช้กับ n คนได้จริงหรือไม่</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">0.5 คะแนน</span> :
						</div>
						<div className="mt-1">- ตอบว่าจำนวนคนมีผลทำให้วิธีนี้ใช้ไม่ได้</div>
						<div className="mt-4">
							<span className="text-red-600 font-bold">0 คะแนน</span> :
						</div>
						<div className="mt-1">- มีการใช้ AI ในการตอบคำถาม</div>
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Answer2(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เฉลยเชิงตรรกะ ข้อ 2 — ตารางบันทึกสถานะ</CriteriaHead>
			<div className="text-xs mt-2 mb-1">คำชี้แจง: สถานะ Input ของเซ็นเซอร์มี 3 ระดับคือ ปกติ(🔵), ฝนตก(🟡), พายุเข้า(🔴)</div>
			<CriteriaTableBody>
				<CriteriaTableHead c1="นาที (t) / เหตุการณ์" c2="สถานะ X" c3="สถานะ Y / Z / Result" />
				<CriteriaTableSub c1="0 — เริ่มต้น" c2="🔵 Blue" c3="Y=🔵 Blue, Z=🔵 Blue → ปกติ" />
				<CriteriaTableSub c1="1 — ฝนตก" c2="🟡 Yellow" c3="Y=🔵 Blue, Z=🔴 Red → ปกติ" />
				<CriteriaTableSub c1="2 — พายุเข้า" c2="🔴 Red" c3="Y=🟡 Yellow, Z=🟡 Yellow → ปกติ" />
				<CriteriaTableSub c1="3 — พายุเข้า" c2="🔴 Red" c3="Y=🔴 Red, Z=🔵 Blue → ไฟลัดวงจร!" />
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria21(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>ด้านที่ 1: ความถูกต้องและการวิเคราะห์สถานการณ์ (4 คะแนน)</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="เกณฑ์การพิจารณา (Criteria)" c2="คะแนน" c3="ตัวอย่างพฤติกรรมคำตอบ" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">วิเคราะห์ถูกต้องสมบูรณ์:</div>
						<div className="mt-1">ระบุสถานะ t=2 และ t=3 ได้ถูกต้องครบถ้วน และชี้จุดเกิดไฟลัดวงจรที่นาทีที่ 3 พร้อมระบุคู่ที่มีปัญหาได้แม่นยำ</div>
					</div>
					<div className="col-span-1 text-xs text-center">4</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">4 คะแนน</span> : &quot;นาทีที่ 2: X=🔴, Y=🟡, Z=🟡 และนาทีที่ 3: X=🔴, Y=🔴, Z=🔵 จะเห็นว่านาทีที่ 3 หอคอย X และ Y เป็นสีแดงพร้อมกัน ซึ่งผิดกฎความเสถียรครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">วิเคราะห์ถูกต้องเป็นส่วนใหญ่:</div>
						<div className="mt-1">ระบุสถานะนาทีที่ 2 และ 3 ถูกต้อง แต่อธิบายเหตุผลการเกิดไฟลัดวงจรคลาดเคลื่อนเล็กน้อย หรือสลับระบุว่าละเมิดกฎข้อใด</div>
					</div>
					<div className="col-span-1 text-xs text-center">3</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">3 คะแนน</span> : &quot;นาทีที่ 2: X=🔴, Y=🟡, Z=🟡 นาทีที่ 3: X=🔴, Y=🔴, Z=🔵 ไฟลัดวงจรนาทีที่ 3 เพราะมีสีแดงติดกันสองหอคอยครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">วิเคราะห์ถูกต้องบางส่วน:</div>
						<div className="mt-1">ระบุนาทีที่เกิดไฟลัดวงจรถูก (นาทีที่ 3) แต่การคำนวณสถานะ X, Y, Z ในตารางผิดไม่เกิน 2 ตำแหน่ง</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">2 คะแนน</span> : &quot;นาทีที่ 2: X=🔴, Y=🔵 ... นาทีที่ 3: X=🔴, Y=🔵 ... ไฟลัดวงจรนาทีที่ 3 เพราะหอคอย Y เปลี่ยนตาม X จนเป็นสีแดงเหมือนกัน&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">ขาดความเข้าใจในเงื่อนไข:</div>
						<div className="mt-1">ระบุสถานะผิดเกือบทั้งหมด หรือระบุนาทีที่เกิดไฟลัดวงจรผิด (เช่น บอกว่าเกิดนาทีที่ 2) เนื่องจากลืมกฎ &quot;นาทีก่อนหน้า&quot; ของ Y</div>
					</div>
					<div className="col-span-1 text-xs text-center">1</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">1 คะแนน</span> : &quot;นาทีที่ 2 ไฟลัดวงจรเลย เพราะพายุเข้า X เลยเป็นสีแดงทันที (นร. ลืมดูว่า Y ยังไม่แดงตามในนาทีนั้น)&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">No Analysis:</div>
						<div className="mt-1">ไม่ส่งคำตอบ หรือระบุข้อมูลที่ไม่เกี่ยวข้องกับสถานการณ์เลย</div>
					</div>
					<div className="col-span-1 text-xs text-center">0</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">0 คะแนน</span> : &quot;หนูคิดว่าระบบน่าจะพังตั้งแต่เริ่มเลยเพราะพายุแรงเกินไปค่ะ&quot;
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria22(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>ด้านที่ 2: การออกแบบและการแก้ปัญหา (4 คะแนน)</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="เกณฑ์การพิจารณา (Criteria)" c2="คะแนน" c3="ตัวอย่างพฤติกรรมคำตอบ" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">สมบูรณ์และสร้างสรรค์:</div>
						<div className="mt-1">แก้กฎเพียงข้อเดียวที่รักษาเสถียรภาพได้ 100% โดยที่ X ยังกันพายุได้ (🔴) และหอคอยอื่นยังทำงานสัมพันธ์กันได้ปกติ</div>
					</div>
					<div className="col-span-1 text-xs text-center">4</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">4 คะแนน</span> : &quot;แก้กฎหอคอย Y: ให้ Y เปลี่ยนตาม X นาทีก่อนหน้า ยกเว้น ถ้า X ปัจจุบันเป็น 🔴 ให้ Y คงสถานะ 🟡 ไว้ก่อน เพื่อไม่ให้เกิดสีแดงคู่กันครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">แก้ปัญหาได้ตรงจุด:</div>
						<div className="mt-1">เสนอการแก้กฎข้อเดียวที่กันไฟลัดวงจรได้จริง แต่อาจทำให้ประสิทธิภาพการทำงานลดลงเล็กน้อย หรืออธิบายขั้นตอนไม่ละเอียดเท่าที่ควร</div>
					</div>
					<div className="col-span-1 text-xs text-center">3</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">3 คะแนน</span> : &quot;แก้กฎ Y ให้ห้ามเป็นสีแดงถ้า X เป็นสีแดงอยู่แล้ว ให้เป็นสีเหลืองแทนครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">แก้ปัญหาได้แต่มีผลกระทบ:</div>
						<div className="mt-1">แนวทางที่เสนอแก้ไฟลัดวงจรได้ แต่ทำให้ระบบสูญเสียฟังก์ชันสำคัญ (เช่น สั่งปิดเครื่อง Y ไปเลย ทำให้ Z ทำงานไม่ได้ไปด้วย)</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">2 คะแนน</span> : &quot;แก้กฎ Y โดยสั่งให้ Y เป็นสี 🔵 ตลอดเวลาที่พายุเข้าครับ (ผลคือ Z จะเป็นสีแดงตลอด ซึ่งอาจสิ้นเปลืองพลังงานเกินไป)&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">ไม่ตรงเงื่อนไข:</div>
						<div className="mt-1">เสนอวิธีแก้ที่ต้องเปลี่ยนกฎมากกว่า 1 ข้อ หรือวิธีแก้ไม่สามารถหยุดเหตุการณ์ไฟลัดวงจรในนาทีที่ 3 ได้จริง</div>
					</div>
					<div className="col-span-1 text-xs text-center">1</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">1 คะแนน</span> : &quot;แก้กฎ X ให้ไม่เป็นสีแดง และแก้กฎ Y ให้ดูเซนเซอร์แทน (นร. แก้กฎเกิน 1 ข้อตามที่โจทย์ห้าม)&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">Invalid Logic:</div>
						<div className="mt-1">ไม่เสนอวิธีแก้ หรือเสนอวิธีที่ไม่เกี่ยวข้องกับตรรกะระบบ เช่น &quot;ซื้อสายไฟใหม่&quot;</div>
					</div>
					<div className="col-span-1 text-xs text-center">0</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">0 คะแนน</span> : &quot;หนูจะจ้างพนักงานมานั่งเฝ้าแล้วกดปิดสวิตช์เองตอนเห็นไฟจะช็อตค่ะ&quot;
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria23(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>ด้านที่ 3: การอธิบายและการให้เหตุผล (2 คะแนน)</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="เกณฑ์การพิจารณา (Criteria)" c2="คะแนน" c3="ตัวอย่างพฤติกรรมคำตอบ" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">เหตุผลครบถ้วน (Logical):</div>
						<div className="mt-1">นำเสนอเหตุผลได้ละเอียด ถูกต้องตามหลักการทำงานของระบบ และแสดงถึงความคิดของตนเอง (Non-AI)</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">2 คะแนน</span> : &quot;เพราะหอคอย Y มีการทำงานที่ Delay กว่า X 1 จังหวะ การเพิ่มเงื่อนไขตรวจสอบสถานะปัจจุบันจะช่วยหยุด Deadlock ได้โดยไม่ต้องปิดระบบครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">เหตุผลพอสังเขป:</div>
						<div className="mt-1">มีเหตุผลรองรับแต่ยังไม่ชัดเจน หรืออธิบายสั้นเกินไปจนเห็นภาพการทำงานไม่ครบถ้วน</div>
					</div>
					<div className="col-span-1 text-xs text-center">1</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">1 คะแนน</span> : &quot;เพราะถ้าไม่แก้กฎนี้ ไฟก็จะช็อตเมืองไปเรื่อยๆ ครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">No Reasoning:</div>
						<div className="mt-1">ไม่มีการอธิบายเหตุผล หรือใช้ข้อความที่คัดลอกมาจากโจทย์โดยไม่มีการเรียบเรียงใหม่</div>
					</div>
					<div className="col-span-1 text-xs text-center">0</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">0 คะแนน</span> : &quot;ตอบตามที่โจทย์บอกไว้ในกฎความเสถียรครับ&quot;
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria31(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์คะแนน ข้อ 3</CriteriaHead>

			<div className="my-2"></div>
			<CriteriaHead>ด้านที่ 1: การเชื่อมโยงหลักฐานสมองกล (ด้านข้อมูลระบบ) (4 คะแนน)</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="เกณฑ์การพิจารณา (Criteria)" c2="คะแนน" c3="ตัวอย่างพฤติกรรมคำตอบ" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">อ้างอิงชุดข้อมูล Log ได้ 4 จุด อย่างแม่นยำ</div>
						<div className="mt-1">(เช่น เวลาสร้าง Token, ประตูชั้น 3, เวลาปิดเครื่อง, แฟลชไดรฟ์)</div>
					</div>
					<div className="col-span-1 text-xs text-center">4</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">4 คะแนน</span> : &quot;มีการสร้างรหัสตอน 22:02 และเครื่องดับตอน 22:06 โดยที่ประตูชั้น 3 เพิ่งเปิดตอน 22:08 และมีการเสียบแฟลชไดรฟ์ทิ้งไว้ครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">อ้างอิงข้อมูลจากบันทึกสมองกลได้ 3 จุดสำคัญ</div>
						<div className="mt-1">สอดคล้องกับเหตุการณ์ที่เกิดขึ้น</div>
					</div>
					<div className="col-span-1 text-xs text-center">3</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">3 คะแนน</span> : &quot;มีการสร้างรหัสตอน 22:02 และตรวจพบคนเข้าห้องควบคุมตอน 22:03 จนมีการปิดเครื่องตอน 22:06 ครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">อ้างอิงข้อมูล Log ได้ 2 จุด</div>
						<div className="mt-1">หรืออ้างหลายจุดแต่ระบุตัวเลขเวลาคลาดเคลื่อนเล็กน้อย</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">2 คะแนน</span> : &quot;ในบันทึกบอกว่าประตูชั้น 3 ทำงานคลาดเคลื่อน และมีการสร้างรหัสพิเศษ (Token) ขึ้นมาครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">อ้างอิงข้อมูลใน Log ได้เพียง 1 จุด</div>
						<div className="mt-1">หรือพูดถึงบันทึกกว้าง ๆ โดยไม่มีเลขข้อมูลประกอบ</div>
					</div>
					<div className="col-span-1 text-xs text-center">1</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">1 คะแนน</span> : &quot;มีการใช้รหัส Token ในช่วงเวลาเดียวกันกับที่เครื่องฟอกอากาศดับครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">No Evidence:</div>
						<div className="mt-1">ไม่มีการอ้างอิงข้อมูลจากบันทึกสมองกลเลย</div>
					</div>
					<div className="col-span-1 text-xs text-center">0</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">0 คะแนน</span> : &quot;หนูคิดว่าคนร้ายแอบทำตอนที่ทุกคนเผลอและไม่มีใครเห็นครับ&quot;
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria32(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์คะแนน ข้อ 3</CriteriaHead>

			<div className="my-2"></div>
			<CriteriaHead>ด้านที่ 2: การวิเคราะห์ความขัดแย้งพยาน (ด้านการจับผิด) (3 คะแนน)</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="เกณฑ์การพิจารณา (Criteria)" c2="คะแนน" c3="ตัวอย่างพฤติกรรมคำตอบ" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">ชี้จุดขัดแย้งสมบูรณ์:</div>
						<div className="mt-1">ใช้หลักฐานระบบหักล้างคำโกหกพยานได้ชัดเจน (เช่น เรื่องสถานะประตูขัดกับคำพูด)</div>
					</div>
					<div className="col-span-1 text-xs text-center">3</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">3 คะแนน</span> : &quot;พี่มดโกหกเรื่องอยู่ชั้น 3 ตลอด เพราะบันทึกประตูบอกว่าเพิ่งเปิดตอน 22:08 ซึ่งขัดกับคำพูดเขาอย่างชัดเจน&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">ชี้จุดขัดแย้งบางส่วน:</div>
						<div className="mt-1">จับผิดคำพูดพยานได้ 1 ประเด็น หรือระบุจุดที่มีพิรุธได้สอดคล้องกับจังหวะเวลา</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">2 คะแนน</span> : &quot;พี่กระอกน่าจะโกหกเพราะพี่ท่านเห็นเขาอยู่หน้าห้องควบคุม ทั้งที่เจ้าตัวบอกว่าอยู่นอกเมือง&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">ระบุความน่าสงสัยกว้าง ๆ:</div>
						<div className="mt-1">บอกได้ว่าพยานคนไหนมีพิรุธแต่ยังหาหลักฐานระบบมาหักล้างไม่ได้</div>
					</div>
					<div className="col-span-1 text-xs text-center">1</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">1 คะแนน</span> : &quot;หนูสงสัยพี่มดเพราะเขาลงไปล้างหน้าตอนเครื่องดับพอดี ดูจงใจมากเกินไป&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">No Analysis:</div>
						<div className="mt-1">ไม่มีการวิเคราะห์ความขัดแย้ง หรือเชื่อพยานทุกอย่างโดยไม่ตั้งคำถาม</div>
					</div>
					<div className="col-span-1 text-xs text-center">0</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">0 คะแนน</span> : &quot;พี่เต่าน่าจะเป็นคนดีเพราะเขานั่งเฝ้าจออยู่เฉย ๆ ไม่ได้ลุกไปไหนเลยครับ&quot;
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria33(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์คะแนน ข้อ 3</CriteriaHead>

			<div className="my-2"></div>
			<CriteriaHead>ด้านที่ 3: ความสมเหตุสมผลเชิงตรรกะ (ด้านวิธีการ) (2 คะแนน)</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="เกณฑ์การพิจารณา (Criteria)" c2="คะแนน" c3="ตัวอย่างพฤติกรรมคำตอบ" />
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">สมมติฐานยอดเยี่ยม:</div>
						<div className="mt-1">ลำดับขั้นตอนการก่อเหตุสอดคล้องกับกติกาเรื่อง Token และการเคลื่อนที่ระหว่างชั้น</div>
					</div>
					<div className="col-span-1 text-xs text-center">2</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">2 คะแนน</span> : &quot;คนร้ายต้องไปเอารหัสที่ห้องใต้ดินก่อนในช่วงที่ประตูชั้น 3 มีปัญหา แล้วค่อยขึ้นไปที่ชั้น 2 เพื่อสั่งปิดเครื่องครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">สมมติฐานมีช่องโหว่:</div>
						<div className="mt-1">อธิบายวิธีการได้แต่ข้ามขั้นตอนสำคัญ (เช่น ไม่ได้อธิบายว่าคนร้ายเอา Token มาจากไหน)</div>
					</div>
					<div className="col-span-1 text-xs text-center">1</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">1 คะแนน</span> : &quot;คนร้ายแอบไปห้องควบคุมแล้วสั่งปิดเครื่องในชื่อของพี่มดทันทีครับ&quot;
					</div>
				</div>
				<div className="grid grid-cols-5 border first:rounded-t-lg last:rounded-b-lg px-3 py-3 hover:bg-white/10 duration-300">
					<div className="col-span-2 text-xs text-start break-words flex flex-col">
						<div className="font-bold">No Logic:</div>
						<div className="mt-1">เหตุผลขัดแย้งกับกฎของโจทย์อย่างรุนแรง หรือไม่มีเหตุผลประกอบ</div>
					</div>
					<div className="col-span-1 text-xs text-center">0</div>
					<div className="col-span-2 text-xs text-start break-words">
						<span className="text-red-600 font-bold">0 คะแนน</span> : &quot;คนร้ายน่าจะใช้รีโมทสั่งปิดจากระยะไกล หรือแอบปิดจากนอกกำแพงเมืองครับ&quot;
					</div>
				</div>
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

export function Criteria34(): React.JSX.Element {
	return (
		<CriteriaBody>
			<CriteriaHead>เกณฑ์คะแนน ข้อ 3</CriteriaHead>

			<div className="my-2"></div>
			<CriteriaHead>ด้านที่ 4: ความตั้งใจและการเรียบเรียง (ด้านพิเศษ - Non-AI) (1 คะแนน)</CriteriaHead>
			<CriteriaTableBody>
				<CriteriaTableHead c1="เกณฑ์การพิจารณา (Criteria)" c2="คะแนน" c3="รายละเอียด" />
				<CriteriaTableSub c1="Good Flow: เรียบเรียงด้วยภาษาของตัวเอง มีความเป็นธรรมชาติ แสดงถึงความตั้งใจในการวิเคราะห์" c2="1" c3="" score={true} />
				<CriteriaTableSub c1="Low Effort: มีการเขียนตอบแต่เป็นการลอกประโยคจากโจทย์มาวางต่อกัน หรือใช้ภาษาที่ดูแข็งทื่อ" c2="0.5" c3="" score={true} />
				<CriteriaTableSub c1="No Effort: ไม่เขียนคำอธิบายเพิ่มเติม หรือใช้ข้อความที่คัดลอกมาโดยไม่มีการเรียบเรียงใหม่" c2="0" c3="" score={true} />
			</CriteriaTableBody>
		</CriteriaBody>
	);
}

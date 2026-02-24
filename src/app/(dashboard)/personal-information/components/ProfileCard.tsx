"use client";

import Image from "next/image";
import { useState } from "react"; // ลบ useEffect ออก
import { Card, CardContent } from "@/components/ui/card";
import { StudentDetail } from "@/types/student";

export default function ProfileCard({ data }: { data: StudentDetail }) {
	const googleImg = data.std_user?.image || null;
	const [imageError, setImageError] = useState(false);

	const getDecodedName = () => {
		const firstName = data.std_info?.std_info_first_name || "";
		try {
			return decodeURIComponent(firstName.replace(/\+/g, "%20"));
		} catch (e) {
			return firstName;
		}
	};

	const decodedName = getDecodedName();
	const initialLetter = decodedName.charAt(0) || "?";

	return (
		<Card>
			<CardContent className="p-4 sm:p-6 flex items-center justify-center">
				<div className="w-full aspect-square max-w-[180px] sm:max-w-[250px] md:max-w-[300px] rounded-full sm:rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-5xl sm:text-6xl font-bold uppercase shadow-inner overflow-hidden transition-all duration-300 relative">
					{googleImg && !imageError ? (
						<Image
							src={googleImg.replace(/^http:\/\//i, "https://")}
							alt={`รูปโปรไฟล์ของ ${decodedName}`}
							className="w-full h-full object-cover"
							width={300}
							height={300}
							priority
							unoptimized={true}
							referrerPolicy="no-referrer"
							onError={() => setImageError(true)}
						/>
					) : (
						<>{initialLetter}</>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

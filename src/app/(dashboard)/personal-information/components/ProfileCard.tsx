"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react"; // ลบ useEffect ออก
import { Card, CardContent } from "@/components/ui/card";
import { config } from "@/config/config";
import { StudentDetail } from "@/types/student";

export default function ProfileCard({ data, profileFileKey }: { data: StudentDetail; profileFileKey?: string }) {
	const [profileImg, setProfileImg] = useState<string | null>(null);
	const [isProfileLoading, setIsProfileLoading] = useState(false);
	const [imageError, setImageError] = useState(false);

	const getDecodedName = () => {
		const firstName = data.std_info?.std_info_first_name || "";
		try {
			return decodeURIComponent(firstName.replace(/\+/g, "%20"));
		} catch (e) {
			return firstName;
		}
	};

	useEffect(() => {
		if (!profileFileKey) return;

		setIsProfileLoading(true);
		(async () => {
			try {
				axios.defaults.withCredentials = true;
				const profileRes = await axios.get(`${config.backend.baseUrl}/api/staff/file/${profileFileKey}`);
				setProfileImg(profileRes.data.url);
			} catch (e) {
				console.log(e);
			} finally {
				setIsProfileLoading(false);
			}
		})();
	}, [profileFileKey]);

	const decodedName = getDecodedName();
	const initialLetter = decodedName.charAt(0) || "?";

	return (
		<Card>
			<CardContent className="p-4 sm:p-6 flex items-center justify-center">
				<div className="w-full aspect-square max-w-[180px] sm:max-w-[250px] md:max-w-[300px] rounded-full sm:rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-5xl sm:text-6xl font-bold uppercase shadow-inner overflow-hidden transition-all duration-300 relative">
					{profileImg && !imageError ? (
						<Image src={profileImg} alt={`รูปโปรไฟล์ของ ${decodedName}`} className="w-full h-full object-cover" width={300} height={300} priority unoptimized={true} referrerPolicy="no-referrer" onError={() => setImageError(true)} />
					) : (
						<>{isProfileLoading ? <Loader2 className="animate-spin" size={50} /> : initialLetter}</>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

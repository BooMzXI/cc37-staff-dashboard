"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { StudentDetail } from "@/types/student";

export default function ProfileCard({ data }: { data: StudentDetail }) {
  const [imgSrc, setImgSrc] = useState<string | null>(data.std_user?.image || null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const hasProfileFile = data.std_file?.some(
    (file) => file.std_file_type === "file_face"
  );

  useEffect(() => {
    setImageError(false);
    const googleImg = data.std_user?.image || null;
    if (!hasProfileFile) {
      setImgSrc(googleImg);
      setIsLoading(false);
      return;
    }

    const fetchImageUrl = async () => {
      try {
        const res = await fetch(`/api/file/${data.std_application_id}/file_face`);
        if (!res.ok) throw new Error("Failed to fetch file info");
        
        const result = await res.json();
        if (result && result.length > 0 && result[0].file_url) {
          setImgSrc(result[0].file_url);
        } else {
          setImgSrc(googleImg);
        }
      } catch (error) {
        console.error("Error loading image URL:", error);
        setImgSrc(googleImg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageUrl();
  }, [hasProfileFile, data.std_application_id, data.std_user?.image]);

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
          
          {isLoading ? (
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground/50" />
          ) : imgSrc && !imageError ? (
            <Image
              src={imgSrc.replace(/^http:\/\//i, 'https://')}
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
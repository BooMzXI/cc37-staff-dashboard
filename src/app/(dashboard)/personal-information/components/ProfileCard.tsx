"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { StudentDetail } from "@/types/student";

export default function ProfileCard({ data }: { data: StudentDetail }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hasProfileFile = data.std_file?.some(
    (file) => file.std_file_type === "file_face"
  );

  useEffect(() => {
    if (!hasProfileFile) {
      setImageUrl(data.std_user?.image || null);
      setIsLoading(false);
      return;
    }

    const fetchImageUrl = async () => {
      try {
        const res = await fetch(`/api/file/${data.std_application_id}/file_face`);
        if (!res.ok) throw new Error("Failed to fetch file info");
        
        const result = await res.json();
        if (result && result.length > 0 && result[0].file_url) {
          setImageUrl(result[0].file_url);
        }
      } catch (error) {
        console.error("Error loading image URL:", error);
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
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={`รูปโปรไฟล์ของ ${decodedName}`}
              className="w-full h-full object-cover"
              width={300}
              height={300}
              priority
              unoptimized={true}
            />
          ) : (
            <>{initialLetter}</>
          )}

        </div>
      </CardContent>
    </Card>
  );
}
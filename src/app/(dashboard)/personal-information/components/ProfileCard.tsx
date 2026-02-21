import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { StudentDetail } from "@/types/student";

export default function ProfileCard({ data }: { data: StudentDetail }) {
  const profileFile = data.std_file?.find(
    (file) => file.std_file_type === "file_face"
  );
  const imageUrl = profileFile
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${profileFile.std_file_key}`
    : data.std_user?.image;

  return (
    <Card>
      <CardContent className="p-4 sm:p-6 flex items-center justify-center">
        <div className="w-full aspect-square max-w-[180px] sm:max-w-[250px] md:max-w-[300px] rounded-full sm:rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-5xl sm:text-6xl font-bold uppercase shadow-inner overflow-hidden transition-all duration-300">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`รูปโปรไฟล์ของ ${data.std_info?.std_info_first_name || ""}`}
              className="w-full h-full object-cover"
              width={300}
              height={300}
              priority
            />
          ) : (
            <>{data.std_info?.std_info_first_name?.charAt(0) || "?"}</>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
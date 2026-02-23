import { CircleCheckBig, CircleX } from "lucide-react";

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) => {
  const displayValue = () => {
    if (value === null || value === undefined || value === "") return "-";

    if (typeof value === "boolean") {
      return value ? (
        <CircleCheckBig className="w-4 h-4 text-green-500" />
      ) : (
        <CircleX className="w-4 h-4 text-red-500" />
      );
    }

    if (typeof value !== "string") return value;

    try {
      let decoded = decodeURIComponent(value.replace(/\+/g, "%20"));
      if (decoded.trim() === "ไม่สะดวกนำมา") {
        return <CircleX className="w-4 h-4 text-red-500" />;
      }
      decoded = decoded.replace(/\s*รายละเอียดเพิ่มเติม\s*(?:["']?-["']?|""|''|["']?ไม่มี["']?)/g, "");
      if (decoded.trim() === "" || decoded.trim() === "-") {
        return "-";
      }
      return decoded;
    } catch (e) {
      return value;
    }
  };

  return (
    <div className="flex items-start py-3 border-b border-border last:border-0 gap-4 w-full">
      <div className="w-[140px] sm:w-[160px] text-muted-foreground text-sm shrink-0">
        {label}:
      </div>
      <div className="flex-1 min-w-0 text-sm font-medium text-foreground break-words text-left flex items-center h-full min-h-[20px]">
        {displayValue()}
      </div>
    </div>
  );
};
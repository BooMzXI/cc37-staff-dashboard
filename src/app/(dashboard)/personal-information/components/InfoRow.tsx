import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) => {
  const displayValue = () => {
    if (value === null || value === undefined || value === "") return "-"
    if (typeof value === "boolean") return value ? <CircleCheckBig className="w-4 h-4 text-green-500" /> : <CircleX className="w-4 h-4 text-red-500" />;
    if (typeof value !== "string") return value;
    try {
      return decodeURIComponent(value.replace(/\+/g, "%20"));
    } catch (e) {
      return value;
    }
  };

  return (
    <div className="flex items-start py-3 border-b border-border last:border-0 gap-4 w-full">
      <div className="w-[140px] sm:w-[160px] text-muted-foreground text-sm shrink-0">
        {label}:
      </div>
      
      <div className="flex-1 min-w-0 text-sm font-medium text-foreground break-words text-left">
        {displayValue()}
      </div>
    </div>
  );
};
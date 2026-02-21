export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start py-3 border-b border-border last:border-0 gap-4 w-full">
    <div className="w-[120px] md:w-[140px] text-muted-foreground text-sm shrink-0">
      {label}:
    </div>
    <div className="flex-1 min-w-0 text-sm font-medium text-foreground break-all text-left">
      {value}
    </div>
  </div>
);
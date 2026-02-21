export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex py-3 border-b border-border last:border-0">
    <span className="w-2/5 text-muted-foreground text-sm shrink-0">
      {label}:
    </span>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </div>
);
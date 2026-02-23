import { CheckCircle2, XCircle } from "lucide-react";

export const StatusBadge = ({
  checked,
  label,
}: {
  checked: boolean;
  label: string;
}) => (
  <span className="inline-flex items-center gap-1.5 text-sm mr-4 mb-2">
    {label}:
    {checked ? (
      <CheckCircle2 className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-destructive" />
    )}
  </span>
);
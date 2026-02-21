import { CheckCircle2, Clock, XCircle } from "lucide-react";

export const StatusApplication = ({
  status,
  result,
}: {
  status: boolean;
  result?: string;
}) => {
  const isPending = result === "waiting_for_announcement";

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 py-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-amber-500">
          <span>รอประกาศผล</span>
          <Clock className="h-10 w-10" />
        </div>
        <p className="text-muted-foreground">ผลการตัดสิน: {result}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-6">
      <div
        className={`flex items-center gap-3 text-2xl font-bold ${
          status ? "text-green-600" : "text-destructive"
        }`}
      >
        <span>{status ? "ผ่านการคัดเลือก" : "ไม่ผ่านการคัดเลือก"}</span>
        {status ? (
          <CheckCircle2 className="h-10 w-10" />
        ) : (
          <XCircle className="h-10 w-10" />
        )}
      </div>

      {result && (
        <p className="text-muted-foreground">
          ผลการตัดสิน:{" "}
          <span className="font-medium text-foreground">{result}</span>
        </p>
      )}
    </div>
  );
};
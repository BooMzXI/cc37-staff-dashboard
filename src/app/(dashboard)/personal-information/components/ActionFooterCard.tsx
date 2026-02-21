"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const StatusApplication = ({ status, result }: { status: boolean; result?: string }) => {
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
      <div className={`flex items-center gap-3 text-2xl font-bold ${status ? "text-green-600" : "text-destructive"}`}>
        <span>{status ? "ผ่านการคัดเลือก" : "ไม่ผ่านการคัดเลือก"}</span>
        {status ? <CheckCircle2 className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
      </div>
      {result && (
        <p className="text-muted-foreground">
          ผลการตัดสิน: <span className="font-medium text-foreground">{result}</span>
        </p>
      )}
    </div>
  );
};

interface ActionFooterProps {
  passStatus: boolean;
  result?: string;
  updatedAt?: string;
  formatThaiDateTime: (date?: string) => string;
}

export default function ActionFooterCard({ passStatus, result, updatedAt, formatThaiDateTime }: ActionFooterProps) {
  const [checkStatus, setCheckStatus] = useState<"correct" | "incorrect" | "pending">("pending");
  const handleUpdateCheckStatus = async (newStatus: "correct" | "incorrect" | "pending") => {
    setCheckStatus(newStatus);
    //ผูก API Update ทีหลัง
  };

  return (
    <Card className="border-2 border-muted/50">
      <CardContent className="p-6 text-center flex flex-col items-center">
        <StatusApplication status={passStatus} result={result} />
        
        <div className="mt-2 mb-6 text-sm text-muted-foreground bg-muted/30 py-2 px-4 rounded-full inline-block">
          อัปเดตสถานะล่าสุดเมื่อ: <span className="font-medium text-foreground">{formatThaiDateTime(updatedAt)}</span>
        </div>

        <Separator className="w-1/2 mb-6" />
        <h3 className="text-sm font-semibold text-foreground mb-4">จัดการสถานะการตรวจสอบข้อมูล</h3>
        
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl mx-auto">
          <Button
            className={`flex-1 min-w-[180px] min-h-[50px] ${checkStatus === "correct" ? "opacity-50" : "bg-green-600 hover:bg-green-700 text-white"}`}
            variant={checkStatus === "correct" ? "outline" : "default"}
            disabled={checkStatus === "correct"}
            onClick={() => handleUpdateCheckStatus("correct")}
          >
            <CheckCircle2 className="mr-2 h-5 w-5" /> ข้อมูลถูกต้อง
          </Button>

          <Button
            className={`flex-1 min-w-[180px] min-h-[50px] ${checkStatus === "incorrect" ? "opacity-50" : "bg-red-600 hover:bg-red-700 text-white"}`}
            variant={checkStatus === "incorrect" ? "outline" : "default"}
            disabled={checkStatus === "incorrect"}
            onClick={() => handleUpdateCheckStatus("incorrect")}
          >
            <XCircle className="mr-2 h-5 w-5" /> ข้อมูลไม่ถูกต้อง
          </Button>

          <Button
            className="flex-1 min-w-[180px] min-h-[50px] text-amber-600 border-amber-500 hover:bg-amber-50"
            variant="outline"
            disabled={checkStatus === "pending"}
            onClick={() => handleUpdateCheckStatus("pending")}
          >
            <Clock className="mr-2 h-5 w-5" /> รอส่งเอกสารเพิ่มเติม
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
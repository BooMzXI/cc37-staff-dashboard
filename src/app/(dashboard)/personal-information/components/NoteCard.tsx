"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function NoteCard({ applicationId }: { applicationId: string }) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const handleNoteSubmit = async (isNote: boolean, content: string = "") => {
    if (!applicationId) return;

    if (isNote && !content.trim()) {
      alert("กรุณาพิมพ์หมายเหตุก่อนบันทึก");
      return;
    }

    setIsSubmittingNote(true);
    try {
      const res = await fetch("/api/staff/application/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_id: applicationId,
          is_note: isNote,
          app_note: content,
        }),
      });

      if (!res.ok) throw new Error("Failed to update note");
      alert(isNote ? "บันทึกหมายเหตุสำเร็จ!" : "ลบหมายเหตุสำเร็จ!");
      setIsEditingNote(false);

      if (!isNote) setNoteText("");
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการจัดการหมายเหตุ");
    } finally {
      setIsSubmittingNote(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">หมายเหตุจากสตาฟ</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isEditingNote ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <Textarea
              placeholder="พิมพ์หมายเหตุเกี่ยวกับน้องคนนี้..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="min-h-[100px] resize-none mb-4"
            />
          </div>
        </div>

        <div className="flex w-full gap-2 mt-2">
          {!isEditingNote ? (
            <>
              <Button variant="outline" className="w-full flex-1" onClick={() => setIsEditingNote(true)}>
                เพิ่มหมายเหตุ
              </Button>
              <Button
                variant="destructive"
                className="w-full flex-1"
                onClick={() => {
                  if (confirm("ยืนยันการลบหมายเหตุ?")) {
                    handleNoteSubmit(false, "");
                  }
                }}
              >
                ลบหมายเหตุ
              </Button>
            </>
          ) : (
            <>
              <Button
                className="w-full flex-1"
                onClick={() => handleNoteSubmit(true, noteText)}
                disabled={isSubmittingNote || !noteText.trim()}
              >
                {isSubmittingNote && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                บันทึก
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground flex-1"
                onClick={() => setIsEditingNote(false)}
                disabled={isSubmittingNote}
              >
                ยกเลิก
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
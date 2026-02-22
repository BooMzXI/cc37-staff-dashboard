"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function NoteCard({ applicationId, note }: { applicationId: string; note?: string }) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(note || "");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const handleNoteSubmit = async (isNote: boolean, content: string = "") => {
    if (!applicationId) return;

    if (isNote && !content.trim()) {
      alert("กรุณาพิมพ์หมายเหตุก่อนบันทึก");
      return;
    }

    setIsSubmittingNote(true);
    try {
      const res = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_id: applicationId,
          is_note: isNote,
          app_note: content,
        }),
      });

      if (!res.ok) throw new Error("Failed to update note");
      
      setIsEditingNote(false);

      if (!isNote) setNoteText("");
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการจัดการหมายเหตุ");
    } finally {
      setIsSubmittingNote(false);
      window.location.reload()
    }
  };

  return (
    <Card>
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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                  variant="destructive" 
                  className="w-full flex-1"
                  disabled={isSubmittingNote || !noteText.trim()}
                  >
                    ลบหมายเหตุ
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ยืนยันการลบหมายเหตุ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      การกระทำนี้ไม่สามารถย้อนกลับได้ หมายเหตุของน้องคนนี้จะถูกลบออกจากระบบทันที
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleNoteSubmit(false, "")}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      ยืนยันการลบ
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full flex-1"
                    disabled={isSubmittingNote || !noteText.trim()}
                  >
                    {isSubmittingNote && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    บันทึก
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ยืนยันการบันทึกหมายเหตุ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      ระบบจะทำการบันทึกหรืออัปเดตหมายเหตุสำหรับผู้สมัครรายนี้ 
                      สตาฟท่านอื่นจะสามารถมองเห็นข้อความนี้ได้
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleNoteSubmit(true, noteText)}>
                      ยืนยันการบันทึก
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                variant="ghost"
                className="w-full text-muted-foreground flex-1"
                onClick={() => {
                    setIsEditingNote(false)
                    setNoteText(note || "");
                }}
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
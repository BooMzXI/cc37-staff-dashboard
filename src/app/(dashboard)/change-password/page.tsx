"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Check, X } from "lucide-react";

import { authClient } from "@/lib/auth-client"; 

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reqLength = newPassword.length >= 8;
  const reqLower = /[a-z]/.test(newPassword);
  const reqUpper = /[A-Z]/.test(newPassword);
  const reqNumber = /[0-9]/.test(newPassword);
  const isPasswordValid = reqLength && reqLower && reqUpper && reqNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (!isPasswordValid) {
      toast.warning("รหัสผ่านใหม่ยังไม่ผ่านเงื่อนไขที่กำหนด");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true, 
      });

      if (error) {
        toast.error(error.message || "รหัสผ่านปัจจุบันไม่ถูกต้อง หรือเกิดข้อผิดพลาด");
      } else {
        toast.success("เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว!");
        
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      toast.error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    } finally {
      setIsLoading(false);
    }
  };

  const RequirementItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-xs ${isValid ? "text-green-600" : "text-muted-foreground"}`}>
      {isValid ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">เปลี่ยนรหัสผ่าน</CardTitle>
          <CardDescription>
            กรุณากรอกรหัสผ่านปัจจุบันและรหัสผ่านใหม่ของคุณ
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="current-password">รหัสผ่านปัจจุบัน</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="รหัสผ่านเดิม"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="new-password">รหัสผ่านใหม่</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="รหัสผ่านใหม่"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <div className="space-y-2 text-left">
              <Label htmlFor="confirm-password">ยืนยันรหัสผ่านใหม่</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="ยืนยันรหัสผ่านใหม่"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
              <div className="pt-2 space-y-1.5">
                <RequirementItem isValid={reqLength} text="ความยาวอย่างน้อย 8 ตัวอักษร" />
                <RequirementItem isValid={reqLower} text="มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว (a-z)" />
                <RequirementItem isValid={reqUpper} text="มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว (A-Z)" />
                <RequirementItem isValid={reqNumber} text="มีตัวเลขอย่างน้อย 1 ตัว (0-9)" />
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isLoading || (!isPasswordValid && newPassword.length > 0)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังดำเนินการ...
                </>
              ) : (
                "บันทึกรหัสผ่านใหม่"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
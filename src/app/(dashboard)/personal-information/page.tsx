"use client";

import PageTitle from "@/components/PageTitle";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { columns, StudentApplication } from "./column"; //import ข้อมูลคอลัมน์และประเภทข้อมูลจากไฟล์ column.ts เดี่ยวใช้จริงในอนาคตถ้ามีการดึงข้อมูลจาก API มาแสดงแทน mock data

export default function PersonalInformation() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StudentApplication[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/personal-information`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <PageTitle
        title="Personal Information"
        description={`ข้อมูลส่วนตัวของนักเรียน`}
      />
      <div className="mt-6 rounded-lg shadow-sm">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

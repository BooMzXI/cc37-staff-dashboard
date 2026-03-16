"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { config } from "@/config/config";
import { columns, StudentConfirmation } from "./column";
import { generateMockData } from "./mock/mockData";

export default function PersonalConfirmation() {
	const [loading, setLoading] = useState(true); // อย่าลืมเปลี่ยนเป็น true หลังเทส
	const [data, setData] = useState<StudentConfirmation[]>([]);

	useEffect(() => {
		const fetchMockData = () => {
			setTimeout(() => {
				const mockStudents = generateMockData();
				setData(mockStudents);
				setLoading(false);
			}, 1000);
		};

		fetchMockData();
	}, []);

	/*useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(``, {
                    method: "GET",
                    credentials: "include",
                });
                
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
    }, []);*/

	if (loading) return <Loading />;

	const maleM4 = data.filter((s) => s.std_info?.std_info_gender === "male" && s.std_info?.std_info_education_level?.includes("4"));
	const maleM5 = data.filter((s) => s.std_info?.std_info_gender === "male" && s.std_info?.std_info_education_level?.includes("5"));
	const femaleM4 = data.filter((s) => s.std_info?.std_info_gender === "female" && s.std_info?.std_info_education_level?.includes("4"));
	const femaleM5 = data.filter((s) => s.std_info?.std_info_gender === "female" && s.std_info?.std_info_education_level?.includes("5"));

	return (
		<>
			<PageTitle title="Personal Confirmation" description={`การประกาศผลและยืนยันสิทธิ์ของนักเรียน`} />

			<div className="mt-6">
				<Tabs defaultValue="male-m4" className="w-full">
					<TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
						<TabsTrigger value="male-m4">ชาย ม.4</TabsTrigger>
						<TabsTrigger value="male-m5">ชาย ม.5</TabsTrigger>
						<TabsTrigger value="female-m4">หญิง ม.4</TabsTrigger>
						<TabsTrigger value="female-m5">หญิง ม.5</TabsTrigger>
					</TabsList>

					<div className="rounded-lg shadow-sm bg-card">
						<TabsContent value="male-m4" className="mt-0">
							<DataTable columns={columns} data={maleM4} />
						</TabsContent>

						<TabsContent value="male-m5" className="mt-0">
							<DataTable columns={columns} data={maleM5} />
						</TabsContent>

						<TabsContent value="female-m4" className="mt-0">
							<DataTable columns={columns} data={femaleM4} />
						</TabsContent>

						<TabsContent value="female-m5" className="mt-0">
							<DataTable columns={columns} data={femaleM5} />
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</>
	);
}

"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { STATS_CONFIG, type StatisticData } from "@/config/dashboard-stats";

export default function Dashboard() {
  const [data, setData] = useState<StatisticData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/staff/statistic`,
          {
            credentials: "include",
          },
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground">Welcome back!</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data &&
          STATS_CONFIG.map((stat) => {
            const value = data[stat.key as keyof StatisticData];
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium text-muted-foreground ${stat.color || ""}`}
                  >
                    {stat.label}
                  </span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="mt-2 text-2xl font-bold text-card-foreground">
                  {value}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}

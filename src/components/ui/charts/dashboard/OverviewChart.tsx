"use client";
import React from "react";
import ChartArea from "@/components/ui/charts/chart-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/shadcn/card";
import { TrendingUp } from "lucide-react";
import { DasboardOverviewChartData, ChartRange } from "@/types/Graphics";
import { Button } from "@/components/ui/shadcn/button";

export default function OverviewChart({
  chartdata,
}: {
  chartdata: DasboardOverviewChartData;
}) {
  const availableRanges = (
    Object.keys(chartdata.data ?? {}) as ChartRange[]
  ).filter((k): k is ChartRange => k === "week" || k === "month");
  const defaultRange: ChartRange = availableRanges.includes("month")
    ? "month"
    : (availableRanges[0] ?? "week");
  const [range, setRange] = React.useState<ChartRange>(defaultRange);
  const chartData = chartdata.data?.[range] ?? [];

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>{chartdata.title}</CardTitle>
          {chartdata.description && (
            <CardDescription>{chartdata.description}</CardDescription>
          )}
        </div>
        <div className="flex gap-2">
          {availableRanges.map((key) => (
            <Button
              key={key}
              variant={range === key ? "default" : "outline"}
              onClick={() => setRange(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartArea data={chartData} areaColor="blue" />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

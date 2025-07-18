"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/shadcn/chart";
import { ChartComponentProps } from "@/types/Graphics";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function ChartArea({
  weekData = [],
  monthData = [],
  title,
  description,
  areaColor,
}: ChartComponentProps) {
  const [range, setRange] = React.useState<"week" | "month">("month");
  const chartData = range === "week" ? weekData : monthData;
  const color = areaColor || "var(--color-primary)";

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded border ${range === "week" ? "bg-primary text-white" : "bg-muted"}`}
            onClick={() => setRange("week")}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 rounded border ${range === "month" ? "bg-primary text-white" : "bg-muted"}`}
            onClick={() => setRange("month")}
          >
            Month
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={range === "week" ? "day" : "month"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill={color}
              fillOpacity={0.4}
              stroke={color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

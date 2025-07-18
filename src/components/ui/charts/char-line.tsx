"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/shadcn/chart";
import { ChartComponentProps } from "@/types/Graphics";
import { useMemo } from "react";

export default function ChartLine({ data, areaColor }: ChartComponentProps) {
  const chartConfig = useMemo(() => {
    return {
      desktop: {
        color: areaColor,
      },
    } satisfies ChartConfig;
  }, [areaColor]);
  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="value"
            type="natural"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

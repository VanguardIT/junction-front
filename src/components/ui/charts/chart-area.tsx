"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/shadcn/chart";
import { ChartComponentProps } from "@/types/Graphics";

export default function ChartArea({ data, areaColor }: ChartComponentProps) {
  const color = areaColor || "var(--color-primary)";
  const chartConfig = useMemo(() => {
    return {
      desktop: {
        color: color,
      },
    } satisfies ChartConfig;
  }, [color]);

  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig}>
        <AreaChart
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
    </div>
  );
}

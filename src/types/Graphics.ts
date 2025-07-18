export type ChartRange = "week" | "month";

export interface ChartComponentProps {
  weekData?: Array<{ day: string; value: number }>;
  monthData?: Array<{ month: string; value: number }>;
  title: string;
  description?: string;
  areaColor?: string;
}

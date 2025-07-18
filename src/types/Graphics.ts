export type ChartRange = "week" | "month";

export interface ChartComponentProps {
  data?: Array<{ date: string; value: number }>;
  areaColor?: string;
}

export interface DasboardOverviewChartData {
  title: string;
  description?: string;
  data?: {
    week?: Array<{ date: string; value: number }>;
    month?: Array<{ date: string; value: number }>;
  };
}

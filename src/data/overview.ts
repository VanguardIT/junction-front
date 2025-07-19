import { Alert } from "@/types/Alert";
import { DasboardOverviewChartData } from "@/types/Graphics";
import { Task } from "@/types/Task";

export const chartdata: DasboardOverviewChartData = {
  title: "Oxygen Dissolve",
  description: "Oxygen dissolve in the pond",
  data: {
    week: [
      { date: "Mon", value: 180 },
      { date: "Tue", value: 210 },
      { date: "Wed", value: 200 },
      { date: "Thu", value: 220 },
      { date: "Fri", value: 230 },
      { date: "Sat", value: 250 },
      { date: "Sun", value: 240 },
    ],
    month: [
      { date: "January", value: 186 },
      { date: "February", value: 305 },
      { date: "March", value: 237 },
    ],
  },
};

export const alerts: Alert[] = [
  {
    pondId: "1",
    region: 1,
    note: "Pond 1 is in good condition",
    status: "pending",
    time: "2021-01-01",
  },
  {
    pondId: "2",
    region: 2,
    note: "Pond 2 is in good condition",
    status: "in progress",
    time: "2021-01-02",
  },
];

export const tasks: Task[] = [
  {
    title: "Success! Your changes have been saved",
    description: "This is an alert with icon, title and description.",
  },
  {
    title: "Success! Your changes have been saved",
    description: "This is an alert with icon, title and description.",
  },
  {
    title: "Success! Your changes have been saved",
    description: "This is an alert with icon, title and description.",
  },
];

import { Alert } from "@/types/Alert";
import { ChartComponentProps } from "@/types/Graphics";
import { Task } from "@/types/Task";

export const chartdata: ChartComponentProps = {
  title: "Oxygen Dissolve",
  description: "Oxygen dissolve in the pond",
  weekData: [
    { day: "Mon", value: 180 },
    { day: "Tue", value: 210 },
    { day: "Wed", value: 200 },
    { day: "Thu", value: 220 },
    { day: "Fri", value: 230 },
    { day: "Sat", value: 250 },
    { day: "Sun", value: 240 },
  ],
  monthData: [
    { month: "January", value: 186 },
    { month: "February", value: 305 },
    { month: "March", value: 237 },
  ],
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

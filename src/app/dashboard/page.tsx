"use client";
import Table from "@/components/ui/Table";
import TaskAlert from "@/components/ui/alerts/TaskAlert";
import OverviewChart from "@/components/ui/charts/dashboard/OverviewChart";
import { alerts, chartdata, tasks } from "@/data/overview";

const alertColumns = [
  { key: "pondId", header: "Pond" },
  { key: "region", header: "Regions" },
  { key: "note", header: "Note" },
  {
    key: "status",
    header: "Status",
    render: (row: any) => {
      const statusColors = {
        done: "bg-success text-white",
        "in progress": "bg-warning text-white",
        pending: "bg-info text-white",
      };
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[row.status] || "bg-gray text-white"} block`}
        >
          {row.status}
        </span>
      );
    },
  },
  { key: "time", header: "Time" },
];

export default function Page() {
  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-2 border-l-4 border-primary pl-4 w-1/3 justify-between max-h-40">
          <h3 className="text-h2">Regions</h3>
          <p className="text-lead">+2</p>
        </div>
        <div className="flex flex-col gap-2 border-l-4 border-primary pl-4 w-1/3 justify-between max-h-40">
          <h3 className="text-h2">Ponds</h3>
          <p className="text-lead">+20</p>
        </div>
        <div className="flex flex-col gap-2 border-l-4 border-primary pl-4 w-1/3 justify-between max-h-40">
          <h3 className="text-h2">Sensors</h3>
          <p className="text-lead">+100</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-h2 text-primary/80">Oxygen Dissolve</h2>
        <OverviewChart chartdata={chartdata} />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-h2 text-primary/80">Alerts</h2>
        <Table
          columns={alertColumns}
          data={alerts}
          rowKey={(row) => `${row.pondId}-${row.time}`}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-h2 text-primary/80">Tasks</h2>
        <TaskAlert tasks={tasks} />
      </div>
    </>
  );
}

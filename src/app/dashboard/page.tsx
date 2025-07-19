import AlertTable from "@/components/ui/alerts/AlertTable";
import TaskAlert from "@/components/ui/alerts/TaskAlert";
import ChartArea from "@/components/ui/charts/chart-area";
import OverviewChart from "@/components/ui/charts/dashboard/OverviewChart";
import { alerts, chartdata, tasks } from "@/data/overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fishta",
  description: "Dashboard",
};

export default function Page() {
  return (
    <div className="flex gap-4 w-full h-full p-4">
      <div className="flex flex-1 flex-col gap-4 w-1/2 h-full">
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-4">
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
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-full gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-h2 text-primary/80">Alerts</h2>
            <AlertTable alerts={alerts} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-h2 text-primary/80">Tasks</h2>
            <TaskAlert tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}

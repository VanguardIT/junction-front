"use client";
import AlertTable from "@/components/ui/alerts/AlertTable";
import TaskAlert from "@/components/ui/alerts/TaskAlert";
import ChartArea from "@/components/ui/charts/chart-area";
import { alerts, chartdata, tasks } from "@/data/overview";
import { useState, useEffect, Suspense } from "react";
import initializePusher from "@/lib/echo";
import Dashboard from "@/components/pages/Dashboard";

export default function Page() {
  const [stat, setStat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Initial data fetch
    fetch("/api/stat")
      .then((res) => res.json())
      .then((res) => {
        setStat(res?.data || res);
      })
      .catch(() => setStat(null))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const pusherInstance = initializePusher();
    const channel = pusherInstance?.subscribe("dashboard");

    channel?.bind("pusher:subscription_succeeded", () => {
      console.log("✅ Connected to dashboard channel");
    });

    channel?.bind("pusher:subscription_error", (error: any) => {
      console.error("Failed to subscribe to dashboard channel:", error);
    });

    channel?.bind("dashboard.updated", (data: any) => {
      console.log("📊 Real-time data received:", data);
      setStat(data?.data);
    });

    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
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
        <ChartArea {...chartdata} areaColor="blue" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-h2 text-primary/80">Alerts</h2>
        <AlertTable alerts={alerts} />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-h2 text-primary/80">Tasks</h2>
        <TaskAlert tasks={tasks} />
      </div>

      {/* Real-time Components Section */}
      {/* TODO: lazm yremplaciw li rahom lfo9 */}
      <Suspense fallback={<div className="p-4">Loading dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

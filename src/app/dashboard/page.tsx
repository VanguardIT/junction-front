"use client";
import Table from "@/components/ui/Table";
import TaskAlert from "@/components/ui/alerts/TaskAlert";
import OverviewChart from "@/components/ui/charts/dashboard/OverviewChart";
import { apiClient } from "@/lib/api";
import { DashboardStats } from "@/types/Api";
import { useState, useEffect } from "react";

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
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getDashboardStats();
      setStats(response);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      setStats(null); // No fallback mock data
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600 font-bold">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-2 border-l-4 border-primary pl-4 w-1/3 justify-between max-h-40">
          <h3 className="text-h2">Regions</h3>
          <p className="text-lead">+{stats?.regions_count || 0}</p>
        </div>
        <div className="flex flex-col gap-2 border-l-4 border-primary pl-4 w-1/3 justify-between max-h-40">
          <h3 className="text-h2">Ponds</h3>
          <p className="text-lead">+{stats?.ponds_count || 0}</p>
        </div>
        <div className="flex flex-col gap-2 border-l-4 border-primary pl-4 w-1/3 justify-between max-h-40">
          <h3 className="text-h2">Sensors</h3>
          <p className="text-lead">+{stats?.sensors_count || 0}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-h2 text-primary/80">Oxygen Dissolve</h2>
        <OverviewChart
          chartdata={{
            title: "Oxygen Dissolve",
            description: "Oxygen dissolve in the pond",
            data: {
              week: stats?.weekly_do_data || [],
              month: stats?.weekly_do_data || [],
            },
          }}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-h2 text-primary/80">Alerts</h2>
        <Table
          columns={alertColumns}
          data={stats?.latest_alerts || []}
          rowKey={(row) => `${row.pond_id}-${row.created_at}`}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-h2 text-primary/80">Tasks</h2>
        <TaskAlert tasks={stats?.latest_tasks || []} />
      </div>
    </>
  );
}

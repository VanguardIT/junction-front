"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card } from "@/components/ui/shadcn/card";
import { Pencil, Trash2 } from "lucide-react";
import ChartArea from "@/components/ui/charts/chart-area";
import EditPondDialog from "@/components/ui/modals/EditPondDialog";
import { Pond, EditPondData, Alert, SensorReading } from "@/types/Api";
import { apiClient } from "@/lib/api";

const statusColor = (status: string) =>
  status === "Normal"
    ? "green"
    : status === "Warning"
      ? "yellow"
      : status === "Critical"
        ? "red"
        : "gray";

const healthColor = (health: string) =>
  health === "Good"
    ? "green"
    : health === "Medium"
      ? "yellow"
      : health === "Poor"
        ? "red"
        : "gray";

const pondColumns = [
  { key: "id", header: "Pond" },
  { key: "region_id", header: "Region" },
  {
    key: "status",
    header: "Status",
    render: (row: any) => (
      <span className={`font-semibold text-${statusColor(row.status)}-600`}>
        {row.status}
      </span>
    ),
  },
  {
    key: "health",
    header: "Health",
    render: (row: any) => (
      <Badge color={healthColor(row.health)} label={row.health} />
    ),
  },
  { key: "fishType", header: "Fish Type" },
  {
    key: "capacity",
    header: (
      <>
        Volume <span className="font-normal">(m³)</span>
      </>
    ),
    render: (row: any) => `${row.capacity} (m³)`,
  },
  { key: "lastAlert", header: "Last Alert" },
  {
    key: "remove",
    header: "remove",
    render: () => (
      <button>
        <Trash2 className="text-red-500" />
      </button>
    ),
  },
];

const alertColumns = [
  {
    key: "created_at",
    header: "Date",
    render: (row: Alert) => new Date(row.created_at).toLocaleDateString(),
  },
  { key: "type", header: "Type" },
  { key: "value", header: "Value" },
  {
    key: "status",
    header: "Status",
    render: (row: Alert) => <Badge color="green" label={row.status} />,
  },
  { key: "explanation", header: "Explanation" },
  { key: "suggestion", header: "Suggestion" },
];

export default function PondDetailsPage() {
  const params = useParams();
  const pondId = params?.pondid as string;
  const [pond, setPond] = useState<Pond | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [sensorCharts, setSensorCharts] = useState<any[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pondRes, alertsRes, sensorReadingsRes] = await Promise.all([
          apiClient.getPond(pondId),
          apiClient.getAlerts(),
          apiClient.getSensorReadings(),
        ]);
        setPond(pondRes);
        setAlerts(
          Array.isArray(alertsRes)
            ? alertsRes.filter((a) => a.pond_id === pondId)
            : []
        );
        // Example: group sensor readings by type for charting
        const grouped = {} as Record<string, SensorReading[]>;
        (Array.isArray(sensorReadingsRes) ? sensorReadingsRes : []).forEach(
          (r) => {
            if (!grouped[r.unit]) grouped[r.unit] = [];
            grouped[r.unit].push(r);
          }
        );
        setSensorCharts(
          Object.entries(grouped).map(([label, data]) => ({
            label,
            color: "#a5b4fc",
            data,
          }))
        );
      } catch (err) {
        setError("Failed to load pond details");
      } finally {
        setLoading(false);
      }
    };
    if (pondId) fetchData();
  }, [pondId]);

  const handleSavePond = (data: EditPondData) => {
    // Update the pond data with the new values
    if (!pond) return;
    const updatedPond: Pond = {
      ...pond,
      ...data,
    };
    setPond(updatedPond);
    // Here you would typically make an API call to save the data
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">Loading...</div>
    );
  }
  if (error || !pond) {
    return (
      <div className="text-red-600 font-bold">{error || "Pond not found"}</div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Ponds</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
            <Pencil className="w-4 h-4" />
            Edit Pond
          </Button>
          <Button variant="destructive">Generate Report</Button>
        </div>
      </div>
      <Table columns={pondColumns} data={[pond]} rowKey={(row) => row.id} />
      <Card className="p-4 flex flex-col gap-2">
        <div className="text-lg font-semibold mb-2">sensor data over time</div>
        <div className="flex gap-4">
          {sensorCharts.map((chart, index) => (
            <Card
              key={index}
              className="flex-1 p-2 flex flex-col items-center justify-center min-h-[120px]"
            >
              <div className="font-medium mb-1">{chart.label}</div>
              <ChartArea data={chart.data} areaColor={chart.color} />
            </Card>
          ))}
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-lg font-semibold mb-2">
          Alerts & Anomaly Explanation
        </div>
        <Table columns={alertColumns} data={alerts} rowKey={(_, i) => i} />
      </Card>
      <EditPondDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        pond={pond}
        onSave={handleSavePond}
      />
    </div>
  );
}

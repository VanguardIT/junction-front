"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card } from "@/components/ui/shadcn/card";
import { Pencil, Trash2 } from "lucide-react";
import ChartArea from "@/components/ui/charts/chart-area";
import EditPondDialog from "@/components/ui/modals/EditPondDialog";
import { Pond, EditPondData } from "@/types/Pond";

const pond: Pond = {
  id: "1",
  name: "Pond 1",
  region: "5",
  status: "Normal",
  health: "Good",
  fishType: "Tilapia",
  volume: 800,
  lastAlert: "None",
  productionCycle: {
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-06-30"),
  },
  assignedSensors: [
    "Ph Sensor",
    "Temperature Sensor",
    "Dissolved Oxygen Sensor",
  ],
  thresholds: {
    dissolvedOxygen: { min: 4, max: 8 },
    temperature: { min: 20, max: 30 },
    ph: { min: 6.5, max: 8.5 },
  },
};

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
  { key: "region", header: "Region" },
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
    key: "volume",
    header: (
      <>
        Volume <span className="font-normal">(m³)</span>
      </>
    ),
    render: (row: any) => `${row.volume} (m³)`,
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

const sensorCharts = [
  {
    label: "Ph",
    color: "#a5b4fc",
    data: [
      {
        date: "2021-01-01",
        value: 10,
      },
    ],
  },
  {
    label: "Oxygen",
    color: "#a5d8fa",
    data: [
      {
        date: "2021-01-01",
        value: 10,
      },
    ],
  },
];

const alerts = [
  {
    date: "Jul 17",
    type: "Low DO",
    value: "3.5 mg/L",
    status: "Active",
    explanation: '"Temp high + feeding"',
    suggestion: '"Increase aeration"',
  },
  {
    date: "Jul 17",
    type: "Low DO",
    value: "3.5 mg/L",
    status: "Active",
    explanation: '"Temp high + feeding"',
    suggestion: '"Increase aeration"',
  },
  {
    date: "Jul 17",
    type: "Low DO",
    value: "3.5 mg/L",
    status: "Active",
    explanation: '"Temp high + feeding"',
    suggestion: '"Increase aeration"',
  },
  {
    date: "Jul 17",
    type: "Low DO",
    value: "3.5 mg/L",
    status: "Active",
    explanation: '"Temp high + feeding"',
    suggestion: '"Increase aeration"',
  },
];

const alertColumns = [
  { key: "date", header: "Date" },
  { key: "type", header: "Type" },
  { key: "value", header: "Value" },
  {
    key: "status",
    header: "Status",
    render: (row: any) => <Badge color="green" label={row.status} />,
  },
  { key: "explanation", header: "Explanation" },
  { key: "suggestion", header: "Suggestion" },
];

export default function PondDetailsPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPond, setCurrentPond] = useState<Pond>(pond);

  const handleSavePond = (data: EditPondData) => {
    // Update the pond data with the new values
    const updatedPond: Pond = {
      ...currentPond,
      name: data.name,
      region: data.region,
      fishType: data.fishType,
      volume: data.volume,
      productionCycle: data.productionCycle,
      assignedSensors: data.assignedSensors,
      thresholds: {
        dissolvedOxygen: data.dissolvedOxygen,
        temperature: data.temperature,
        ph: data.ph,
      },
    };

    setCurrentPond(updatedPond);
    console.log("Pond updated:", updatedPond);
    // Here you would typically make an API call to save the data
  };

  // const params = useParams();
  // const pondId = params?.pondid;
  // Fetch pond by pondId if needed
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
      <Table
        columns={pondColumns}
        data={[currentPond]}
        rowKey={(row) => row.id}
      />
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
        pond={currentPond}
        onSave={handleSavePond}
      />
    </div>
  );
}

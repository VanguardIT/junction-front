import React from "react";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { TableColumn } from "@/types/Table";
import { Dialog, DialogTrigger } from "@/components/ui/shadcn/dialog";
import PondAdd from "@/components/ui/modals/PondAdd";
import Link from "next/link";

const fishTypes = ["Tilapia", "Catfish", "Carp", "Bass"];
const sensors = ["Ph Sensor", "Sensor nitrate"];

const ponds = [
  {
    pond: 1,
    region: 5,
    status: "Normal",
    health: "Good",
    fishType: "Tilapia",
    volume: 800,
    lastAlert: "None",
  },
  {
    pond: 1,
    region: 5,
    status: "Warning",
    health: "Medium",
    fishType: "Tilapia",
    volume: 800,
    lastAlert: "Low DO",
  },
  {
    pond: 1,
    region: 5,
    status: "Critical",
    health: "Poor",
    fishType: "Tilapia",
    volume: 800,
    lastAlert: "High turbidity",
  },
  // ...repeat or add more mock data as needed
];

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

const columns: TableColumn<(typeof ponds)[0]>[] = [
  { key: "pond", header: "Pond" },
  { key: "region", header: "Region" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span className={`font-semibold text-${statusColor(row.status)}-600`}>
        {row.status}
      </span>
    ),
  },
  {
    key: "health",
    header: "Health",
    render: (row) => (
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
    render: (row) => `${row.volume}`,
  },
  { key: "lastAlert", header: "Last Alert" },
  {
    key: "more",
    header: "More",
    render: (row) => (
      <Link
        href={`/dashboard/ponds/${row.pond}`}
        className="text-blue-600 underline"
      >
        See more
      </Link>
    ),
  },
];

export default function PondsPage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Ponds</h2>
        <Dialog>
          <DialogTrigger className="border border-gray-300 rounded-md px-2 py-1 cursor-pointer">
            + Add
          </DialogTrigger>
          <PondAdd fishTypes={fishTypes} sensors={sensors} />
        </Dialog>
      </div>
      <Table columns={columns} data={ponds} rowKey={(_, i) => i} />
    </div>
  );
}

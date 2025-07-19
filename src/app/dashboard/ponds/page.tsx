import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { TableColumn } from "@/types/Table";
import { Dialog, DialogTrigger } from "@/components/ui/shadcn/dialog";
import PondAdd from "@/components/ui/modals/PondAdd";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Pond } from "@/types/Api";

const fishTypes = ["Tilapia", "Catfish", "Carp", "Bass"];
const sensors = ["Ph Sensor", "Sensor nitrate"];

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

const columns: TableColumn<Pond>[] = [
  { key: "name", header: "Pond" },
  { key: "region_id", header: "Region" },
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
      <Badge
        color={healthColor(row.health || "Good")}
        label={row.health || "Good"}
      />
    ),
  },
  { key: "fishType", header: "Fish Type" },
  {
    key: "capacity",
    header: (
      <>
        Volume <span className="font-normal">(m 3)</span>
      </>
    ),
    render: (row) => `${row.capacity}`,
  },
  { key: "lastAlert", header: "Last Alert" },
  {
    key: "more",
    header: "More",
    render: (row) => (
      <Link
        href={`/dashboard/ponds/${row.id}`}
        className="text-blue-600 underline"
      >
        See more
      </Link>
    ),
  },
];

export default async function PondsPage() {
  let ponds: Pond[] = [];
  let error: string | null = null;
  try {
    const response = await apiClient.getPonds();
    ponds = Array.isArray(response) ? response : [];
  } catch (err) {
    error = "Failed to load ponds";
  }

  if (error) {
    return <div className="text-red-600 font-bold">{error}</div>;
  }
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
      <Table columns={columns} data={ponds} rowKey={(row) => row.id} />
    </div>
  );
}

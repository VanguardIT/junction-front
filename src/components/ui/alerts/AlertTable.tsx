import { Alert } from "@/types/Alert";
import React from "react";

const statusBadge = (status: Alert["status"]) => {
  let color = "";
  let label = "";
  switch (status) {
    case "done":
      color = "bg-success text-white";
      label = "Done";
      break;
    case "in progress":
      color = "bg-warning text-white";
      label = "In progress";
      break;
    case "pending":
      color = "bg-info text-white";
      label = "Pending";
      break;
    default:
      color = "bg-gray text-white";
      label = status;
  }
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color} block`}>
      {label}
    </span>
  );
};

export default function AlertTable({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-3 py-2 text-left font-semibold">Pond</th>
            <th className="px-3 py-2 text-left font-semibold">Regions</th>
            <th className="px-3 py-2 text-left font-semibold">Note</th>
            <th className="px-3 py-2 text-left font-semibold">Status</th>
            <th className="px-3 py-2 text-left font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, idx) => (
            <tr
              key={alert.pondId + alert.time + idx}
              className="border-b last:border-0"
            >
              <td className="px-3 py-2">Pond {alert.pondId}</td>
              <td className="px-3 py-2">{alert.region}</td>
              <td className="px-3 py-2">{alert.note}</td>
              <td className="px-3 py-2">{statusBadge(alert.status)}</td>
              <td className="px-3 py-2">{alert.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

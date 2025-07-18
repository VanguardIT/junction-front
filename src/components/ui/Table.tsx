import React from "react";
import { TableProps } from "@/types/Table";

export default function Table<T>({
  columns,
  data,
  rowKey,
  className,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full border-collapse text-sm ${className || ""}`}
      >
        <thead>
          <tr className="border-b">
            {columns.map((col, i) => (
              <th
                key={i}
                className={`px-3 py-2 text-left font-semibold ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={rowKey(row, idx)} className="border-b last:border-0">
              {columns.map((col, i) => (
                <td key={i} className={`px-3 py-2 ${col.className || ""}`}>
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

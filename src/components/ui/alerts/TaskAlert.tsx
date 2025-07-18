import { CheckCircle2 } from "lucide-react";
import { Task } from "@/types/Task";
import React from "react";

export default function TaskAlert({ tasks }: { tasks: Task[] }) {
  return (
    <div className={`flex flex-col gap-4 w-full`}>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="flex items-baseline gap-2 border p-2 rounded-xl"
        >
          <CheckCircle2 className="w-4 h-4" />
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-black">{task.title}</div>
            {task.description && (
              <div className="text-gray-700 text-sm mt-0.5">
                {task.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

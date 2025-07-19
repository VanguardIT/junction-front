"use client";

import React, { useEffect, useState } from "react";
import initializePusher from "@/lib/echo";
import { API_URL } from "@/data/api";

const RealTimeTips = () => {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetch(`${API_URL}/stat`)
      .then((res) => res.json())
      .then((res) => {
        setTips(res?.data?.latest_tasks || []);
      })
      .catch(() => setTips([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const pusherInstance = initializePusher();
    const channel = pusherInstance?.subscribe("dashboard");

    channel?.bind("dashboard.updated", (data) => {
      console.log("💡 Tips updated:", data?.data?.latest_tasks);
      setTips(data?.data?.latest_tasks);
    });

    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Latest Tasks</h3>
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="animate-pulse h-12 bg-gray-200 rounded"
            ></div>
          ))}
        </div>
      ) : tips.length === 0 ? (
        <p className="text-gray-500">No tasks</p>
      ) : (
        <div className="space-y-3">
          {tips.map((tip: any, index: number) => (
            <div
              key={tip.id || index}
              className="p-3 rounded-lg border border-gray-200 bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {tip.message}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Pond: {tip.pond?.pond_name || "Unknown"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(tip.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RealTimeTips;

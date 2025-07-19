"use client";

import React, { useEffect, useState } from "react";
import initializePusher from "@/lib/echo";
import { API_URL } from "@/data/api";

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetch(`${API_URL}/stat`)
      .then((res) => res.json())
      .then((res) => {
        setAlerts(res?.data?.latest_alerts || []);
      })
      .catch(() => setAlerts([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const pusherInstance = initializePusher();
    const channel = pusherInstance?.subscribe("dashboard");

    channel?.bind("dashboard.updated", (data) => {
      console.log("🚨 Alerts updated:", data?.data?.latest_alerts);
      setAlerts(data?.data?.latest_alerts);
    });

    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, []);

  const getAlertColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Latest Alerts</h3>
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse h-16 bg-gray-200 rounded"
            ></div>
          ))}
        </div>
      ) : alerts.length === 0 ? (
        <p className="text-gray-500">No alerts</p>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert: any, index: number) => (
            <div
              key={alert.id || index}
              className={`p-3 rounded-lg border ${getAlertColor(alert.level)}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-sm">{alert.message}</p>
                  <p className="text-xs mt-1">
                    Pond: {alert.pond?.pond_name || "Unknown"}
                  </p>
                </div>
                <span className="text-xs font-medium uppercase">
                  {alert.level}
                </span>
              </div>
              <p className="text-xs mt-2 opacity-75">
                {new Date(alert.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RealTimeAlerts;

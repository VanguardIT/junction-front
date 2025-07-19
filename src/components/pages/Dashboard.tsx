"use client";

import React from "react";
import RealTimePonds from "@/components/RealtimePonds";
import RealTimeAlerts from "@/components/ui/alerts/RealtimeAlerts";
import RealTimeTips from "@/components/Realtimetips";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ponds Count */}
          <RealTimePonds />

          {/* Alerts */}
          <div className="lg:col-span-2">
            <RealTimeAlerts />
          </div>

          {/* Tips */}
          <div className="lg:col-span-3">
            <RealTimeTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

"use client";

import React, { useEffect, useState } from "react";
import initializePusher from "@/lib/echo";
import { API_URL } from "@/data/api";

const RealTimePonds = () => {
  const [pondsCount, setPondsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetch(`${API_URL}/stat`)
      .then((res) => res.json())
      .then((res) => {
        setPondsCount(res?.data?.ponds_count || 0);
      })
      .catch(() => setPondsCount(0))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const pusherInstance = initializePusher();
    const channel = pusherInstance?.subscribe("dashboard");

    channel?.bind("dashboard.updated", (data) => {
      console.log("🏊 Ponds updated:", data?.data?.ponds_count);
      setPondsCount(data?.data?.ponds_count || 0);
    });

    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">Ponds</h3>
      {isLoading ? (
        <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
      ) : (
        <div className="text-3xl font-bold text-blue-600">{pondsCount}</div>
      )}
    </div>
  );
};

export default RealTimePonds;

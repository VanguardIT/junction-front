"use client";

import { useEffect, useState } from "react";
import initializePusher from "@/lib/echo";

export const useWebSocket = (
  channelName: string,
  eventName: string,
  initialData = null
) => {
  const [data, setData] = useState(initialData);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const pusherInstance = initializePusher();
    const channel = pusherInstance?.subscribe(channelName);

    channel?.bind("pusher:subscription_succeeded", () => {
      console.log(`✅ Connected to ${channelName} channel`);
      setIsConnected(true);
    });

    channel?.bind("pusher:subscription_error", (error) => {
      console.error(`Failed to subscribe to ${channelName} channel:`, error);
      setIsConnected(false);
    });

    channel?.bind(eventName, (newData) => {
      console.log(` ${eventName} event received:`, newData);
      setData(newData.data);
    });

    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, [channelName, eventName]);

  return { data, isConnected };
};

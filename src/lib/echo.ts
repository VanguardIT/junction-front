import Pusher from "pusher-js";

const initializePusher = () => {
  try {
    const pusherAppKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    if (!pusherAppKey) {
      throw new Error("Pusher app key is not set");
    }
    const pusher = new Pusher(pusherAppKey, {
      wsHost: "localhost",
      wsPort: 8080,
      forceTLS: false,
      enabledTransports: ["ws"],
      cluster: "", // Reverb doesn't use this
      // No auth for local dev
    });
    return pusher;
  } catch (error) {
    console.error(error);
  }
};

export default initializePusher;

export type Alert = {
  pondId: string;
  region: number;
  note: string;
  status: "pending" | "in progress" | "done";
  time: string;
};

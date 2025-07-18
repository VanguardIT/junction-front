import { z } from "zod";

// Zod schemas for form validation
export const editPondStep1Schema = z.object({
  name: z.string().min(1, "Pond name is required"),
  region: z.string().min(1, "Region is required"),
  fishType: z.string().min(1, "Fish type is required"),
  volume: z.number().min(1, "Volume must be greater than 0"),
  productionCycle: z
    .object({
      startDate: z.date({
        required_error: "Start date is required",
      }),
      endDate: z.date({
        required_error: "End date is required",
      }),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: "End date must be after start date",
      path: ["endDate"],
    }),
  assignedSensors: z
    .array(z.string())
    .min(1, "At least one sensor must be selected"),
});

export const editPondStep2Schema = z.object({
  dissolvedOxygen: z
    .object({
      min: z.number().min(0, "Minimum DO must be 0 or greater"),
      max: z.number().min(0, "Maximum DO must be 0 or greater"),
    })
    .refine((data) => data.max > data.min, {
      message: "Maximum DO must be greater than minimum",
      path: ["max"],
    }),
  temperature: z
    .object({
      min: z.number().min(-50, "Minimum temperature must be -50 or greater"),
      max: z.number().min(-50, "Maximum temperature must be -50 or greater"),
    })
    .refine((data) => data.max > data.min, {
      message: "Maximum temperature must be greater than minimum",
      path: ["max"],
    }),
  ph: z
    .object({
      min: z
        .number()
        .min(0, "Minimum pH must be 0 or greater")
        .max(14, "Minimum pH must be 14 or less"),
      max: z
        .number()
        .min(0, "Maximum pH must be 0 or greater")
        .max(14, "Maximum pH must be 14 or less"),
    })
    .refine((data) => data.max > data.min, {
      message: "Maximum pH must be greater than minimum",
      path: ["max"],
    }),
});

export const editPondSchema = editPondStep1Schema.merge(editPondStep2Schema);

// TypeScript types derived from Zod schemas
export type EditPondStep1Data = z.infer<typeof editPondStep1Schema>;
export type EditPondStep2Data = z.infer<typeof editPondStep2Schema>;
export type EditPondData = z.infer<typeof editPondSchema>;

// Pond data structure
export interface Pond {
  id: string;
  name: string;
  region: string;
  status: "Normal" | "Warning" | "Critical";
  health: "Good" | "Medium" | "Poor";
  fishType: string;
  volume: number;
  lastAlert: string;
  productionCycle?: {
    startDate: Date;
    endDate: Date;
  };
  assignedSensors?: string[];
  thresholds?: {
    dissolvedOxygen: { min: number; max: number };
    temperature: { min: number; max: number };
    ph: { min: number; max: number };
  };
}

// Available sensors
export const availableSensors = [
  "Ph Sensor",
  "Temperature Sensor",
  "Dissolved Oxygen Sensor",
  "Turbidity Sensor",
  "Conductivity Sensor",
  "Ammonia Sensor",
];

// Fish types
export const fishTypes = [
  "Tilapia",
  "Salmon",
  "Trout",
  "Bass",
  "Catfish",
  "Carp",
  "Other",
];

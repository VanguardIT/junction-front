import { Task } from "./Task";

// Dashboard Statistics
export interface DashboardStats {
  ponds_count: number;
  regions_count: number;
  sensors_count: number;
  latest_alerts: Alert[];
  latest_tasks: Task[];
  weekly_ph_data: ChartDataPoint[];
  weekly_do_data: ChartDataPoint[];
}

// Chart Data Point
export interface ChartDataPoint {
  date: string;
  value: number;
}

// Region Types
export interface Region {
  id: string;
  name: string;
  description?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRegionData {
  name: string;
  description?: string;
  location?: string;
}

export interface UpdateRegionData {
  name?: string;
  description?: string;
  location?: string;
}

// Pond Types
export interface Pond {
  id: string;
  name: string;
  region_id: string;
  area: number;
  depth: number;
  capacity: number;
  status: "active" | "inactive" | "maintenance";
  created_at: string;
  updated_at: string;
  region?: {
    id: string;
    name: string;
  };
}

export interface CreatePondData {
  name: string;
  region_id: string;
  area: number;
  depth: number;
  capacity: number;
  status?: Pond["status"];
}

export interface UpdatePondData {
  name?: string;
  region_id?: string;
  area?: number;
  depth?: number;
  capacity?: number;
  status?: Pond["status"];
}

export type { EditPondData } from "./Pond";

// Sensor Types
export interface Sensor {
  id: string;
  name: string;
  type: "ph" | "temperature" | "dissolved_oxygen" | "turbidity" | "ammonia";
  pond_id: string;
  status: "active" | "inactive" | "maintenance";
  last_reading?: SensorReading;
  created_at: string;
  updated_at: string;
}

export interface CreateSensorData {
  name: string;
  type: Sensor["type"];
  pond_id: string;
  status?: Sensor["status"];
}

export interface UpdateSensorData {
  name?: string;
  type?: Sensor["type"];
  pond_id?: string;
  status?: Sensor["status"];
}

// Sensor Reading Types
export interface SensorReading {
  id: string;
  sensor_id: string;
  value: number;
  unit: string;
  timestamp: string;
  created_at: string;
}

export interface CreateSensorReadingData {
  sensor_id: string;
  value: number;
  unit: string;
  timestamp?: string;
}

export interface UpdateSensorReadingData {
  sensor_id?: string;
  value?: number;
  unit?: string;
  timestamp?: string;
}

// Alert Types (Enhanced)
export interface Alert {
  id: string;
  pond_id: string;
  sensor_id?: string;
  type:
    | "low_do"
    | "high_temp"
    | "low_ph"
    | "high_ammonia"
    | "turbidity_warning";
  value: string;
  status: "active" | "resolved" | "acknowledged";
  explanation: string;
  suggestion: string;
  technician_notes?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
  pond?: {
    id: string;
    name: string;
    region: string;
  };
  sensor?: {
    id: string;
    name: string;
    type: string;
  };
}

export interface CreateAlertData {
  pond_id: string;
  sensor_id?: string;
  type: Alert["type"];
  value: string;
  explanation: string;
  suggestion: string;
}

export interface UpdateAlertData {
  pond_id?: string;
  sensor_id?: string;
  type?: Alert["type"];
  value?: string;
  explanation?: string;
  suggestion?: string;
  status?: Alert["status"];
  technician_notes?: string;
  resolved_at?: string;
}

// Tip Types
export interface Tip {
  id: string;
  title: string;
  description: string;
  category: "maintenance" | "feeding" | "water_quality" | "general";
  priority: "low" | "medium" | "high";
  pond_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTipData {
  title: string;
  description: string;
  category: Tip["category"];
  priority: Tip["priority"];
  pond_id?: string;
}

export interface UpdateTipData {
  title?: string;
  description?: string;
  category?: Tip["category"];
  priority?: Tip["priority"];
  pond_id?: string;
}

// Report Types
export interface Report {
  id: string;
  name: string;
  type: "pond_report" | "sensor_report" | "alert_report" | "performance_report";
  format: "pdf" | "csv" | "excel";
  details: "summary" | "detailed";
  pond_id?: string;
  date_range?: {
    start: string;
    end: string;
  };
  generated_at: string;
  file_url?: string;
  created_at: string;
}

export interface CreateReportData {
  name: string;
  type: Report["type"];
  format: Report["format"];
  details: Report["details"];
  pond_id?: string;
  date_range?: {
    start: string;
    end: string;
  };
}

// Filter Types
export interface AlertFilters {
  date_range?: {
    start: string;
    end: string;
  };
  alert_type?: Alert["type"];
  status?: Alert["status"];
  pond_id?: string;
}

export interface ReportFilters {
  date_range?: {
    start: string;
    end: string;
  };
  pond_id?: string;
  report_type?: Report["type"];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: "success" | "error";
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
}

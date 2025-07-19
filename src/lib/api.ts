export const API_URL = "http://localhost:8000/api";

// Import all API types
import {
  DashboardStats,
  Region,
  CreateRegionData,
  UpdateRegionData,
  Pond,
  CreatePondData,
  UpdatePondData,
  Sensor,
  CreateSensorData,
  UpdateSensorData,
  SensorReading,
  CreateSensorReadingData,
  UpdateSensorReadingData,
  Alert,
  CreateAlertData,
  UpdateAlertData,
  Tip,
  CreateTipData,
  UpdateTipData,
} from "@/types/Api";

// Base API client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Dashboard Statistics
  async getDashboardStats() {
    return this.request<DashboardStats>("/stat");
  }

  // Regions
  async getRegions() {
    return this.request<Region[]>("/regions");
  }

  async createRegion(data: CreateRegionData) {
    return this.request<Region>("/regions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getRegion(id: string) {
    return this.request<Region>(`/regions/${id}`);
  }

  async updateRegion(id: string, data: UpdateRegionData) {
    return this.request<Region>(`/regions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteRegion(id: string) {
    return this.request<void>(`/regions/${id}`, {
      method: "DELETE",
    });
  }

  // Ponds
  async getPonds() {
    return this.request<Pond[]>("/ponds");
  }

  async createPond(data: CreatePondData) {
    return this.request<Pond>("/ponds", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getPond(id: string) {
    return this.request<Pond>(`/ponds/${id}`);
  }

  async updatePond(id: string, data: UpdatePondData) {
    return this.request<Pond>(`/ponds/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deletePond(id: string) {
    return this.request<void>(`/ponds/${id}`, {
      method: "DELETE",
    });
  }

  // Sensors
  async getSensors() {
    return this.request<Sensor[]>("/sensors");
  }

  async createSensor(data: CreateSensorData) {
    return this.request<Sensor>("/sensors", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSensor(id: string) {
    return this.request<Sensor>(`/sensors/${id}`);
  }

  async updateSensor(id: string, data: UpdateSensorData) {
    return this.request<Sensor>(`/sensors/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteSensor(id: string) {
    return this.request<void>(`/sensors/${id}`, {
      method: "DELETE",
    });
  }

  // Sensor Readings
  async getSensorReadings() {
    return this.request<SensorReading[]>("/sensor_reading");
  }

  async createSensorReading(data: CreateSensorReadingData) {
    return this.request<SensorReading>("/sensor_reading", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSensorReading(id: string) {
    return this.request<SensorReading>(`/sensor_reading/${id}`);
  }

  async updateSensorReading(id: string, data: UpdateSensorReadingData) {
    return this.request<SensorReading>(`/sensor_reading/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteSensorReading(id: string) {
    return this.request<void>(`/sensor_reading/${id}`, {
      method: "DELETE",
    });
  }

  // Alerts
  async getAlerts() {
    return this.request<Alert[]>("/alerts");
  }

  async createAlert(data: CreateAlertData) {
    return this.request<Alert>("/alerts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getAlert(id: string) {
    return this.request<Alert>(`/alerts/${id}`);
  }

  async updateAlert(id: string, data: UpdateAlertData) {
    return this.request<Alert>(`/alerts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteAlert(id: string) {
    return this.request<void>(`/alerts/${id}`, {
      method: "DELETE",
    });
  }

  // Tips
  async getTips() {
    return this.request<Tip[]>("/tips");
  }

  async createTip(data: CreateTipData) {
    return this.request<Tip>("/tips", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getTip(id: string) {
    return this.request<Tip>(`/tips/${id}`);
  }

  async updateTip(id: string, data: UpdateTipData) {
    return this.request<Tip>(`/tips/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteTip(id: string) {
    return this.request<void>(`/tips/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient(API_URL);

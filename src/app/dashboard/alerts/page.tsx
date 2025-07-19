"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import Badge from "@/components/ui/Badge";
import Table from "@/components/ui/Table";
import { Alert, AlertFilters } from "@/types/Api";
import { apiClient } from "@/lib/api";
import { Search, Plus } from "lucide-react";
import AlertDetailsModal from "@/components/ui/modals/AlertDetailsModal";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AlertFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [alerts, filters, searchTerm]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getAlerts();
      setAlerts(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      // Fallback to mock data for development
      setAlerts([
        {
          id: "1",
          pond_id: "1",
          type: "low_do",
          value: "3.5 mg/L",
          status: "active",
          explanation: "Temp high + feeding",
          suggestion: "Increase aeration",
          created_at: "2024-07-17T10:00:00Z",
          updated_at: "2024-07-17T10:00:00Z",
          pond: { id: "1", name: "Pond 1", region: "5" },
        },
        {
          id: "2",
          pond_id: "1",
          type: "low_do",
          value: "3.5 mg/L",
          status: "resolved",
          explanation: "Temp high + feeding",
          suggestion: "Increase aeration",
          created_at: "2024-07-17T09:00:00Z",
          updated_at: "2024-07-17T09:30:00Z",
          pond: { id: "1", name: "Pond 1", region: "5" },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...alerts];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.pond?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.explanation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((alert) => alert.status === filters.status);
    }

    // Apply alert type filter
    if (filters.alert_type) {
      filtered = filtered.filter((alert) => alert.type === filters.alert_type);
    }

    setFilteredAlerts(filtered);
  };

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setModalOpen(true);
  };

  const handleResolveAlert = async (alertId: string, notes: string) => {
    try {
      await apiClient.updateAlert(alertId, {
        status: "resolved",
        technician_notes: notes,
        resolved_at: new Date().toISOString(),
      });

      // Update local state
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === alertId
            ? {
                ...alert,
                status: "resolved",
                technician_notes: notes,
                resolved_at: new Date().toISOString(),
              }
            : alert
        )
      );

      setSelectedAlert(null);
    } catch (error) {
      console.error("Failed to resolve alert:", error);
    }
  };

  const handleSearch = () => {
    applyFilters();
  };

  const alertColumns = [
    {
      key: "created_at",
      header: "Date",
      render: (row: Alert) =>
        new Date(row.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
    },
    {
      key: "pond",
      header: "Pond",
      render: (row: Alert) => row.pond?.name || `Pond ${row.pond_id}`,
    },
    {
      key: "type",
      header: "Type",
      render: (row: Alert) => {
        const typeLabels = {
          low_do: "Low DO",
          high_temp: "High Temp",
          low_ph: "Low pH",
          high_ammonia: "High Ammonia",
          turbidity_warning: "Turbidity",
        };
        return typeLabels[row.type] || row.type;
      },
    },
    { key: "value", header: "Value" },
    {
      key: "status",
      header: "Status",
      render: (row: Alert) => (
        <Badge
          color={
            row.status === "active"
              ? "red"
              : row.status === "resolved"
                ? "green"
                : "yellow"
          }
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        />
      ),
    },
    { key: "explanation", header: "Explanation" },
    { key: "suggestion", header: "Suggested" },
    {
      key: "actions",
      header: "Actions",
      render: (row: Alert) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleViewDetails(row)}
          className="text-blue-600 hover:text-blue-800"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-700">Alerts</h2>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    date_range: { start: value, end: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    alert_type: value as Alert["type"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alert type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low_do">Low DO</SelectItem>
                  <SelectItem value="high_temp">High Temp</SelectItem>
                  <SelectItem value="low_ph">Low pH</SelectItem>
                  <SelectItem value="high_ammonia">High Ammonia</SelectItem>
                  <SelectItem value="turbidity_warning">Turbidity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[120px]">
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: value as Alert["status"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSearch}
              className="bg-red-600 hover:bg-red-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table
              columns={alertColumns}
              data={filteredAlerts}
              rowKey={(row) => row.id}
            />
          )}
        </CardContent>
      </Card>

      {/* Alert Details Modal */}
      <AlertDetailsModal
        alert={selectedAlert}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onResolve={handleResolveAlert}
      />
    </div>
  );
}

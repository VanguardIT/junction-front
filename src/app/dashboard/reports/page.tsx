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
import Table from "@/components/ui/Table";
import { Report, ReportFilters } from "@/types/Api";
import { apiClient } from "@/lib/api";
import { Search, FileText, Download } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ReportFilters>({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reports, filters, searchTerm]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      // Since there's no reports endpoint in the API, we'll use mock data
      const mockReports: Report[] = [
        {
          id: "1",
          name: "Pond 1 Report",
          type: "pond_report",
          format: "pdf",
          details: "detailed",
          generated_at: "2024-07-17T13:32:00Z",
          created_at: "2024-07-17T13:32:00Z",
          pond_id: "1",
        },
        {
          id: "2",
          name: "Pond 1 Report",
          type: "pond_report",
          format: "pdf",
          details: "detailed",
          generated_at: "2024-07-17T12:15:00Z",
          created_at: "2024-07-17T12:15:00Z",
          pond_id: "1",
        },
        {
          id: "3",
          name: "Sensor Report",
          type: "sensor_report",
          format: "csv",
          details: "summary",
          generated_at: "2024-07-17T11:45:00Z",
          created_at: "2024-07-17T11:45:00Z",
        },
      ];
      setReports(mockReports);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reports];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply report type filter
    if (filters.report_type) {
      filtered = filtered.filter(
        (report) => report.type === filters.report_type
      );
    }

    // Apply pond filter
    if (filters.pond_id) {
      filtered = filtered.filter(
        (report) => report.pond_id === filters.pond_id
      );
    }

    setFilteredReports(filtered);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    console.log("Generate report with filters:", filters);
  };

  const handleDownload = (report: Report) => {
    // TODO: Implement download functionality
    console.log("Download report:", report);
  };

  const reportColumns = [
    {
      key: "name",
      header: "Report Name",
      render: (row: Report) => (
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-red-500" />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      key: "generated_at",
      header: "Date",
      render: (row: Report) =>
        new Date(row.generated_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      key: "generated_at",
      header: "Time",
      render: (row: Report) =>
        new Date(row.generated_at).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    },
    { key: "details", header: "Details" },
    { key: "format", header: "Format" },
    {
      key: "actions",
      header: "Actions",
      render: (row: Report) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDownload(row)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-700">Reports & Exports</h2>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Find Report"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>

            <Button
              onClick={handleSearch}
              className="bg-red-600 hover:bg-red-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            <div className="min-w-[150px]">
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

            <div className="min-w-[120px]">
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    pond_id: value === "all" ? undefined : value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Ponds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ponds</SelectItem>
                  <SelectItem value="1">Pond 1</SelectItem>
                  <SelectItem value="2">Pond 2</SelectItem>
                  <SelectItem value="3">Pond 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[140px]">
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    report_type: value as Report["type"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pond_report">Pond Report</SelectItem>
                  <SelectItem value="sensor_report">Sensor Report</SelectItem>
                  <SelectItem value="alert_report">Alert Report</SelectItem>
                  <SelectItem value="performance_report">
                    Performance Report
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerateReport}
              className="bg-red-600 hover:bg-red-700"
            >
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table
              columns={reportColumns}
              data={filteredReports}
              rowKey={(row) => row.id}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

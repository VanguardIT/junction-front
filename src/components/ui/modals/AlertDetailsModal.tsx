"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import Badge from "@/components/ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Alert } from "@/types/Api";
import ChartArea from "@/components/ui/charts/chart-area";
import { AlertTriangle, FileText } from "lucide-react";

interface AlertDetailsModalProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResolve: (alertId: string, notes: string) => void;
}

export default function AlertDetailsModal({
  alert,
  open,
  onOpenChange,
  onResolve,
}: AlertDetailsModalProps) {
  const [technicianNotes, setTechnicianNotes] = useState("");
  const [timeRange, setTimeRange] = useState("weekly");

  if (!alert) return null;

  const chartData = [
    { date: "Mon", value: 6.2 },
    { date: "Tue", value: 5.8 },
    { date: "Wed", value: 5.5 },
    { date: "Thu", value: 3.5 }, // This is the alert point
    { date: "Fri", value: 4.2 },
    { date: "Sat", value: 5.1 },
    { date: "Sun", value: 5.8 },
  ];

  const handleResolve = () => {
    onResolve(alert.id, technicianNotes);
    onOpenChange(false);
    setTechnicianNotes("");
  };

  const getAlertTypeLabel = (type: string) => {
    const labels = {
      low_do: "Low Dissolved Oxygen",
      high_temp: "High Temperature",
      low_ph: "Low pH",
      high_ammonia: "High Ammonia",
      turbidity_warning: "Turbidity Warning",
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Badge color="red" label="Alert" />
            <DialogTitle className="text-xl font-semibold">
              {getAlertTypeLabel(alert.type)}
            </DialogTitle>
          </div>
          <p className="text-gray-600">
            {alert.pond?.name} region {alert.pond?.region}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Chart Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Dissolved Oxygen</h3>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-64 border rounded-lg p-4">
              <ChartArea data={chartData} areaColor="#3b82f6" />
            </div>
          </div>

          {/* Alert Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Cause:</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {alert.explanation}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Suggested Fix:</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {alert.suggestion}
              </p>
            </div>
          </div>

          {/* Technician Notes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h4 className="font-semibold text-gray-700">TECHNICIAN NOTES</h4>
            </div>
            <Textarea
              placeholder="Type your message here"
              value={technicianNotes}
              onChange={(e) => setTechnicianNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <p className="text-sm text-gray-500">
              Your message will be added to the support team.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleResolve}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2"
              disabled={alert.status === "resolved"}
            >
              {alert.status === "resolved"
                ? "Already Resolved"
                : "Mark as resolved"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

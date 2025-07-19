"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { Separator } from "@/components/ui/shadcn/separator";

import {
  editPondStep1Schema,
  editPondStep2Schema,
  EditPondStep1Data,
  EditPondStep2Data,
  EditPondData,
  availableSensors,
  fishTypes,
  Pond,
} from "@/types/Pond";

interface EditPondDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pond: Pond;
  onSave: (data: EditPondData) => void;
}

export default function EditPondDialog({
  open,
  onOpenChange,
  pond,
  onSave,
}: EditPondDialogProps) {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<EditPondStep1Data | null>(null);

  // Step 1 form
  const step1Form = useForm<EditPondStep1Data>({
    resolver: zodResolver(editPondStep1Schema),
    defaultValues: {
      name: pond.name,
      region: pond.region,
      fishType: pond.fishType,
      volume: pond.volume,
      productionCycle: {
        startDate: pond.productionCycle?.startDate || new Date(),
        endDate: pond.productionCycle?.endDate || new Date(),
      },
      assignedSensors: pond.assignedSensors || [],
    },
  });

  // Step 2 form
  const step2Form = useForm<EditPondStep2Data>({
    resolver: zodResolver(editPondStep2Schema),
    defaultValues: {
      dissolvedOxygen: {
        min: pond.thresholds?.dissolvedOxygen?.min || 4,
        max: pond.thresholds?.dissolvedOxygen?.max || 8,
      },
      temperature: {
        min: pond.thresholds?.temperature?.min || 20,
        max: pond.thresholds?.temperature?.max || 30,
      },
      ph: {
        min: pond.thresholds?.ph?.min || 6.5,
        max: pond.thresholds?.ph?.max || 8.5,
      },
    },
  });

  const onStep1Submit = (data: EditPondStep1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Submit = (data: EditPondStep2Data) => {
    if (step1Data) {
      const completeData: EditPondData = {
        ...step1Data,
        ...data,
      };
      onSave(completeData);
      onOpenChange(false);
      setStep(1);
      setStep1Data(null);
      step1Form.reset();
      step2Form.reset();
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setStep(1);
    setStep1Data(null);
    step1Form.reset();
    step2Form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pond</DialogTitle>
          <DialogDescription>
            Update pond information and sensor thresholds
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center space-x-2 py-4">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              step >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            1
          </div>
          <div className="w-8 h-0.5 bg-muted" />
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            2
          </div>
        </div>

        {step === 1 && (
          <form
            onSubmit={step1Form.handleSubmit(onStep1Submit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Pond name</Label>
                <Input
                  id="name"
                  {...step1Form.register("name")}
                  placeholder="Enter pond name"
                />
                {step1Form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  {...step1Form.register("region")}
                  placeholder="Enter region"
                />
                {step1Form.formState.errors.region && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.region.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fishType">Fish Type</Label>
                <Select
                  value={step1Form.watch("fishType")}
                  onValueChange={(value) =>
                    step1Form.setValue("fishType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {fishTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {step1Form.formState.errors.fishType && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.fishType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume">Pond Volume (m³)</Label>
                <Input
                  id="volume"
                  type="number"
                  {...step1Form.register("volume", { valueAsNumber: true })}
                  placeholder="Enter volume"
                />
                {step1Form.formState.errors.volume && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.volume.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Production Cycle</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !step1Form.watch("productionCycle.startDate") &&
                            "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {step1Form.watch("productionCycle.startDate") ? (
                          format(
                            step1Form.watch("productionCycle.startDate"),
                            "PPP"
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={step1Form.watch("productionCycle.startDate")}
                        onSelect={(date) =>
                          step1Form.setValue(
                            "productionCycle.startDate",
                            date || new Date()
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !step1Form.watch("productionCycle.endDate") &&
                            "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {step1Form.watch("productionCycle.endDate") ? (
                          format(
                            step1Form.watch("productionCycle.endDate"),
                            "PPP"
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={step1Form.watch("productionCycle.endDate")}
                        onSelect={(date) =>
                          step1Form.setValue(
                            "productionCycle.endDate",
                            date || new Date()
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {step1Form.formState.errors.productionCycle && (
                <p className="text-sm text-destructive">
                  {step1Form.formState.errors.productionCycle.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Assigned Sensors</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableSensors.map((sensor) => (
                  <div key={sensor} className="flex items-center space-x-2">
                    <Checkbox
                      id={sensor}
                      checked={step1Form
                        .watch("assignedSensors")
                        .includes(sensor)}
                      onCheckedChange={(checked) => {
                        const currentSensors =
                          step1Form.watch("assignedSensors");
                        if (checked) {
                          step1Form.setValue("assignedSensors", [
                            ...currentSensors,
                            sensor,
                          ]);
                        } else {
                          step1Form.setValue(
                            "assignedSensors",
                            currentSensors.filter((s) => s !== sensor)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={sensor} className="text-sm font-normal">
                      {sensor}
                    </Label>
                  </div>
                ))}
              </div>
              {step1Form.formState.errors.assignedSensors && (
                <p className="text-sm text-destructive">
                  {step1Form.formState.errors.assignedSensors.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">
                Next
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={step2Form.handleSubmit(onStep2Submit)}
            className="space-y-4"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Dissolved Oxygen (DO)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label
                      htmlFor="do-min"
                      className="text-xs text-muted-foreground"
                    >
                      min
                    </Label>
                    <Input
                      id="do-min"
                      type="number"
                      step="0.1"
                      {...step2Form.register("dissolvedOxygen.min", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="do-max"
                      className="text-xs text-muted-foreground"
                    >
                      max
                    </Label>
                    <Input
                      id="do-max"
                      type="number"
                      step="0.1"
                      {...step2Form.register("dissolvedOxygen.max", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
                {step2Form.formState.errors.dissolvedOxygen && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.dissolvedOxygen.message}
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Temperature</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label
                      htmlFor="temp-min"
                      className="text-xs text-muted-foreground"
                    >
                      min
                    </Label>
                    <Input
                      id="temp-min"
                      type="number"
                      step="0.1"
                      {...step2Form.register("temperature.min", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="temp-max"
                      className="text-xs text-muted-foreground"
                    >
                      max
                    </Label>
                    <Input
                      id="temp-max"
                      type="number"
                      step="0.1"
                      {...step2Form.register("temperature.max", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
                {step2Form.formState.errors.temperature && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.temperature.message}
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>pH</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label
                      htmlFor="ph-min"
                      className="text-xs text-muted-foreground"
                    >
                      min
                    </Label>
                    <Input
                      id="ph-min"
                      type="number"
                      step="0.1"
                      {...step2Form.register("ph.min", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="ph-max"
                      className="text-xs text-muted-foreground"
                    >
                      max
                    </Label>
                    <Input
                      id="ph-max"
                      type="number"
                      step="0.1"
                      {...step2Form.register("ph.max", { valueAsNumber: true })}
                    />
                  </div>
                </div>
                {step2Form.formState.errors.ph && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.ph.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleBack}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

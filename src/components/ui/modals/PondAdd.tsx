"use client";

import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import * as DropdownMenu from "@/components/ui/shadcn/dropdown-menu";
import { Button } from "@/components/ui/shadcn/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPondSchema } from "@/types/Pond";
import { z } from "zod";
import { Calendar } from "@/components/ui/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { ChevronDownIcon } from "lucide-react";

type PondForm = z.infer<typeof editPondSchema>;

export default function PondAdd({
  fishTypes,
  sensors,
}: {
  fishTypes: string[];
  sensors: string[];
}) {
  const [selectedFish, setSelectedFish] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<PondForm>({
    resolver: zodResolver(editPondSchema),
    defaultValues: { assignedSensors: [] },
  });

  const onSubmit = (data: PondForm) => {
    // Add pond logic here
    reset();
  };

  // update form value when date changes
  React.useEffect(() => {
    if (startDate)
      setValue(
        "productionCycle.startDate",
        new Date(startDate.toISOString().slice(0, 10))
      );
  }, [startDate, setValue]);
  React.useEffect(() => {
    if (endDate)
      setValue(
        "productionCycle.endDate",
        new Date(endDate.toISOString().slice(0, 10))
      );
  }, [endDate, setValue]);

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DialogHeader>
          <DialogTitle>Add Pond</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Pond name</Label>
          <Input id="name" {...register("name")} placeholder="Pond 1" />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="region">Region</Label>
          <Input id="region" {...register("region")} placeholder="region" />
          {errors.region && (
            <span className="text-red-500 text-xs">
              {errors.region.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Fish Type</Label>
          <DropdownMenu.DropdownMenu>
            <DropdownMenu.DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
              >
                {selectedFish || "Select an option"}
              </Button>
            </DropdownMenu.DropdownMenuTrigger>
            <DropdownMenu.DropdownMenuContent className="w-full">
              {fishTypes.map((type) => (
                <DropdownMenu.DropdownMenuItem
                  key={type}
                  onSelect={() => {
                    setSelectedFish(type);
                    setValue("fishType", type, { shouldValidate: true });
                  }}
                >
                  {type}
                </DropdownMenu.DropdownMenuItem>
              ))}
            </DropdownMenu.DropdownMenuContent>
          </DropdownMenu.DropdownMenu>
          {errors.fishType && (
            <span className="text-red-500 text-xs">
              {errors.fishType.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="volume">Pond Volume (m³)</Label>
          <Input id="volume" {...register("volume")} placeholder="950 m³" />
          {errors.volume && (
            <span className="text-red-500 text-xs">
              {errors.volume.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Production Cycle</Label>
          <div className="flex gap-2">
            <div className="flex-1 min-w-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal"
                    type="button"
                  >
                    {startDate ? startDate.toLocaleDateString() : "Start Date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    captionLayout="dropdown"
                    onSelect={(date) => setStartDate(date || undefined)}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 min-w-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal"
                    type="button"
                  >
                    {endDate ? endDate.toLocaleDateString() : "End Date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    captionLayout="dropdown"
                    onSelect={(date) => setEndDate(date || undefined)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Assigned Sensors</Label>
          <div className="flex flex-col gap-1">
            {sensors.map((sensor) => (
              <label key={sensor} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={sensor}
                  {...register("assignedSensors")}
                  checked={watch("assignedSensors")?.includes(sensor)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const prev = watch("assignedSensors") || [];
                    setValue(
                      "assignedSensors",
                      checked
                        ? [...prev, sensor]
                        : prev.filter((s) => s !== sensor),
                      { shouldValidate: true }
                    );
                  }}
                />
                {sensor}
              </label>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Add Pond</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

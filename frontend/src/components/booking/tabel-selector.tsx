"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableLocation } from "@/types/restaurant";
import { Users } from "lucide-react";

interface TableSelectorProps {
  tables: Table[];
  guestsCount: number;
  value?: string;
  onChange: (tableId: string) => void;
}

export function TableSelector({
  tables,
  guestsCount,
  value,
  onChange,
}: TableSelectorProps) {
  const availableTables = tables.filter(
    (table) => table.isAvailable && table.capacity >= guestsCount
  );

  if (availableTables.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Нет доступных столиков для выбранного количества гостей</p>
      </div>
    );
  }

  const getLocationName = (location: TableLocation): string => {
    const names: Record<TableLocation, string> = {
      INDOOR: "В зале",
      OUTDOOR: "На улице",
      TERRACE: "На террасе",
      PRIVATE: "Приватный",
    };
    return names[location];
  };

  const getLocationColor = (location: TableLocation): string => {
    const colors: Record<TableLocation, string> = {
      INDOOR: "bg-blue-100 text-blue-800",
      OUTDOOR: "bg-green-100 text-green-800",
      TERRACE: "bg-yellow-100 text-yellow-800",
      PRIVATE: "bg-purple-100 text-purple-800",
    };
    return colors[location];
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-3">
        Выберите столик (необязательно)
      </p>
      <div className="grid grid-cols-2 gap-3">
        {availableTables.map((table) => (
          <Button
            key={table.id}
            type="button"
            variant={value === table.id ? "default" : "outline"}
            className="h-auto p-3 justify-start"
            onClick={() => onChange(table.id)}
          >
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">Столик {table.tableNumber}</span>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", getLocationColor(table.location))}
                >
                  {getLocationName(table.location)}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>До {table.capacity} человек</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { TimeSlot } from "@/types/booking";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  value?: string;
  onChange: (time: string) => void;
}

export function TimeSlotPicker({
  slots,
  value,
  onChange,
}: TimeSlotPickerProps) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Нет доступных временных слотов на выбранную дату</p>
      </div>
    );
  }

  // Группируем слоты по периодам дня
  const groupedSlots = slots.reduce((acc, slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    let period = "Утро";

    if (hour >= 12 && hour < 17) {
      period = "День";
    } else if (hour >= 17) {
      period = "Вечер";
    }

    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(slot);

    return acc;
  }, {} as Record<string, TimeSlot[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedSlots).map(([period, periodSlots]) => (
        <div key={period}>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            {period}
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {periodSlots.map((slot) => (
              <Button
                key={slot.time}
                type="button"
                variant={value === slot.time ? "default" : "outline"}
                size="sm"
                disabled={!slot.available}
                onClick={() => onChange(slot.time)}
                className={cn(
                  "relative",
                  !slot.available && "opacity-50 cursor-not-allowed"
                )}
              >
                {slot.time}
                {slot.available && slot.tablesAvailable <= 3 && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-orange-500 rounded-full" />
                )}
              </Button>
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        <span className="inline-block h-2 w-2 bg-orange-500 rounded-full mr-1" />
        Осталось мало мест
      </p>
    </div>
  );
}

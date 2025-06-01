"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Clock, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils/cn";
import { Restaurant } from "@/types/restaurant";
import { Booking } from "@/types/booking";
import {
  bookingSchema,
  type BookingFormData,
} from "@/lib/schemas/booking.schema";
import {
  useCreateBooking,
  useAvailableTimeSlots,
} from "@/lib/hooks/use-booking";
import { GUEST_COUNTS } from "@/lib/utils/constants";
import { TimeSlotPicker } from "./time-slot-picker";

interface BookingFormProps {
  restaurant: Restaurant;
  onSuccess: (booking: Booking) => void;
}

export function BookingForm({ restaurant, onSuccess }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedGuests, setSelectedGuests] = useState(2);

  const createBooking = useCreateBooking();
  const { data: timeSlotsData, isLoading: isLoadingSlots } =
    useAvailableTimeSlots(restaurant.id, selectedDate, selectedGuests);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      restaurantId: restaurant.id,
      guestsCount: 2,
      specialRequests: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    createBooking.mutate(data, {
      onSuccess: (response) => {
        onSuccess(response.data);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Дата</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ru })
                      ) : (
                        <span>Выберите дату</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setSelectedDate(date ?? null);
                    }}
                    disabled={(date) =>
                      date < new Date() ||
                      date >
                        new Date(new Date().setMonth(new Date().getMonth() + 2))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Guests Count */}
        <FormField
          control={form.control}
          name="guestsCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Количество гостей</FormLabel>
              <Select
                value={field.value.toString()}
                onValueChange={(value) => {
                  const guests = parseInt(value);
                  field.onChange(guests);
                  setSelectedGuests(guests);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите количество гостей" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GUEST_COUNTS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time Slot */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Время</FormLabel>
              <FormControl>
                {selectedDate ? (
                  isLoadingSlots ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <TimeSlotPicker
                      slots={timeSlotsData?.data || []}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )
                ) : (
                  <p className="text-sm text-muted-foreground py-3">
                    Сначала выберите дату
                  </p>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Special Requests */}
        <FormField
          control={form.control}
          name="specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Особые пожелания (необязательно)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Например: столик у окна, детский стульчик, аллергия на орехи..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Мы постараемся учесть ваши пожелания
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={createBooking.isPending}
        >
          {createBooking.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Бронирование...
            </>
          ) : (
            "Забронировать"
          )}
        </Button>
      </form>
    </Form>
  );
}

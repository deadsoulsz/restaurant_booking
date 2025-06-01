"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/types/booking";
import { Restaurant } from "@/types/restaurant";

interface BookingSummaryProps {
  booking: Partial<Booking>;
  restaurant: Restaurant;
}

export function BookingSummary({ booking, restaurant }: BookingSummaryProps) {
  if (!booking.date || !booking.time || !booking.guestsCount) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ваше бронирование</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold">{restaurant.name}</h4>
          <p className="text-sm text-muted-foreground">
            {restaurant.address.street}, {restaurant.address.city}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(booking.date, "EEEE, d MMMM", { locale: ru })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {booking.guestsCount}{" "}
              {booking.guestsCount === 1
                ? "гость"
                : booking.guestsCount < 5
                ? "гостя"
                : "гостей"}
            </span>
          </div>
        </div>

        {booking.specialRequests && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium">Особые пожелания:</p>
            <p className="text-sm text-muted-foreground mt-1">
              {booking.specialRequests}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

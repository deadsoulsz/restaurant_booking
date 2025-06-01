"use client";

import { useState } from "react";
import { Restaurant } from "@/types/restaurant";
import { BookingForm } from "./booking-form";
import { BookingConfirmation } from "./booking-confirmation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Booking } from "@/types/booking";

interface BookingPageProps {
  restaurant: Restaurant;
}

export function BookingPage({ restaurant }: BookingPageProps) {
  const [booking, setBooking] = useState<Booking | null>(null);

  if (booking) {
    return <BookingConfirmation booking={booking} restaurant={restaurant} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/restaurants/${restaurant.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к ресторану
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Бронирование столика</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingForm
                restaurant={restaurant}
                onSuccess={(booking) => setBooking(booking)}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Информация о ресторане</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">{restaurant.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {restaurant.address.street}, {restaurant.address.city}
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Контакты</h5>
                <p className="text-sm text-muted-foreground">
                  {restaurant.contact.phone}
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Часы работы сегодня</h5>
                <p className="text-sm text-muted-foreground">
                  {getCurrentWorkingHours(restaurant.workingHours)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getCurrentWorkingHours(
  workingHours: Restaurant["workingHours"]
): string {
  const today = new Date();
  const dayOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ][today.getDay()];

  const todayHours = workingHours.find((h) => h.dayOfWeek === dayOfWeek);
  if (!todayHours || todayHours.isClosed) {
    return "Закрыто";
  }

  return `${todayHours.openTime} - ${todayHours.closeTime}`;
}

"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  MapPin,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Booking } from "@/types/booking";
import { Restaurant } from "@/types/restaurant";
import { toast } from "sonner";

interface BookingConfirmationProps {
  booking: Booking;
  restaurant: Restaurant;
}

export function BookingConfirmation({
  booking,
  restaurant,
}: BookingConfirmationProps) {
  const router = useRouter();

  const copyConfirmationCode = () => {
    navigator.clipboard.writeText(booking.confirmationCode);
    toast.success("Код скопирован", {
      description: "Код подтверждения скопирован в буфер обмена",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Бронирование подтверждено!</CardTitle>
          <CardDescription>
            Мы отправили подтверждение на вашу электронную почту
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Confirmation Code */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              Код подтверждения
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-mono font-bold">
                {booking.confirmationCode}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyConfirmationCode}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Детали бронирования</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{restaurant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {restaurant.address.street}, {restaurant.address.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <p>
                  {format(new Date(booking.date), "EEEE, d MMMM yyyy", {
                    locale: ru,
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <p>{booking.time}</p>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <p>
                  {booking.guestsCount}{" "}
                  {booking.guestsCount === 1
                    ? "гость"
                    : booking.guestsCount < 5
                    ? "гостя"
                    : "гостей"}
                </p>
              </div>
            </div>

            {booking.specialRequests && (
              <div>
                <p className="font-medium mb-1">Особые пожелания:</p>
                <p className="text-sm text-muted-foreground">
                  {booking.specialRequests}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/profile/bookings")}
            >
              Мои бронирования
            </Button>
            <Button className="flex-1" onClick={() => router.push("/")}>
              На главную
            </Button>
          </div>

          {/* Info */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              • Пожалуйста, приходите вовремя, бронирование действительно в
              течение 15 минут
            </p>
            <p>
              • Для отмены бронирования перейдите в раздел "Мои бронирования"
            </p>
            <p>
              • Если у вас есть вопросы, свяжитесь с рестораном по телефону{" "}
              {restaurant.contact.phone}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

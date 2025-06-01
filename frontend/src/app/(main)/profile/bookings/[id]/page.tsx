"use client";

import { useParams, useRouter } from "next/navigation";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useBooking } from "@/lib/hooks/use-booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Copy,
} from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data, isLoading } = useBooking(params.id as string);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded mb-8" />
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (!data?.data) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Бронирование не найдено</p>
          <Button
            className="mt-4"
            onClick={() => router.push("/profile/bookings")}
          >
            Вернуться к списку
          </Button>
        </div>
      </AuthGuard>
    );
  }

  const booking = data.data;
  const restaurant = booking.restaurant;

  const copyCode = () => {
    navigator.clipboard.writeText(booking.confirmationCode);
    toast("Код скопирован", {
      description: "Код подтверждения скопирован в буфер обмена",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      CONFIRMED: { label: "Подтверждено", variant: "default" },
      PENDING: { label: "Ожидает", variant: "secondary" },
      CANCELLED: { label: "Отменено", variant: "destructive" },
      COMPLETED: { label: "Завершено", variant: "outline" },
    };
    const config = variants[status] || { label: status, variant: "secondary" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/profile/bookings")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к списку
        </Button>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>Детали бронирования</CardTitle>
                  {getStatusBadge(booking.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Confirmation Code */}
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Код подтверждения
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono font-bold">
                      {booking.confirmationCode}
                    </span>
                    <Button variant="ghost" size="icon" onClick={copyCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {format(new Date(booking.date), "EEEE, d MMMM yyyy", {
                          locale: ru,
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Дата посещения
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{booking.time}</p>
                      <p className="text-sm text-muted-foreground">Время</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {booking.guestsCount}{" "}
                        {booking.guestsCount === 1
                          ? "гость"
                          : booking.guestsCount < 5
                          ? "гостя"
                          : "гостей"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Количество гостей
                      </p>
                    </div>
                  </div>

                  {booking.table && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          Столик {booking.table.tableNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.table.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {booking.specialRequests && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Особые пожелания</h4>
                      <p className="text-sm text-muted-foreground">
                        {booking.specialRequests}
                      </p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Actions */}
                <div className="flex gap-3">
                  {booking.status === "CONFIRMED" && (
                    <Button variant="destructive" className="flex-1">
                      Отменить бронирование
                    </Button>
                  )}
                  {booking.status === "COMPLETED" && (
                    <Button variant="outline" className="flex-1" asChild>
                      <Link
                        href={`/restaurants/${booking.restaurantId}/review?bookingId=${booking.id}`}
                      >
                        Оставить отзыв
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Restaurant Info */}
          {restaurant && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Информация о ресторане
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={
                      restaurant.images[0]?.url ||
                      "/images/placeholder-restaurant.jpg"
                    }
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold">{restaurant.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {restaurant.address.street}, {restaurant.address.city}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${restaurant.contact.phone}`}
                      className="hover:underline"
                    >
                      {restaurant.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`https://maps.google.com/?q=${restaurant.address.latitude},${restaurant.address.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Показать на карте
                    </a>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/restaurants/${restaurant.id}`}>
                    Страница ресторана
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

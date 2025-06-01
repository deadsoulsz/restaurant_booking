"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Booking, BookingStatus } from "@/types/booking";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  MoreVertical,
  Eye,
  X,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CancelBookingDialog } from "./cancel-booking-dialog";
import { useCancelBooking } from "@/lib/hooks/use-booking";

interface BookingListProps {
  bookings: Booking[];
  isLoading?: boolean;
  showReviewButton?: boolean;
}

export function BookingList({
  bookings,
  isLoading,
  showReviewButton,
}: BookingListProps) {
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(
    null
  );
  const cancelBooking = useCancelBooking();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">У вас пока нет бронирований</p>
          <Button className="mt-4" asChild>
            <Link href="/restaurants">Найти ресторан</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking.mutate(bookingId, {
      onSuccess: () => {
        setCancellingBookingId(null);
      },
    });
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const statusConfig = {
      [BookingStatus.PENDING]: { label: "Ожидает", variant: "secondary" },
      [BookingStatus.CONFIRMED]: { label: "Подтверждено", variant: "default" },
      [BookingStatus.CANCELLED]: { label: "Отменено", variant: "destructive" },
      [BookingStatus.COMPLETED]: { label: "Завершено", variant: "outline" },
      [BookingStatus.NO_SHOW]: { label: "Не пришел", variant: "destructive" },
    } as const;

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Restaurant Image */}
                <div className="relative w-full md:w-48 h-32 md:h-32 rounded-lg overflow-hidden">
                  <Image
                    src={
                      booking.restaurant?.images[0]?.url ||
                      "/images/placeholder-restaurant.jpg"
                    }
                    alt={booking.restaurant?.name || "Restaurant"}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Booking Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {booking.restaurant?.name || "Ресторан"}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/profile/bookings/${booking.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Подробнее
                          </Link>
                        </DropdownMenuItem>
                        {booking.status === BookingStatus.CONFIRMED && (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setCancellingBookingId(booking.id)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Отменить
                          </DropdownMenuItem>
                        )}
                        {showReviewButton &&
                          booking.status === BookingStatus.COMPLETED && (
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/restaurants/${booking.restaurantId}/review?bookingId=${booking.id}`}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Оставить отзыв
                              </Link>
                            </DropdownMenuItem>
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(new Date(booking.date), "d MMM", {
                          locale: ru,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.guestsCount} гостей</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">
                        {booking.restaurant?.address.city}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Код бронирования:{" "}
                    <span className="font-mono">
                      {booking.confirmationCode}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CancelBookingDialog
        open={!!cancellingBookingId}
        onOpenChange={(open) => !open && setCancellingBookingId(null)}
        onConfirm={() =>
          cancellingBookingId && handleCancelBooking(cancellingBookingId)
        }
        isLoading={cancelBooking.isPending}
      />
    </>
  );
}

function BookingCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="w-full md:w-48 h-32" />
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-8 w-8" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

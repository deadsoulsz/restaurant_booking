"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { BookingList } from "@/components/profile/booking-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMyBookings } from "@/lib/hooks/use-booking";
import { BookingStatus } from "@/types/booking";

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">(
    "upcoming"
  );

  const getStatusFilter = () => {
    switch (activeTab) {
      case "upcoming":
        return BookingStatus.CONFIRMED;
      case "past":
        return BookingStatus.COMPLETED;
      case "cancelled":
        return BookingStatus.CANCELLED;
      default:
        return undefined;
    }
  };

  const { data, isLoading } = useMyBookings(getStatusFilter());

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Мои бронирования</h1>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
            <TabsTrigger value="past">Прошедшие</TabsTrigger>
            <TabsTrigger value="cancelled">Отмененные</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <BookingList bookings={data?.data || []} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <BookingList
              bookings={data?.data || []}
              isLoading={isLoading}
              showReviewButton
            />
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <BookingList bookings={data?.data || []} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  );
}

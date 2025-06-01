import { notFound } from "next/navigation";
import { Metadata } from "next";
import { restaurantsApi } from "@/lib/api/restaurants";
import { BookingPage } from "@/components/booking/booking-page";
import { AuthGuard } from "@/components/auth/auth-guard";

interface RestaurantBookingPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: RestaurantBookingPageProps): Promise<Metadata> {
  try {
    const { data: restaurant } = await restaurantsApi.getRestaurant(params.id);

    return {
      title: `Бронирование столика - ${restaurant.name}`,
      description: `Забронируйте столик в ${restaurant.name}`,
    };
  } catch {
    return {
      title: "Ресторан не найден",
    };
  }
}

export default async function RestaurantBookingPage({
  params,
}: RestaurantBookingPageProps) {
  try {
    const { data: restaurant } = await restaurantsApi.getRestaurant(params.id);

    return (
      <AuthGuard>
        <BookingPage restaurant={restaurant} />
      </AuthGuard>
    );
  } catch {
    notFound();
  }
}

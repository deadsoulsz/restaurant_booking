import { notFound } from "next/navigation";
import { Metadata } from "next";
import { restaurantsApi } from "@/lib/api/restaurants";
import { RestaurantDetails } from "@/components/restaurants/restaurant-details";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: RestaurantPageProps): Promise<Metadata> {
  try {
    const { data: restaurant } = await restaurantsApi.getRestaurant(params.id);

    return {
      title: restaurant.name,
      description: restaurant.description,
      openGraph: {
        title: restaurant.name,
        description: restaurant.description,
        images: restaurant.images.map((img) => ({
          url: img.url,
          alt: img.alt,
        })),
      },
    };
  } catch {
    return {
      title: "Ресторан не найден",
    };
  }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  try {
    const { data: restaurant } = await restaurantsApi.getRestaurant(params.id);
    return <RestaurantDetails restaurant={restaurant} />;
  } catch {
    notFound();
  }
}

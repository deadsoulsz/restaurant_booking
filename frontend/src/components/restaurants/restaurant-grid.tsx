"use client";

import { Restaurant } from "@/types/restaurant";
import { RestaurantCard } from "./restaurant-card";
import { RestaurantCardSkeleton } from "./restaurant-card-skeleton";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
  itemsPerPage?: number;
}

export function RestaurantGrid({
  restaurants,
  isLoading = false,
  itemsPerPage = 12,
}: RestaurantGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          По вашему запросу ничего не найдено
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

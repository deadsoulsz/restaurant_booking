"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { RestaurantFilters } from "@/components/restaurants/restaurant-filters";
import { useRestaurants } from "@/lib/hooks/use-restaurants";
import { SearchFilters, SortOptions } from "@/types/restaurant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { constrainedMemory } from "process";

export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sort, setSort] = useState<SortOptions>({
    field: "rating",
    order: "desc",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useRestaurants({ filters, sort });

  // Обработка параметров из URL
  useEffect(() => {
    const nearMe = searchParams.get("near") === "me";
    if (nearMe && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFilters((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              radius: 5,
            },
          }));
          setSort({ field: "distance", order: "asc" });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [searchParams]);

  const restaurants = data?.pages.flatMap((page) => page.data) || [];
  console.log(restaurants);

  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-") as [
      SortOptions["field"],
      SortOptions["order"]
    ];
    setSort({ field, order });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Рестораны</h1>
        <p className="text-muted-foreground">
          Найдено {data?.pages[0]?.total || 0} ресторанов
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <RestaurantFilters filters={filters} onFiltersChange={setFilters} />
          </div>
          <Select
            value={`${sort.field}-${sort.order}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">По рейтингу ↓</SelectItem>
              <SelectItem value="rating-asc">По рейтингу ↑</SelectItem>
              <SelectItem value="price-asc">Сначала дешевые</SelectItem>
              <SelectItem value="price-desc">Сначала дорогие</SelectItem>
              <SelectItem value="name-asc">По названию А-Я</SelectItem>
              <SelectItem value="name-desc">По названию Я-А</SelectItem>
              {filters.location && (
                <SelectItem value="distance-asc">Сначала ближайшие</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <RestaurantGrid restaurants={restaurants} isLoading={isLoading} />

      {hasNextPage && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Загрузка...
              </>
            ) : (
              "Показать ещё"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

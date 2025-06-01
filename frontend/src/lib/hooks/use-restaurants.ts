import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { restaurantsApi } from "@/lib/api/restaurants";
import { SearchFilters, SortOptions } from "@/types/restaurant";

interface UseRestaurantsOptions {
  filters?: SearchFilters;
  sort?: SortOptions;
  limit?: number;
  enabled?: boolean;
}

export function useRestaurants(options: UseRestaurantsOptions = {}) {
  const { filters, sort, limit = 20, enabled = true } = options;

  return useInfiniteQuery({
    queryKey: ["restaurants", filters, sort, limit],
    queryFn: ({ pageParam = 1 }) =>
      restaurantsApi.getRestaurants({
        page: pageParam,
        limit,
        filters,
        sort,
      }),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    enabled,
    initialPageParam: 1,
  });
}

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => restaurantsApi.getRestaurant(id),
    enabled: !!id,
  });
}

export function useRestaurantSearch(query: string) {
  return useQuery({
    queryKey: ["restaurants", "search", query],
    queryFn: () => restaurantsApi.searchRestaurants(query),
    enabled: query.length > 2,
  });
}

export function useNearbyRestaurants(lat?: number, lng?: number, radius = 5) {
  return useQuery({
    queryKey: ["restaurants", "nearby", lat, lng, radius],
    queryFn: () =>
      restaurantsApi.getNearbyRestaurants({
        lat: lat!,
        lng: lng!,
        radius,
      }),
    enabled: !!lat && !!lng,
  });
}

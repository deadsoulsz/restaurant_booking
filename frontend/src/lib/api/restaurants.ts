import { apiClient } from "./client";
import { Restaurant, SearchFilters, SortOptions } from "@/types/restaurant";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { TimeSlot } from "@/types/booking";

export const restaurantsApi = {
  // Получить список ресторанов с фильтрами и пагинацией
  async getRestaurants(params: {
    page?: number;
    limit?: number;
    filters?: SearchFilters;
    sort?: SortOptions;
  }): Promise<PaginatedResponse<Restaurant>> {
    const { page, limit, filters = {}, sort = {} } = params;
    // const { data } = await apiClient.instance.get("/restaurants", {
    //   params,
    // });
    // console.log("1 - ", data);

    const queryParams: Record<string, any> = {
      page,
      limit,
      search: filters.search,
      cuisine: filters.cuisine,
      priceRange: filters.priceRange,
      rating: filters.rating,
      features: filters.features,
      lat: filters.location?.lat,
      lng: filters.location?.lng,
      radius: filters.location?.radius,
      sortBy: sort.field, // вместо sort[field]
      sortOrder: sort.order, // вместо sort[order]
    };

    // Удаляем параметры с undefined
    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === undefined && delete queryParams[key]
    );

    const { data } = await apiClient.instance.get("/restaurants", {
      params: queryParams,
    });

    return data;

    return data;
  },

  // Получить один ресторан по ID
  async getRestaurant(id: string): Promise<ApiResponse<Restaurant>> {
    const { data } = await apiClient.instance.get(`/restaurants/${id}`);
    return data;
  },

  // Получить доступные временные слоты
  async getAvailableTimeSlots(params: {
    restaurantId: string;
    date: string; // YYYY-MM-DD
    guestsCount: number;
  }): Promise<ApiResponse<TimeSlot[]>> {
    const { data } = await apiClient.instance.get(
      `/restaurants/${params.restaurantId}/time-slots`,
      {
        params: {
          date: params.date,
          guestsCount: params.guestsCount,
        },
      }
    );
    return data;
  },

  // Поиск ресторанов
  async searchRestaurants(query: string): Promise<ApiResponse<Restaurant[]>> {
    const { data } = await apiClient.instance.get("/restaurants/search", {
      params: { q: query },
    });
    return data;
  },

  // Получить рестораны поблизости
  async getNearbyRestaurants(params: {
    lat: number;
    lng: number;
    radius?: number;
  }): Promise<ApiResponse<Restaurant[]>> {
    const { data } = await apiClient.instance.get("/restaurants/nearby", {
      params,
    });
    return data;
  },
};

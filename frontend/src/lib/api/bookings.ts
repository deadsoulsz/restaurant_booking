import { apiClient } from "./client";
import { Booking, BookingRequest } from "@/types/booking";
import { ApiResponse } from "@/types/api";

export const bookingsApi = {
  // Создать бронирование
  async createBooking(data: BookingRequest): Promise<ApiResponse<Booking>> {
    const response = await apiClient.instance.post("/bookings", data);
    return response.data;
  },

  // Получить мои бронирования
  async getMyBookings(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Booking[]>> {
    const { data } = await apiClient.instance.get("/bookings/my", { params });
    return data;
  },

  // Получить одно бронирование
  async getBooking(id: string): Promise<ApiResponse<Booking>> {
    const { data } = await apiClient.instance.get(`/bookings/${id}`);
    return data;
  },

  // Отменить бронирование
  async cancelBooking(id: string): Promise<ApiResponse<Booking>> {
    const { data } = await apiClient.instance.patch(`/bookings/${id}/cancel`);
    return data;
  },

  // Подтвердить бронирование (для ресторана)
  async confirmBooking(id: string): Promise<ApiResponse<Booking>> {
    const { data } = await apiClient.instance.patch(`/bookings/${id}/confirm`);
    return data;
  },
};

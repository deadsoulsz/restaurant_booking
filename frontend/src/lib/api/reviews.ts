import { apiClient } from "./client";
import { Review, CreateReviewData } from "@/types/review";
import { ApiResponse, PaginatedResponse } from "@/types/api";

export const reviewsApi = {
  // Получить отзывы ресторана
  async getRestaurantReviews(
    restaurantId: string,
    params?: {
      page?: number;
      limit?: number;
      sort?: "newest" | "oldest" | "rating";
    }
  ): Promise<PaginatedResponse<Review>> {
    const { data } = await apiClient.instance.get(
      `/restaurants/${restaurantId}/reviews`,
      { params }
    );
    return data;
  },

  // Создать отзыв
  async createReview(data: CreateReviewData): Promise<ApiResponse<Review>> {
    const response = await apiClient.instance.post("/reviews", data);
    return response.data;
  },

  // Обновить отзыв
  async updateReview(
    id: string,
    data: Partial<CreateReviewData>
  ): Promise<ApiResponse<Review>> {
    const response = await apiClient.instance.patch(`/reviews/${id}`, data);
    return response.data;
  },

  // Удалить отзыв
  async deleteReview(id: string): Promise<ApiResponse<{ message: string }>> {
    const { data } = await apiClient.instance.delete(`/reviews/${id}`);
    return data;
  },

  // Отметить отзыв как полезный
  async markReviewHelpful(id: string): Promise<ApiResponse<Review>> {
    const { data } = await apiClient.instance.post(`/reviews/${id}/helpful`);
    return data;
  },
};

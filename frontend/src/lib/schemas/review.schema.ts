import { z } from "zod";

export const createReviewSchema = z.object({
  restaurantId: z.string().min(1, "Ресторан обязателен"),
  bookingId: z.string().optional(),
  rating: z
    .number()
    .min(1, "Минимальная оценка 1")
    .max(5, "Максимальная оценка 5"),
  comment: z
    .string()
    .min(10, "Отзыв должен содержать минимум 10 символов")
    .max(1000, "Отзыв не должен превышать 1000 символов"),
});

export const updateReviewSchema = createReviewSchema.partial().extend({
  id: z.string().min(1),
});

export type CreateReviewFormData = z.infer<typeof createReviewSchema>;
export type UpdateReviewFormData = z.infer<typeof updateReviewSchema>;

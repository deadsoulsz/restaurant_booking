import { z } from "zod";

export const bookingSchema = z.object({
  restaurantId: z.string().min(1, "Ресторан обязателен"),
  date: z.date().min(new Date(), "Дата не может быть в прошлом"),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Неверный формат времени"),
  guestsCount: z
    .number()
    .min(1, "Минимум 1 гость")
    .max(20, "Максимум 20 гостей"),
  tableId: z.string().optional(),
  specialRequests: z.string().max(500, "Максимум 500 символов").optional(),
});

export const timeSlotSchema = z.object({
  restaurantId: z.string().min(1),
  date: z.date(),
  guestsCount: z.number().min(1).max(20),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type TimeSlotQueryData = z.infer<typeof timeSlotSchema>;

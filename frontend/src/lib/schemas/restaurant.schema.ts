import { z } from "zod";
import { CuisineType, PriceRange } from "@/types/restaurant";

export const searchFiltersSchema = z.object({
  cuisine: z.array(z.nativeEnum(CuisineType)).optional(),
  priceRange: z.array(z.nativeEnum(PriceRange)).optional(),
  location: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      radius: z.number().min(1).max(50),
    })
    .optional(),
  rating: z.number().min(0).max(5).optional(),
  features: z.array(z.string()).optional(),
  availableDate: z.date().optional(),
  availableTime: z.string().optional(),
  guestsCount: z.number().min(1).max(20).optional(),
  search: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.enum(["rating", "price", "distance", "name"]).default("rating"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type SearchFiltersFormData = z.infer<typeof searchFiltersSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;

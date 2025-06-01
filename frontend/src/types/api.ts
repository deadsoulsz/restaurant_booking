import { CuisineType, PriceRange } from "./restaurant";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// export interface SearchFilters {
//   cuisine?: CuisineType[];
//   priceRange?: PriceRange[];
//   location?: {
//     lat: number;
//     lng: number;
//     radius: number; // в километрах
//   };
//   rating?: number;
//   features?: string[];
//   availableDate?: Date;
//   availableTime?: string;
//   guestsCount?: number;
// }

export interface SortOptions {
  field: "rating" | "price" | "distance" | "name";
  order: "asc" | "desc";
}

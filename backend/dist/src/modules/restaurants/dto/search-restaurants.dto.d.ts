import { PriceRange, CuisineType } from '@prisma/client';
export declare class SearchRestaurantsDto {
    page?: number;
    limit?: number;
    search?: string;
    cuisine?: CuisineType[];
    priceRange?: PriceRange[];
    rating?: number;
    features?: string[];
    lat?: number;
    lng?: number;
    radius?: number;
    sortBy?: 'rating' | 'price' | 'distance' | 'name';
    sortOrder?: 'asc' | 'desc';
}

import { PriceRange, CuisineType, DayOfWeek } from '@prisma/client';
declare class CreateAddressDto {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
}
declare class CreateContactDto {
    phone: string;
    email?: string;
    website?: string;
}
declare class CreateImageDto {
    url: string;
    alt: string;
    isPrimary?: boolean;
}
declare class CreateWorkingHoursDto {
    dayOfWeek: DayOfWeek;
    openTime: string;
    closeTime: string;
    isClosed?: boolean;
}
export declare class CreateRestaurantDto {
    name: string;
    description: string;
    priceRange: PriceRange;
    cuisine: CuisineType[];
    features?: string[];
    address: CreateAddressDto;
    contact: CreateContactDto;
    images?: CreateImageDto[];
    workingHours: CreateWorkingHoursDto[];
}
export {};

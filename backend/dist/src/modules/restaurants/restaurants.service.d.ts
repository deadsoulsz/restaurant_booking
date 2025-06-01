import { PrismaService } from '../../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { SearchRestaurantsDto } from './dto/search-restaurants.dto';
import { GetTimeSlotsDto } from './dto/get-time-slots.dto';
export declare class RestaurantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<{
        address: {
            id: string;
            street: string;
            city: string;
            state: string | null;
            postalCode: string;
            country: string;
            latitude: number;
            longitude: number;
            restaurantId: string;
        };
        contact: {
            id: string;
            email: string | null;
            phone: string;
            restaurantId: string;
            website: string | null;
        };
        images: {
            id: string;
            restaurantId: string;
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
        }[];
        workingHours: {
            id: string;
            restaurantId: string;
            dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
            openTime: string;
            closeTime: string;
            isClosed: boolean;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        priceRange: import(".prisma/client").$Enums.PriceRange;
        rating: number;
        reviewsCount: number;
        isActive: boolean;
        cuisine: import(".prisma/client").$Enums.CuisineType[];
        features: string[];
    }>;
    findAll(query: SearchRestaurantsDto): Promise<{
        data: {
            reviewsCount: number;
            _count: {
                reviews: number;
            };
            address: {
                id: string;
                street: string;
                city: string;
                state: string | null;
                postalCode: string;
                country: string;
                latitude: number;
                longitude: number;
                restaurantId: string;
            };
            images: {
                id: string;
                restaurantId: string;
                url: string;
                alt: string;
                isPrimary: boolean;
                order: number;
            }[];
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string;
            priceRange: import(".prisma/client").$Enums.PriceRange;
            rating: number;
            isActive: boolean;
            cuisine: import(".prisma/client").$Enums.CuisineType[];
            features: string[];
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        reviewsCount: number;
        _count: {
            reviews: number;
        };
        address: {
            id: string;
            street: string;
            city: string;
            state: string | null;
            postalCode: string;
            country: string;
            latitude: number;
            longitude: number;
            restaurantId: string;
        };
        contact: {
            id: string;
            email: string | null;
            phone: string;
            restaurantId: string;
            website: string | null;
        };
        images: {
            id: string;
            restaurantId: string;
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
        }[];
        workingHours: {
            id: string;
            restaurantId: string;
            dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
            openTime: string;
            closeTime: string;
            isClosed: boolean;
        }[];
        tables: {
            id: string;
            isActive: boolean;
            restaurantId: string;
            tableNumber: string;
            capacity: number;
            location: import(".prisma/client").$Enums.TableLocation;
        }[];
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        priceRange: import(".prisma/client").$Enums.PriceRange;
        rating: number;
        isActive: boolean;
        cuisine: import(".prisma/client").$Enums.CuisineType[];
        features: string[];
    }>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<{
        address: {
            id: string;
            street: string;
            city: string;
            state: string | null;
            postalCode: string;
            country: string;
            latitude: number;
            longitude: number;
            restaurantId: string;
        };
        contact: {
            id: string;
            email: string | null;
            phone: string;
            restaurantId: string;
            website: string | null;
        };
        images: {
            id: string;
            restaurantId: string;
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
        }[];
        workingHours: {
            id: string;
            restaurantId: string;
            dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
            openTime: string;
            closeTime: string;
            isClosed: boolean;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        priceRange: import(".prisma/client").$Enums.PriceRange;
        rating: number;
        reviewsCount: number;
        isActive: boolean;
        cuisine: import(".prisma/client").$Enums.CuisineType[];
        features: string[];
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        priceRange: import(".prisma/client").$Enums.PriceRange;
        rating: number;
        reviewsCount: number;
        isActive: boolean;
        cuisine: import(".prisma/client").$Enums.CuisineType[];
        features: string[];
    }>;
    getAvailableTimeSlots(restaurantId: string, query: GetTimeSlotsDto): Promise<any[]>;
    searchByLocation(lat: number, lng: number, radius?: number): Promise<({
        address: {
            id: string;
            street: string;
            city: string;
            state: string | null;
            postalCode: string;
            country: string;
            latitude: number;
            longitude: number;
            restaurantId: string;
        };
        images: {
            id: string;
            restaurantId: string;
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        priceRange: import(".prisma/client").$Enums.PriceRange;
        rating: number;
        reviewsCount: number;
        isActive: boolean;
        cuisine: import(".prisma/client").$Enums.CuisineType[];
        features: string[];
    })[]>;
    private generateSlug;
    private calculateDistance;
    private deg2rad;
    private addMinutes;
}

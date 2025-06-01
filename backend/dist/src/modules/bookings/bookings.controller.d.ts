import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { QueryBookingsDto } from './dto/query-bookings.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(user: any, createBookingDto: CreateBookingDto): Promise<{
        restaurant: {
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
        };
        table: {
            id: string;
            isActive: boolean;
            restaurantId: string;
            tableNumber: string;
            capacity: number;
            location: import(".prisma/client").$Enums.TableLocation;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        userId: string;
        confirmationCode: string;
        date: Date;
        time: string;
        duration: number;
        guestsCount: number;
        specialRequests: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        tableId: string | null;
    }>;
    findMyBookings(user: any, query: QueryBookingsDto): Promise<{
        data: ({
            restaurant: {
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
            };
            table: {
                id: string;
                isActive: boolean;
                restaurantId: string;
                tableNumber: string;
                capacity: number;
                location: import(".prisma/client").$Enums.TableLocation;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            restaurantId: string;
            userId: string;
            confirmationCode: string;
            date: Date;
            time: string;
            duration: number;
            guestsCount: number;
            specialRequests: string | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            tableId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUpcomingBookings(user: any): Promise<({
        restaurant: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        userId: string;
        confirmationCode: string;
        date: Date;
        time: string;
        duration: number;
        guestsCount: number;
        specialRequests: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        tableId: string | null;
    })[]>;
    findOne(id: string, user: any): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        restaurant: {
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
        };
        table: {
            id: string;
            isActive: boolean;
            restaurantId: string;
            tableNumber: string;
            capacity: number;
            location: import(".prisma/client").$Enums.TableLocation;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        userId: string;
        confirmationCode: string;
        date: Date;
        time: string;
        duration: number;
        guestsCount: number;
        specialRequests: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        tableId: string | null;
    }>;
    update(id: string, user: any, updateBookingDto: UpdateBookingDto): Promise<{
        restaurant: {
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
        };
        table: {
            id: string;
            isActive: boolean;
            restaurantId: string;
            tableNumber: string;
            capacity: number;
            location: import(".prisma/client").$Enums.TableLocation;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        userId: string;
        confirmationCode: string;
        date: Date;
        time: string;
        duration: number;
        guestsCount: number;
        specialRequests: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        tableId: string | null;
    }>;
    cancel(id: string, user: any): Promise<{
        restaurant: {
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
        };
        table: {
            id: string;
            isActive: boolean;
            restaurantId: string;
            tableNumber: string;
            capacity: number;
            location: import(".prisma/client").$Enums.TableLocation;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        userId: string;
        confirmationCode: string;
        date: Date;
        time: string;
        duration: number;
        guestsCount: number;
        specialRequests: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        tableId: string | null;
    }>;
}

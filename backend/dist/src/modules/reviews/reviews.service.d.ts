import { PrismaService } from '../../prisma/prisma.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { QueryReviewsDto } from './dto/query-reviews.dto';
export declare class ReviewsService {
    private prisma;
    private restaurantsService;
    constructor(prisma: PrismaService, restaurantsService: RestaurantsService);
    create(userId: string, createReviewDto: CreateReviewDto): Promise<{
        user: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        restaurantId: string;
        comment: string;
        helpfulCount: number;
        userId: string;
        bookingId: string | null;
    }>;
    findAll(restaurantId: string, query: QueryReviewsDto): Promise<{
        data: ({
            user: {
                id: string;
                name: string;
                avatar: string;
            };
            images: {
                id: string;
                url: string;
                caption: string | null;
                reviewId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            restaurantId: string;
            comment: string;
            helpfulCount: number;
            userId: string;
            bookingId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            name: string;
            avatar: string;
        };
        restaurant: {
            id: string;
            name: string;
        };
        images: {
            id: string;
            url: string;
            caption: string | null;
            reviewId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        restaurantId: string;
        comment: string;
        helpfulCount: number;
        userId: string;
        bookingId: string | null;
    }>;
    update(id: string, userId: string, updateReviewDto: UpdateReviewDto): Promise<{
        user: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        restaurantId: string;
        comment: string;
        helpfulCount: number;
        userId: string;
        bookingId: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    markAsHelpful(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        restaurantId: string;
        comment: string;
        helpfulCount: number;
        userId: string;
        bookingId: string | null;
    }>;
    getUserReviews(userId: string, page?: number, limit?: number): Promise<{
        data: ({
            restaurant: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                url: string;
                caption: string | null;
                reviewId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            restaurantId: string;
            comment: string;
            helpfulCount: number;
            userId: string;
            bookingId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    private updateRestaurantRating;
    private getOrderBy;
}

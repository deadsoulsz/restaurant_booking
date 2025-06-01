import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { QueryReviewsDto } from './dto/query-reviews.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(user: any, createReviewDto: CreateReviewDto): Promise<{
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
    findRestaurantReviews(restaurantId: string, query: QueryReviewsDto): Promise<{
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
    getMyReviews(user: any, page?: number, limit?: number): Promise<{
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
    update(id: string, user: any, updateReviewDto: UpdateReviewDto): Promise<{
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
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
    markAsHelpful(id: string, user: any): Promise<{
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
}

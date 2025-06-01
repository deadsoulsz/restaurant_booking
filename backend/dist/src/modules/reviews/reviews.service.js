"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const client_1 = require("@prisma/client");
let ReviewsService = class ReviewsService {
    constructor(prisma, restaurantsService) {
        this.prisma = prisma;
        this.restaurantsService = restaurantsService;
    }
    async create(userId, createReviewDto) {
        const { restaurantId, bookingId, rating, comment } = createReviewDto;
        await this.restaurantsService.findOne(restaurantId);
        if (bookingId) {
            const booking = await this.prisma.booking.findUnique({
                where: { id: bookingId },
            });
            if (!booking) {
                throw new common_1.NotFoundException('Бронирование не найдено');
            }
            if (booking.userId !== userId) {
                throw new common_1.ForbiddenException('Это не ваше бронирование');
            }
            if (booking.restaurantId !== restaurantId) {
                throw new common_1.BadRequestException('Бронирование не относится к этому ресторану');
            }
            if (booking.status !== client_1.BookingStatus.COMPLETED) {
                throw new common_1.BadRequestException('Можно оставить отзыв только после посещения');
            }
            const existingReview = await this.prisma.review.findUnique({
                where: { bookingId },
            });
            if (existingReview) {
                throw new common_1.BadRequestException('Вы уже оставили отзыв для этого посещения');
            }
        }
        const review = await this.prisma.review.create({
            data: {
                userId,
                restaurantId,
                bookingId,
                rating,
                comment,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
        await this.updateRestaurantRating(restaurantId);
        return review;
    }
    async findAll(restaurantId, query) {
        const { page = 1, limit = 20, sort = 'newest' } = query;
        await this.restaurantsService.findOne(restaurantId);
        const orderBy = this.getOrderBy(sort);
        const [total, reviews] = await Promise.all([
            this.prisma.review.count({ where: { restaurantId } }),
            this.prisma.review.findMany({
                where: { restaurantId },
                skip: (page - 1) * limit,
                take: limit,
                orderBy,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                        },
                    },
                    images: true,
                },
            }),
        ]);
        return {
            data: reviews,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const review = await this.prisma.review.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                images: true,
            },
        });
        if (!review) {
            throw new common_1.NotFoundException('Отзыв не найден');
        }
        return review;
    }
    async update(id, userId, updateReviewDto) {
        const review = await this.findOne(id);
        if (review.userId !== userId) {
            throw new common_1.ForbiddenException('Вы не можете редактировать чужой отзыв');
        }
        const updatedReview = await this.prisma.review.update({
            where: { id },
            data: updateReviewDto,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
        if (updateReviewDto.rating && updateReviewDto.rating !== review.rating) {
            await this.updateRestaurantRating(review.restaurantId);
        }
        return updatedReview;
    }
    async remove(id, userId) {
        const review = await this.findOne(id);
        if (review.userId !== userId) {
            throw new common_1.ForbiddenException('Вы не можете удалить чужой отзыв');
        }
        await this.prisma.review.delete({ where: { id } });
        await this.updateRestaurantRating(review.restaurantId);
        return { message: 'Отзыв успешно удален' };
    }
    async markAsHelpful(id, userId) {
        const review = await this.findOne(id);
        if (review.userId === userId) {
            throw new common_1.BadRequestException('Вы не можете отметить свой отзыв как полезный');
        }
        return this.prisma.review.update({
            where: { id },
            data: {
                helpfulCount: { increment: 1 },
            },
        });
    }
    async getUserReviews(userId, page = 1, limit = 20) {
        const [total, reviews] = await Promise.all([
            this.prisma.review.count({ where: { userId } }),
            this.prisma.review.findMany({
                where: { userId },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    restaurant: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                    images: true,
                },
            }),
        ]);
        return {
            data: reviews,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async updateRestaurantRating(restaurantId) {
        const result = await this.prisma.review.aggregate({
            where: { restaurantId },
            _avg: { rating: true },
            _count: true,
        });
        await this.prisma.restaurant.update({
            where: { id: restaurantId },
            data: {
                rating: result._avg.rating || 0,
                reviewsCount: result._count,
            },
        });
    }
    getOrderBy(sort) {
        switch (sort) {
            case 'newest':
                return { createdAt: 'desc' };
            case 'oldest':
                return { createdAt: 'asc' };
            case 'rating':
                return { rating: 'desc' };
            default:
                return { createdAt: 'desc' };
        }
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        restaurants_service_1.RestaurantsService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map